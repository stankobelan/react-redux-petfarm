import {IPet, PetType} from "../interfaces/IPet";

export class Dog implements IPet {
    public id: number | null;
    public pocetUhriznuti: number;
    public name: string | null;
    public datumNarodenia: Date;
    public petOwnerId: number | null;
    public pocetKrmeni: number;
    public type: PetType;

    constructor() {
        this.id = 0;
        this.pocetUhriznuti = 0;
        this.name = '';
        this.datumNarodenia = new Date();
        this.petOwnerId = null;
        this.pocetKrmeni = 0;
        this.type = PetType.DOG;
    }
}
