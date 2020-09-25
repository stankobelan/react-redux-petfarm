import {IPet, PetType} from "../interfaces/IPet";

export class Cat implements IPet{
    public id: number | null ;
    public pocetMaciatok: number;
    public name: string | null;
    public datumNarodenia: Date;
    public dbState: string;
    public petOwnerId: number | null;
    public pocetKrmeni: number;
    public type: PetType;

    constructor() {
        this.id = 0;
        this.pocetMaciatok = 0;
        this.name = '';
        this.datumNarodenia = new Date();
        this.dbState = '';
        this.petOwnerId = null;
        this.pocetKrmeni = 0;
        this.type = PetType.CAT;
    }
}
