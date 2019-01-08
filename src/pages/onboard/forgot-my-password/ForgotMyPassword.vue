<script src="./forgot-my-password.ts" lang="ts"></script>
<style src="./forgot-my-password.scss" lang="scss" scoped></style>

<template>
	<div class="page forgot-password">
		<v-layout justify-center>
			<v-flex xs12 sm10 md6 lg5 xl4>
				<v-form v-if="!successSubmission" v-model="formValid">
					<v-card>
						<v-card-title class="header">Forgot Password</v-card-title>
						<p>Enter your email and we will send you a link with instructions on resetting your password.</p>

						<v-alert
							:value="errorDisplay"
							transition="slide-y-transition"
							type="error">
							{{ errorMsg }}
						</v-alert>

						<v-card-text>
							<v-text-field
								@keydown.enter.prevent=""
								@keyup.enter.prevent="submit"
								prepend-icon="email"
								v-model="form.email.value"
								:rules="form.email.rule"
								label="Email"
								required></v-text-field>
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

				<v-card v-if="successSubmission" class="email-success">
					<v-icon>email</v-icon>
					<div class="header">Email sent!</div>
					<p style="margin-top: 20px;padding: 20px;">Check your email for the instructions. If you don't see the email in your inbox then try the spam folder.</p>
				</v-card>

				<v-layout class="detail-links">
					<p>
						Remembered your password? <router-link :to="{ name: 'login' }">Login</router-link>
					</p>
				</v-layout>
			</v-flex>
		</v-layout>
	</div>
</template>
