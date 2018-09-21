<script src="./onboard.ts" lang="ts"></script>
<style src="./onboard.scss" lang="scss" scoped></style>

<template>
	<div class="onboard bg-color">
		<img src="@/assets/logo.png" alt="LiveDialer" class="logo">

		<transition name="onboard-transition"
					enter-active-class="animated fadeInUp"
					leave-active-class="animated fadeOutLeft">
			<router-view></router-view>
		</transition>

		<v-footer absolute class="bg-color onboard--footer">
			<v-layout justify-center>
				&copy; 2018 All Rights Reserved
			</v-layout>
		</v-footer>
	</div>
</template>
