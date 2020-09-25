import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AppDispatch, AppThunk} from '../data/store';
import {IPet, PetType} from "../../share/interfaces/IPet";
import {Cat} from "../../share/models/Cat";
import {Dog} from "../../share/models/Dog";


export interface FarmSliceState {
    current: number,
    pets: IPet[]
}

const initialState: FarmSliceState = {
    current: 0,
    pets: []
}

const petsSlice = createSlice({
    name: 'pets',
    initialState,
    reducers: {
        addPets(state, action: PayloadAction<IPet>) {
            state.pets.push(action.payload);
        },
        updatePet(state, action: PayloadAction<IPet>) {
            let edit = state.pets.find(item => item.id === action.payload.id && item.type === action.payload.type);
            if (edit) {
                edit.pocetKrmeni = action.payload.pocetKrmeni;
            }
        },
        removePet(state, action: PayloadAction<IPet>) {
            state.pets = state.pets.filter(item => item.id !== action.payload.id);
        },
        initPets(state, action: PayloadAction<IPet[]>) {
            if (state.pets.length === 0)
                state.pets = action.payload;
            else state.pets.push(...action.payload);
        }
    }
});

export const {updatePet, removePet, initPets} = petsSlice.actions;


export const addPets = (
    id: number, datumNar: Date, feedingCount: number, petOwnerId: number, type: PetType
): AppThunk => async (dispatch: AppDispatch) => {
    let newPet;
    if (type === PetType.CAT) {
        newPet = new Cat();
        newPet.id = id;
        newPet.datumNarodenia = datumNar;
        newPet.pocetKrmeni = feedingCount;
        newPet.petOwnerId = petOwnerId;
    }

    if (type === PetType.DOG) {
        newPet = new Dog();
        newPet.id = id;
        newPet.datumNarodenia = datumNar;
        newPet.pocetKrmeni = feedingCount;
        newPet.petOwnerId = petOwnerId;
    }

    dispatch(petsSlice.actions.addPets(newPet as IPet));
}

export default petsSlice.reducer;
