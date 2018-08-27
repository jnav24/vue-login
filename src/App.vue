<template>
	<div id="app">
		<v-app>
			<router-view/>
		</v-app>
	</div>
</template>

<style lang="scss">
	@import './assets/sass/imports';

	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
	}

	#nav {
		padding: 30px;

		a {
			color: map_get($colors, link_dark);
			font-weight: bold;

			&.router-link-exact-active {
				color: map_get($colors, link_dark_active);
			}
		}
	}
</style>
