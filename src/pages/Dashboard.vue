<template>
	<div class="dashboard">
		Dashboard works...

		{{ user.email }}

		<button @click="addUser({ email: 'homie'})">test</button>
	</div>
</template>

<!--<script>-->
	<!--export default {-->
		<!--data() {-->
			<!--return {-->
				<!--email: this.$store.getters.user.email || 'no email',-->
			<!--};-->
		<!--},-->
		<!--beforeRouteEnter(to, from, next) {-->
			<!--console.log('component enter...');-->
			<!--next();-->
		<!--},-->
	<!--}-->
<!--</script>-->

<script lang="ts">
	import {  Component, Vue } from 'vue-property-decorator';
	import { Getter, Mutation } from 'vuex-class';
	import {Route} from 'vue-router';
	import UserService from '../services/user.service';

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
