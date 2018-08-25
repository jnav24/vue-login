<template>
	<div class="dashboard">
		<v-toolbar class="toolbar">
			<v-toolbar-title>
				<img src="@/assets/logo.svg" alt="" style="width: 13em">
			</v-toolbar-title>

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

		<v-toolbar style="background: #fff">
			<v-spacer></v-spacer>
			<v-toolbar-items>
				<router-link tag="v-btn" class="v-btn--flat" :to="{ name: 'main' }" active-class="active" exact>Dashboard</router-link>
				<router-link tag="v-btn" class="v-btn--flat" :to="{ name: 'profile' }" active-class="active">Profile</router-link>
			</v-toolbar-items>
			<v-spacer></v-spacer>
		</v-toolbar>

		Dashboard works... {{ user.email }}

		<transition name="dashboard-transition"
					enter-active-class="animated fadeInRight"
					leave-active-class="animated fadeOutLeft">
			<router-view></router-view>
		</transition>
	</div>
</template>

<script lang="ts">
	import {  Component, Vue } from 'vue-property-decorator';
	import { Getter, Mutation } from 'vuex-class';
	import {Route} from 'vue-router';
	import UserService from '../../services/user.service';

	Component.registerHooks([
		'beforeCreate',
		'beforeRouteEnter',
	]);

	const userService = new UserService();

	@Component({})
	class Dashboard extends Vue {
		@Getter('user') public user: any;
		@Mutation public addUser: any;

		public logout() {
			userService.logUserOut();
			this.$router.push({ name: 'login' });
		}

		public beforeRouteEnter(to: Route, from: Route, next: any) {
			next((vm: any) => {
				if (!userService.isLoggedIn(vm.$store.getters.user)) {
					vm.$router.push({ name: 'login' });
				}
			});
		}
	}

	export default Dashboard;
</script>

<style lang="scss" scoped>
	@import './../../assets/sass/imports';

	.page {
		position: absolute;
		width: inherit;
	}

	.toolbar {
		background: map-get($colors, primary);
	}

	.active {
		background: rgba(map-get($colors, primary), 0.25);
		color: #fff;
	}
</style>
