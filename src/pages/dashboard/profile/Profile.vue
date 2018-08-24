<template>
	<div class="dashboard--profile">
		Profile works... {{ user.email }}
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
