import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux"


import Farm from "./item/farm";
import {IFarm} from "../../share/interfaces/IFarm";
import axios from '../../axios-inst';
import {apiURL} from '../../share/ApiUrl';
import {RootState} from '../../redux/reducer/rootReducer';
import {initFarms} from "../../redux/reducer/farmSlice"
import {Cat as CatClass} from "../../share/models/Cat";
import { PetType} from "../../share/interfaces/IPet";
import {IFarmEx} from "../../share/interfaces/IFarmCalculation"
import {initPets, clearPets} from "../../redux/reducer/petsSlice";
import {Dog as DogClass} from "../../share/models/Dog";
import cssFarm from './farm.module.scss';
import {initFarmCalc, clearCaclulation} from "redux/reducer/calcFarmSlice";
import { clearNewFarm } from "redux/reducer/createFarmSlice";


const ListOfFarms = () => {
    const dispatch = useDispatch();

    const redux_farms = useSelector(
        (state: RootState) => state.farms.farms
    );

    const redux_calcFarms = useSelector(
        (state: RootState) => state.calcFarmSlice.calcFarms
    );

    const [extFarms, setextFarms] = useState<IFarmEx[]>([]);


    useEffect(() => {
        console.log('useEffect 1x ListOfFarms');
        dispatch(clearNewFarm());
        if (redux_farms.length === 0) {
            axios.get<IFarm[]>(apiURL.OWNERS)
                .then(response => {
                    // send to redux and wait for calculation
                    dispatch(initFarms([...response.data]));
                });

            axios.get<CatClass[]>(apiURL.CATS)
                .then(response => {
                        let cats = response.data.map(
                            (pet: CatClass) => {
                                let cat = {...pet};
                                cat.type = PetType.CAT
                                return cat;
                            }
                        );
                        dispatch(clearPets());
                        dispatch(clearCaclulation());
                        dispatch(initPets(cats));
                        dispatch(initFarmCalc(cats));

                        axios.get<DogClass[]>(apiURL.DOGS)
                            .then(response => {
                                    let dogs = response.data.map(
                                        (pet: DogClass) => {
                                            let dog = {...pet};
                                            dog.type = PetType.DOG
                                            return dog;
                                        }
                                    );
                                    dispatch(initPets(dogs));
                                    dispatch(initFarmCalc(dogs));
                                }
                            );
                    }
                );
        }
    }, []);

    useEffect(() => {
        console.log('useEffect for change => redux_calcFarms, redux_farms');
        console.dir(redux_calcFarms);
        console.dir(redux_farms);

        if (redux_calcFarms.length > 0 && redux_farms.length > 0) {

            let result = redux_farms.map(calc => {
                let farm = redux_calcFarms.find(farm => calc.id === farm.Id)
                return {...farm, ...calc} as IFarmEx;
            })
            console.dir(result);
            setextFarms(result);
        }
    }, [redux_calcFarms, redux_farms]);

    const farmsList = extFarms.map((item) =>
        <Farm
            key={item.id}
            id={item.id}
            name={item.name}
            address={item.address}
            averageDogsAge={(item.SumOfDogsAge / item.CountOfDogs).toFixed(2)}
            averageCatsAge={(item.SumOfCatsAge / item.CountOfCats).toFixed(2)}
            sumOfCats={item.CountOfCats}
            sumOfDogs={item.CountOfDogs}
        >
        </Farm>);

    return (

        <div className={cssFarm.container}>
            {farmsList}

        </div>
    );
}

export default React.memo(ListOfFarms);
