<script src="./register.ts" lang="ts"></script>
<style src="./register.scss" lang="scss" scoped></style>

<template>
	<div class="page register">
		<v-layout justify-center>
			<v-flex xs12 sm10 md6 lg4 xl3>
				<v-form v-model="registerValid">
					<v-card class="onboard--flex">
						<v-card-title class="header">Register</v-card-title>

						<v-alert
							:value="errorDisplay"
							transition="slide-y-transition"
							type="error">
							{{ errorMsg }}
						</v-alert>

						<v-card-text>
							<v-layout>
								<v-flex xs12 sm5 md5 lg5>
									<v-text-field
										v-model="form.first_name.value"
										:rules="form.first_name.rule"
										label="First Name"
										required></v-text-field>
								</v-flex>

								<v-spacer></v-spacer>

								<v-flex xs12 sm6 md6 lg6>
									<v-text-field
										v-model="form.last_name.value"
										:rules="form.last_name.rule"
										label="Last Name"
										required></v-text-field>
								</v-flex>
							</v-layout>

							<v-layout>
								<v-flex xs12 sm5 md5 lg5>
									<v-text-field
										v-model="phoneNumberFormat"
										:rules="form.phone_number.rule"
										label="Phone Number (Numbers only)"
										required></v-text-field>
								</v-flex>

								<v-spacer></v-spacer>

								<v-flex xs12 sm6 md6 lg6>
									<v-text-field
										v-model="form.email.value"
										:rules="form.email.rule"
										label="Email"
										required></v-text-field>
								</v-flex>
							</v-layout>

							<v-layout>
								<v-flex xs12 sm5 md5 lg5>
									<v-text-field
										v-model="form.password.value"
										:rules="form.password.rule"
										label="Password"
										type="password"
										required></v-text-field>
								</v-flex>

								<v-spacer></v-spacer>

								<v-flex xs12 sm6 md6 lg6>
									<v-text-field
										v-model="form.confirm_password.value"
										:rules="form.confirm_password.rule"
										label="Confirm Password"
										type="password"
										required></v-text-field>
								</v-flex>
							</v-layout>

							<v-divider></v-divider>

							<v-text-field
								v-model="form.company_name.value"
								:rules="form.company_name.rule"
								label="Company"
								required></v-text-field>

							<v-layout>
								<v-flex xs12 sm9 md9 lg9>
									<v-text-field
										v-model="form.address_1.value"
										:rules="form.address_1.rule"
										label="Address"
										required></v-text-field>
								</v-flex>

								<v-spacer></v-spacer>

								<v-flex xs12 sm2 md2 lg2>
									<v-text-field
										label="Suite/Apt #"></v-text-field>
								</v-flex>
							</v-layout>

							<v-layout>
								<v-flex xs12 sm5 md5 lg4>
									<v-text-field
										v-model="form.city.value"
										:rules="form.city.rule"
										label="City"
										required></v-text-field>
								</v-flex>

								<v-spacer></v-spacer>

								<v-flex xs12 sm3 md3 lg3>
									<v-select
										v-model="form.state.value"
										:rules="form.state.rule"
										:items="states"
										label="State"
										required></v-select>
								</v-flex>

								<v-spacer></v-spacer>

								<v-flex xs12 sm3 md3 lg2>
									<v-text-field
										v-model="form.postal_code.value"
										:rules="form.postal_code.rule"
										label="Postal Code"
										required></v-text-field>
								</v-flex>
							</v-layout>
						</v-card-text>

						<v-card-actions>
							<v-btn
								color="primary"
								@click="submit"
								:disabled="!registerValid"
								block>
								Register
							</v-btn>
						</v-card-actions>
					</v-card>
				</v-form>

				<v-layout class="register-details">
					<p>
						Already have an account? <router-link :to="{ name: 'login' }">Login</router-link>
					</p>
				</v-layout>
			</v-flex>
		</v-layout>
	</div>
</template>
