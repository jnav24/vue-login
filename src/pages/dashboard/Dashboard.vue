<template>
	<div class="dashboard">
		<v-toolbar dark>
			<v-toolbar-title>
				Logo here
			</v-toolbar-title>
			<v-spacer></v-spacer>
			<v-toolbar-items>
				<router-link :to="{ name: 'dashboard' }">Home</router-link> |
				<router-link :to="{ name: 'profile' }">Profile</router-link>
			</v-toolbar-items>
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

		<v-system-bar color="primary">
			Dashboard
		</v-system-bar>

		Dashboard works... {{ user.email }}

		<router-view></router-view>
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
