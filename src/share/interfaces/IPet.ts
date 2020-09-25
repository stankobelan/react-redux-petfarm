export enum PetType {
 DOG= "DOG",
 CAT="CAT"
}

export interface IPet {
    id: number | null,
    petOwnerId: number | null,
    pocetKrmeni: number,
    datumNarodenia: Date,
    type: PetType
}
