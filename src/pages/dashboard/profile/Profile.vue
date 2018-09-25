<template>
	<div class="dashboard--profile page">
		<v-card width="1000" height="500">
			<v-card-title>
				Profile page... works!
				{{ user.email }}
			</v-card-title>
		</v-card>
	</div>
</template>

<script lang="ts">
	import { Component, Vue } from 'vue-property-decorator';
	import { Getter, Mutation } from 'vuex-class';

	@Component
	class Profile extends Vue {
		@Getter('user')
		public user: any;
	}

	export default Profile;
</script>
