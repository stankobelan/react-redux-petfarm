import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IPet, PetType} from "../../share/interfaces/IPet";
import {IFarmCalculation} from "../../share/interfaces/IFarmCalculation";
import {arrIsNotEmtyOrUndefined, getCalculationFarm, groupBy} from "../../share/sharedFunc";
import { toAge} from "../../share/SharedServiceFunc";


export interface CalcFarmSliceSliceState {
    calcFarms: IFarmCalculation[]
}

const initialState: CalcFarmSliceSliceState = {
    calcFarms: []
}

function createEmtyFarmCalc(id:number){
    return {Id : id, SumOfDogsAge:0 , SumOfCatsAge: 0 , CountOfDogs: 0, CountOfCats:0 } as IFarmCalculation;
}
const groupByOwner = groupBy('petOwnerId')

const calcFarmSlice = createSlice({
    name: 'calcFarmSlice',
    initialState,
    reducers: {

        initFarmCalc(state, action: PayloadAction<IPet[]>) {
            console.dir('initFarmCalc');
            //group by owner
            const initCalc = groupByOwner(action.payload);
            //get properties array
            const propertiesArray = Object.keys(initCalc);
            console.dir(propertiesArray);
            let resCalc = getCalculationFarm(initCalc, propertiesArray);

            if(!arrIsNotEmtyOrUndefined(state.calcFarms))
            {
                console.dir('state.calcFarms = resCalc');
                state.calcFarms = resCalc;
                console.dir(resCalc);
            }
             else {
                console.dir('if(!arrIsNotEmtyOrUndefined(state.calcFarms))');
                console.dir('state.calcFarms');
                console.dir(state.calcFarms.length);
                console.dir('resCalc');
                console.dir(resCalc);
                 // items which is not present in state
                 let newItems = resCalc
                     .filter(item =>
                         !state.calcFarms.some(el => el.Id === item.Id));
                console.dir('newItems');
                console.dir(newItems);
                let result = state.calcFarms.map( res => {
                    let newVal = resCalc.find(s => s.Id === res.Id);
                    if (newVal){
                        newVal.SumOfCatsAge += res.SumOfCatsAge;
                        newVal.SumOfDogsAge += res.SumOfDogsAge;
                        newVal.CountOfCats += res.CountOfCats;
                        newVal.CountOfDogs += res.CountOfDogs;
                        return newVal;
                    }
                    else return res;
                });
                console.dir('result');
                console.dir(result);

                state.calcFarms = [...result,  ...newItems];
            }
        },

        addPetToCaclulation(state, action: PayloadAction<IPet>) {
            let pet = action.payload;
            let farmCal = state.calcFarms.find((record: IFarmCalculation) => record.Id === pet.petOwnerId);
            if (!farmCal) {
                farmCal = createEmtyFarmCalc(pet.petOwnerId??0);
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
            if (!farmCal) { return;}

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
    }
});

export const {initFarmCalc, addPetToCaclulation, removePetToCaclulation, clearCaclulation} = calcFarmSlice.actions;

export default calcFarmSlice.reducer;
