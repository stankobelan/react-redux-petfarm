import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPet, PetType } from '../../share/interfaces/IPet';
import { IFarmCalculation } from '../../share/interfaces/IFarmCalculation';
import { arrIsNotEmtyOrUndefined, getCalculationFarm, groupBy } from '../../share/sharedFunc';
import { toAge } from '../../share/SharedServiceFunc';
import { IFarm } from '../../share/interfaces/IFarm';

export interface CalcFarmSliceSliceState {
  calcFarms: IFarmCalculation[];
}

const initialState: CalcFarmSliceSliceState = {
  calcFarms: [],
};

function createEmtyFarmCalc(id: number) {
  return {
    Id: id,
    SumOfDogsAge: 0,
    SumOfCatsAge: 0,
    CountOfDogs: 0,
    CountOfCats: 0,
  } as IFarmCalculation;
}

const groupByOwner = groupBy('petOwnerId');

function countCatsAndDogs(action: PayloadAction<IPet>, farmCal: IFarmCalculation, pet: IPet) {
  switch (action.payload.type) {
    case PetType.DOG:
      {
        farmCal.CountOfDogs += 1;
        farmCal.SumOfDogsAge += toAge(pet.datumNarodenia);
      }
      break;
    case PetType.CAT:
      {
        farmCal.CountOfCats += 1;
        farmCal.SumOfCatsAge += toAge(pet.datumNarodenia);
      }
      break;
  }
}

const calcFarmSlice = createSlice({
  name: 'calcFarmSlice',
  initialState,
  reducers: {
    initFarmCalc(state, action: PayloadAction<IPet[]>) {
      //group by owner
      const initCalc = groupByOwner(action.payload);
      //get properties array
      const propertiesArray = Object.keys(initCalc);

      const resCalc = getCalculationFarm(initCalc, propertiesArray);

      if (!arrIsNotEmtyOrUndefined(state.calcFarms)) {
        state.calcFarms = resCalc;
      } else {
        // items which is not present in state
        const newItems = resCalc.filter(item => !state.calcFarms.some(el => el.Id === item.Id));

        const result = state.calcFarms.map(res => {
          const newVal = resCalc.find(s => s.Id === res.Id);
          if (newVal) {
            newVal.SumOfCatsAge += res.SumOfCatsAge;
            newVal.SumOfDogsAge += res.SumOfDogsAge;
            newVal.CountOfCats += res.CountOfCats;
            newVal.CountOfDogs += res.CountOfDogs;
            return newVal;
          } else return res;
        });
        state.calcFarms = [...result, ...newItems];
      }
    },

    addPetToCaclulation(state, action: PayloadAction<IPet>) {
      const pet = action.payload;
      let farmCal = state.calcFarms.find(
        (record: IFarmCalculation) => record.Id === pet.petOwnerId
      );
      if (!farmCal) {
        farmCal = createEmtyFarmCalc(pet.petOwnerId ?? 0);
        countCatsAndDogs(action, farmCal, pet);
        state.calcFarms.push(farmCal);
      } else {
        countCatsAndDogs(action, farmCal, pet);
      }
    },

    removePetToCaclulation(state, action: PayloadAction<IPet>) {
      const pet = action.payload;
      const farmCal = state.calcFarms.find(
        (record: IFarmCalculation) => record.Id === pet.petOwnerId
      );
      if (!farmCal) {
        return;
      }

      switch (action.payload.type) {
        case PetType.DOG:
          {
            farmCal.CountOfDogs -= 1;
            farmCal.SumOfDogsAge -= toAge(pet.datumNarodenia);
          }
          break;
        case PetType.CAT:
          {
            farmCal.CountOfCats -= 1;
            farmCal.SumOfCatsAge -= toAge(pet.datumNarodenia);
          }
          break;
      }
    },

    clearCaclulation(state) {
      state.calcFarms = [];
    },
    addNewFarmToCalc(state, action: PayloadAction<IFarm>) {
      state.calcFarms.push({
        Id: action.payload.id,
        CountOfCats: 0,
        SumOfCatsAge: 0,
        CountOfDogs: 0,
        SumOfDogsAge: 0,
      } as IFarmCalculation);
    },
    addPetsToNewFarmForCalc(state, action: PayloadAction<IPet[]>) {
      if (action.payload.length > 0) {
        const farm = state.calcFarms.find(x => x.Id === action.payload[0].petOwnerId);

        if (farm) {
          console.dir(farm);
          const dogCountArray = action.payload.filter(x => x.type === PetType.DOG).map(x => 1);
          console.dir(dogCountArray);
          farm.CountOfDogs += arrIsNotEmtyOrUndefined(dogCountArray)
            ? dogCountArray.reduce((sum, val) => (sum += val))
            : 0;
          console.dir(farm);
          const catCountArray = action.payload.filter(x => x.type === PetType.CAT).map(x => 1);
          console.dir(catCountArray);
          farm.CountOfCats += arrIsNotEmtyOrUndefined(catCountArray)
            ? catCountArray.reduce((sum, val) => (sum += val))
            : 0;
          console.dir(farm);
          const dogsAgeArray = action.payload
            .filter(x => x.type === PetType.DOG)
            .map(x => toAge(x.datumNarodenia));
          console.dir(dogsAgeArray);
          farm.SumOfDogsAge += arrIsNotEmtyOrUndefined(dogsAgeArray)
            ? dogsAgeArray.reduce((sum, val) => (sum += val))
            : 0;
          console.dir(farm);

          const catAgeArray = action.payload
            .filter(x => x.type === PetType.CAT)
            .map(x => toAge(x.datumNarodenia));
          console.dir(catAgeArray);
          farm.SumOfCatsAge += arrIsNotEmtyOrUndefined(catAgeArray)
            ? catAgeArray.reduce((sum, val) => (sum += val))
            : 0;
          console.dir(farm);
        }
      }
    },
  },
});

export const {
  initFarmCalc,
  addPetToCaclulation,
  removePetToCaclulation,
  clearCaclulation,
  addNewFarmToCalc,
  addPetsToNewFarmForCalc,
} = calcFarmSlice.actions;

export default calcFarmSlice.reducer;
