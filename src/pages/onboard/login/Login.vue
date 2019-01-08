<script src="./login.ts" lang="ts"></script>
<style src="./login.scss" lang="scss" module></style>

<template>
	<div :class="[$style.page, $style.login]">
		<v-layout justify-center>
			<v-flex xs12 sm10 md6 lg4 xl3>
				<v-form v-model="loginValid">
					<v-card>
						<v-card-title :class="[$style.header]">Login</v-card-title>

						<v-alert
							:value="errorDisplay"
							transition="slide-y-transition"
							type="error">
							{{ errorMsg }}
						</v-alert>

						<v-card-text>
							<v-text-field
								prepend-icon="person"
								v-model="form.email.value"
								:rules="form.email.rules"
								label="Email"
								required></v-text-field>
							<v-text-field
								prepend-icon="lock"
								v-model="form.password.value"
								:rules="form.password.rules"
								label="Password"
								type="password"
								required></v-text-field>
						</v-card-text>

						<v-card-actions>
							<v-btn
								color="primary"
								@click="submit"
								:disabled="!loginValid"
								block>
								Login
							</v-btn>
						</v-card-actions>
					</v-card>

					<v-layout :class="[$style['login-details']]">
						<p>
							Need an account? <router-link :to="{ name: 'register' }">Register</router-link>
						</p>
						<v-spacer></v-spacer>
						<p>Forgot password?</p>
					</v-layout>
				</v-form>
			</v-flex>
		</v-layout>
	</div>
</template>
