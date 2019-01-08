<script src="./account-reset.ts" lang="ts"></script>
<style src="./account-reset.scss" lang="scss" scoped></style>

<template>
	<div class="page account-reset">
		<v-layout justify-center>
			<v-flex xs12 sm10 md6 lg4 xl3>
				<v-form ref="resetForm" v-model="formValid">
					<v-card>
						<v-card-title class="header">Password Reset</v-card-title>

						<v-alert
							:value="alert.display"
							transition="slide-y-transition"
							:type="alert.type">
							{{ alert.msg }}
						</v-alert>

						<v-card-text>
							<v-text-field
								@input="validateAll()"
								v-model="form.new_password.value"
								:rules="form.new_password.rule"
								type="password"
								label="New Password"></v-text-field>

							<v-text-field
								@input="validateAll()"
								v-model="form.confirm_password.value"
								:rules="form.confirm_password.rule"
								type="password"
								label="Confirm Password"></v-text-field>
						</v-card-text>

						<v-card-actions>
							<v-btn
								class="btn--submit"
								@click="submit"
								:disabled="!formValid"
								block>Submit</v-btn>
						</v-card-actions>
					</v-card>
				</v-form>
			</v-flex>
		</v-layout>
	</div>
</template>
