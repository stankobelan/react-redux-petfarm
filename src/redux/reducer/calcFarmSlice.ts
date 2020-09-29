import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IPet, PetType} from "../../share/interfaces/IPet";
import {IFarmCalculation} from "../../share/interfaces/IFarmCalculation";
import {arrIsNotEmtyOrUndefined, getCalculationFarm, groupBy} from "../../share/sharedFunc";
import {toAge} from "../../share/SharedServiceFunc";
import {IFarm} from "../../share/interfaces/IFarm";


export interface CalcFarmSliceSliceState {
    calcFarms: IFarmCalculation[]
}

const initialState: CalcFarmSliceSliceState = {
    calcFarms: []
}

function createEmtyFarmCalc(id: number) {
    return {Id: id, SumOfDogsAge: 0, SumOfCatsAge: 0, CountOfDogs: 0, CountOfCats: 0} as IFarmCalculation;
}

const groupByOwner = groupBy('petOwnerId')

const calcFarmSlice = createSlice({
    name: 'calcFarmSlice',
    initialState,
    reducers: {

        initFarmCalc(state, action: PayloadAction<IPet[]>) {
            //group by owner
            const initCalc = groupByOwner(action.payload);
            //get properties array
            const propertiesArray = Object.keys(initCalc);

            let resCalc = getCalculationFarm(initCalc, propertiesArray);

            if (!arrIsNotEmtyOrUndefined(state.calcFarms)) {

                state.calcFarms = resCalc;

            } else {
                // items which is not present in state
                let newItems = resCalc
                    .filter(item =>
                        !state.calcFarms.some(el => el.Id === item.Id));

                let result = state.calcFarms.map(res => {
                    let newVal = resCalc.find(s => s.Id === res.Id);
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
            let pet = action.payload;
            let farmCal = state.calcFarms.find((record: IFarmCalculation) => record.Id === pet.petOwnerId);
            if (!farmCal) {
                farmCal = createEmtyFarmCalc(pet.petOwnerId ?? 0);
            }

            switch (action.payload.type) {
                case PetType.DOG: {
                    farmCal.CountOfDogs += 1;
                    farmCal.SumOfDogsAge += toAge(pet.datumNarodenia);
                }
                    break;
                case PetType.CAT: {
                    farmCal.CountOfCats += 1;
                    farmCal.SumOfCatsAge += toAge(pet.datumNarodenia);
                }
                    break;
            }

        },

        removePetToCaclulation(state, action: PayloadAction<IPet>) {
            let pet = action.payload;
            let farmCal = state.calcFarms.find((record: IFarmCalculation) => record.Id === pet.petOwnerId);
            if (!farmCal) {
                return;
            }

            switch (action.payload.type) {
                case PetType.DOG: {
                    farmCal.CountOfDogs -= 1;
                    farmCal.SumOfDogsAge -= toAge(pet.datumNarodenia);
                }
                    break;
                case PetType.CAT: {
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
                SumOfDogsAge: 0
            } as IFarmCalculation);
        },
        addPetsToNewFarmForCalc(state, action: PayloadAction<IPet[]>) {
            if (action.payload.length > 0) {
                let farm = state.calcFarms.find(x => x.Id === action.payload[0].petOwnerId);

                if (farm) {
                    console.dir(farm);
                    let dogCountArray = action.payload
                        .filter(x => x.type === PetType.DOG)
                        .map(x => 1);
                    console.dir(dogCountArray);
                    farm.CountOfDogs += arrIsNotEmtyOrUndefined(dogCountArray) ?
                        dogCountArray.reduce((sum, val) => sum += val) : 0;
                    console.dir(farm);
                    let catCountArray = action.payload
                        .filter(x => x.type === PetType.CAT)
                        .map(x => 1);
                    console.dir(catCountArray);
                    farm.CountOfCats += arrIsNotEmtyOrUndefined(catCountArray) ?
                        catCountArray.reduce((sum, val) => sum += val) : 0;
                    console.dir(farm);
                    let dogsAgeArray = action.payload
                        .filter(x => x.type === PetType.DOG)
                        .map(x => toAge(x.datumNarodenia));
                    console.dir(dogsAgeArray);
                    farm.SumOfDogsAge += arrIsNotEmtyOrUndefined(dogsAgeArray) ?
                        dogsAgeArray.reduce((sum, val) => sum += val) : 0;
                    console.dir(farm);

                    let catAgeArray = action.payload
                        .filter(x => x.type === PetType.CAT)
                        .map(x => toAge(x.datumNarodenia));
                    console.dir(catAgeArray);
                    farm.SumOfCatsAge += arrIsNotEmtyOrUndefined(catAgeArray) ?
                        catAgeArray.reduce((sum, val) => sum += val) : 0;
                    console.dir(farm);
                }
            }
        }
    }
});

export const {
    initFarmCalc,
    addPetToCaclulation,
    removePetToCaclulation,
    clearCaclulation,
    addNewFarmToCalc, addPetsToNewFarmForCalc
} = calcFarmSlice.actions;

export default calcFarmSlice.reducer;
