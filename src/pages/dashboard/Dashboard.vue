<template>
	<div class="dashboard">
		<v-toolbar color="primary">
			<div id="nav">
				<router-link :to="{ name: 'dashboard' }">Home</router-link> |
				<router-link :to="{ name: 'profile' }">Profile</router-link>
			</div>
		</v-toolbar>

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

	@Component({})
	class Dashboard extends Vue {
		@Getter('user') public user: any;
		@Mutation public addUser: any;

		public beforeRouteEnter(to: Route, from: Route, next: any) {
			next((vm: any) => {
				const userService = new UserService();

				if (!userService.isLoggedIn(vm.$store.getters.user)) {
					vm.$router.push({ name: 'login' });
				}
			});
		}
	}

	export default Dashboard;
</script>
