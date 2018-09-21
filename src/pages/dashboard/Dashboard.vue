<script src="./dashboard.ts" lang="ts"></script>
<style src="./dashboard.scss" lang="scss" scoped></style>

<template>
	<div class="dashboard">
		<MainNavMobile :menu="menu" :show-menu="mobileMenu"></MainNavMobile>

		<v-toolbar class="toolbar">
			<v-btn
				class="menu-btn"
				color="primary"
				@click.stop="mobileMenu = !mobileMenu">
				<v-icon>menu</v-icon>
			</v-btn>

			<v-toolbar-title>
				<v-layout align-center>
					<img src="@/assets/logo.png" alt="LiveDialer" style="width: 1.5em">
					<h2 class="logo--text">Logo</h2>
				</v-layout>
			</v-toolbar-title>

			<v-spacer></v-spacer>

			<MainNavDesktop :menu="menu"></MainNavDesktop>

			<v-spacer></v-spacer>

			<v-menu bottom left offset-y>
				<v-btn slot="activator" dark icon>
					<v-icon>account_circle</v-icon>
				</v-btn>

				<v-list>
					<v-list-tile @click="logout()">
						<v-list-tile-title>Logout</v-list-tile-title>
					</v-list-tile>
				</v-list>
			</v-menu>
		</v-toolbar>

		<transition name="dashboard-transition"
					enter-active-class="animated fadeInRight"
					leave-active-class="animated fadeOutLeft">
			<router-view></router-view>
		</transition>
	</div>
</template>
