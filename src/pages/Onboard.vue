<template>
	<div class="onboard">
		<router-view></router-view>
	</div>
</template>

<script lang="ts">
	import { Component, Vue } from 'vue-property-decorator';

	@Component({})
	class Onboard extends Vue {}

	export default Onboard;
</script>

<style lang="scss" scoped>
	@import './../assets/sass/imports';

	.onboard {
		background: #EEE;
		height: 100%;
		left: 0;
		padding-top: 15%;
		position: absolute;
		top: 0;
		width: 100%;
	}
</style>
