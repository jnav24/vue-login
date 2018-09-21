<script src="./main-nav-desktop.ts" lang="ts"></script>
<style src="./main-nav-desktop.scss" lang="scss"></style>

<template>
	<div class="main-nav-desktop">
		<v-toolbar-items class="main-menu">
			<v-menu v-for="(item, index) in menu"
					:key="index"
					offset-y
					open-on-hover>
				<router-link
					slot="activator"
					tag="v-btn"
					class="v-btn--flat"
					active-class="active"
					:to="item.link"
					exact>
					{{ item.name }}
				</router-link>

				<v-list v-if="item.submenu.length" class="submenu">
					<v-list-tile
						v-for="(sub, int) in item.submenu"
						:key="int">
						<v-list-tile-title>
							<router-link
								:to="sub.link">{{ sub.name }}</router-link>
						</v-list-tile-title>
					</v-list-tile>
				</v-list>
			</v-menu>
		</v-toolbar-items>
	</div>
</template>
