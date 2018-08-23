<template>
	<div class="login">
		<v-layout>
			<v-flex xs12 sm6 offset-sm3>
				<v-form v-model="loginValid">
					<v-card>
						<v-card-title class="header">Login</v-card-title>

						<v-card-text>
								<v-text-field
									prepend-icon="person"
									v-model="form.email.value"
									:rules="form.email.rule"
									label="Email"
									required></v-text-field>
								<v-text-field
									prepend-icon="lock"
									v-model="form.password.value"
									:rules="form.password.rule"
									label="Password"
									type="password"
									required></v-text-field>
						</v-card-text>

						<v-card-actions>
							<!--:disabled="!loginValid"-->
							<v-btn
								color="secondary"
								@click="submit"
								block>
								Login
							</v-btn>
						</v-card-actions>
					</v-card>
				</v-form>
			</v-flex>
		</v-layout>
	</div>
</template>

<script lang="ts">
	import { Component, Vue } from 'vue-property-decorator';
	import {UserInterface} from '../interfaces/user.interface';

	@Component({})
	class Login extends Vue {
		public loginValid: boolean = false;
		public form = {
			email: {
				value: '',
				rule: [
					(v: string) => !!v || 'Email is required',
					(v: string) => /.+@.+/.test(v) || 'E-mail must be valid',
				],
			},
			password: {
				value: '',
				rule: [
					(v: string) => !!v || 'Password is required',
					(v: string) => v.length >= 8 || '',
				],
			},
		};

		public submit() {
			this.$store.commit('addUser', {
				email: this.form.email.value,
			});
			this.$router.push({ name: 'dashboard' });
			// alert('submitted');
		}
	}

	export default Login;
</script>

<style lang="scss" scoped>
	.header {
		font-size: 28px;
		justify-content: center;
		text-align: center;
	}
</style>
