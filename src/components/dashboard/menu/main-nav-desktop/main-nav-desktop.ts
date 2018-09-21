import { Vue, Component, Prop } from 'vue-property-decorator';
import {MenuInterface} from '@/interfaces/menu.interface';

@Component
class MainNavDesktop extends Vue {
    @Prop()
    public menu: MenuInterface[];
}

export default MainNavDesktop;
