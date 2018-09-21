<script src="./main-nav-mobile.ts" lang="ts"></script>
<style src="./main-nav-mobile.scss" lang="scss"></style>

<template>
	<div class="main-nav-mobile">
		<v-navigation-drawer
			v-model="showMenu"
			value="true"
			absolute
			temporary>
			<div v-for="(item, index) in menu" :key="index">
				<v-list>
					<v-list-tile v-if="!item.submenu.length">
						<v-list-tile-title>
							<router-link :to="item.link">{{ item.name }}</router-link>
						</v-list-tile-title>
					</v-list-tile>

					<v-list-group v-if="item.submenu.length"value="true">
						<v-list-tile slot="activator">
							<v-list-tile-title>
								{{ item.name }}
							</v-list-tile-title>
						</v-list-tile>

						<v-list-tile v-for="(sub, int) in item.submenu" :key="int">
							<v-list-tile-content>
								<v-list-tile-title>
									<router-link :to="sub.link">{{ sub.name }}</router-link>
								</v-list-tile-title>
							</v-list-tile-content>
						</v-list-tile>
					</v-list-group>
				</v-list>
			</div>
		</v-navigation-drawer>
	</div>
</template>
