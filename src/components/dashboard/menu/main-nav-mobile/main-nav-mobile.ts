import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import {MenuInterface} from '@/interfaces/menu.interface';

@Component
class MainNavMobile extends Vue {
    @Prop()
    public menu: MenuInterface[];

    @Prop()
    public showMenu: boolean;

    @Emit('updateMenu')
    public updateMenu(menu: boolean) {
        // ...
    }

    public get displayMenu(): boolean {
        return this.showMenu;
    }

    public set displayMenu(menu: boolean) {
        this.updateMenu(menu);
    }

    public hasSubmenu(item: MenuInterface): boolean | number {
        return (typeof item.submenu !== 'undefined' && item.submenu.length);
    }
}

export default MainNavMobile;
