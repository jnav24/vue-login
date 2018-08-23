<template>
	<div class="dashboard">
		Dashboard works...
		{{ email || 'no email' }}
	</div>
</template>

<script lang="ts">
	import { Component, Vue } from 'vue-property-decorator';

	@Component({})
	class Dashboard extends Vue {
		public email = this.$store.getters.user.email;
	}

	export default Dashboard;
</script>
