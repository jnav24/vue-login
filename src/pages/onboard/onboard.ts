import { Component, Vue } from 'vue-property-decorator';

@Component
class Onboard extends Vue {
    public currentYear: string | number = '';
    private date: Date | null = null;

    constructor() {
        super();
        this.date = new Date();
        this.currentYear = this.date.getFullYear();
    }
}

export default Onboard;
