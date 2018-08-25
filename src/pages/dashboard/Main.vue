<template>
	<div class="main page">
		<v-card width="1000" height="500">
			<v-card-title>
				Main page... works!
				{{ user.email }}
			</v-card-title>
		</v-card>
	</div>
</template>

<script lang="ts">
	import { Vue, Component } from 'vue-property-decorator';
	import { Getter } from 'vuex-class';

	@Component
	class Main extends Vue {
		@Getter('user') public user: any;
	}

	export default Main;
</script>

<style lang="scss" scoped></style>
