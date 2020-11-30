import calcFarms, {initFarmCalc, addPetToCaclulation} from './calcFarmSlice';
import {IPet, PetType} from "../../share/interfaces/IPet";

describe('calcFarmSlice', () => {
    it('should return initstate', () => {
        expect(calcFarms(undefined, {})).toEqual({calcFarms: []});
    });
    it('initFarmCalc is working', () => {
        expect(initFarmCalc([],
            [{id: 1, petOwnerId: 1, pocetKrmeni: 0, datumNarodenia: Date.now(), type: PetType.DOG}])
        ).toEqual({"payload": [], "type": `calcFarmSlice/initFarmCalc`});
    });

    it('addPetToCaclulation is working', () => {
        expect(addPetToCaclulation([],
            [{id: 1, petOwnerId: 1, pocetKrmeni: 0, datumNarodenia: Date.now(), type: PetType.DOG}])
        ).toEqual({"payload": [], "type": `calcFarmSlice/addPetToCaclulation`});
    });

    it('addPetToCaclulation test', () => {
        let state = {calcFarms: []}
        expect(calcFarms(state, addPetToCaclulation({
                id: 1,
                petOwnerId: 1,
                pocetKrmeni: 0,
                datumNarodenia: Date.now(),
                type: PetType.DOG
            })
        )).toEqual({
            "calcFarms": [
                {
                    "CountOfCats": 0,
                    "CountOfDogs": 1,
                    "Id": 1,
                    "SumOfCatsAge": 0,
                    "SumOfDogsAge": 0,
                },
            ],
        });
    });

    it('addPetToCaclulation test with state', () => {
        let state = {
            "calcFarms": [
                {
                    "CountOfCats": 0,
                    "CountOfDogs": 1,
                    "Id": 1,
                    "SumOfCatsAge": 0,
                    "SumOfDogsAge": 0,
                },
            ],
        }
        expect(calcFarms(state, addPetToCaclulation({
                id: 1,
                petOwnerId: 1,
                pocetKrmeni: 0,
                datumNarodenia: Date.now(),
                type: PetType.DOG
            })
        )).toEqual({
            "calcFarms": [
                {
                    "CountOfCats": 0,
                    "CountOfDogs": 2,
                    "Id": 1,
                    "SumOfCatsAge": 0,
                    "SumOfDogsAge": 0,
                },
            ],
        });
    });
});
