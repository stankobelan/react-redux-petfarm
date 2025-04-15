import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFarm } from '../../share/interfaces/IFarm';
import { IPet, PetType } from '../../share/interfaces/IPet';

export interface CreateFarmSliceState {
  farm: IFarm;
  offerDogs: IPet[];
  offerCats: IPet[];
  farmPets: IPet[];
}

const cleanFarm = { address: '', name: '', id: 0 };
const initialState: CreateFarmSliceState = {
  farm: cleanFarm,
  offerDogs: [],
  offerCats: [],
  farmPets: [],
};

const createFarmSlice = createSlice({
  name: 'CreateFarm',
  initialState,
  reducers: {
    modifyNewFarm(state, action: PayloadAction<IFarm>) {
      const editFarm = state.farm;
      if (editFarm) {
        editFarm.address = action.payload.address;
        editFarm.name = action.payload.name;
      }
    },
    addPetToFarm(state, action: PayloadAction<IPet>) {
      switch (action.payload.type) {
        case PetType.CAT:
          state.offerCats = state.offerCats.filter(
            x => x.id !== action.payload.id && x.type === action.payload.type
          );
          state.farmPets.push({ ...action.payload });

          break;
        case PetType.DOG:
          state.offerDogs = state.offerDogs.filter(
            x => x.id !== action.payload.id && x.type === action.payload.type
          );
          state.farmPets.push({ ...action.payload });

          break;
      }
    },

    removePetFromFarm(state, action: PayloadAction<IPet>) {
      switch (action.payload.type) {
        case PetType.CAT:
          state.farmPets = state.farmPets.filter(
            x => x.id !== action.payload.id && x.type === action.payload.type
          );
          state.offerCats.push({ ...action.payload });

          break;
        case PetType.DOG:
          state.farmPets = state.farmPets.filter(
            x => x.id !== action.payload.id && x.type === action.payload.type
          );
          state.offerDogs.push({ ...action.payload });

          break;
      }
    },

    clearNewFarm(state) {
      state.farm = { ...cleanFarm };
      state.offerDogs = [];
      state.offerCats = [];
      state.farmPets = [];
    },

    initFarms(state, action: PayloadAction<IPet[]>) {
      state.offerCats = action.payload.filter(s => s.type === PetType.CAT);
      state.offerDogs = action.payload.filter(s => s.type === PetType.DOG);
    },
  },
});

export const {
  initFarms: initFarmPets,
  addPetToFarm,
  clearNewFarm,
  removePetFromFarm,
} = createFarmSlice.actions;

export default createFarmSlice.reducer;
