import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux"


import Farm from "./item/farm";
import {IFarm} from "../../share/interfaces/IFarm";
import axios from '../../axios-inst';
import {apiURL} from '../../share/ApiUrl';
import {RootState} from '../../redux/reducer/rootReducer';
import {initFarms, FarmSliceState} from "../../redux/reducer/farmSlice"
import {Cat as CatClass} from "../../share/models/Cat";
import {PetType} from "../../share/interfaces/IPet";
import {initPets} from "../../redux/reducer/petsSlice";
import {Dog as DogClass} from "../../share/models/Dog";


const ListOfFarms = (props: any) => {
    const dispatch = useDispatch();
    const farms = useSelector(
        (state: RootState) => state.farms.farms
    );
    const [listOfFarms, setListOfFarms] = useState<IFarm[]>(farms);

    useEffect(() => {
        console.log('useEffect 1x ListOfFarms');
        if (listOfFarms.length === 0) {
            axios.get<IFarm[]>(apiURL.OWNERS)
                .then(response => {
                    console.dir(response);
                    setListOfFarms([
                            ...listOfFarms,
                            ...response.data
                        ]
                    );
                    console.dir(response.data.length);
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
                        dispatch(initPets(cats));
                    }
                );

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
                    }
                );
        }
    }, []);

    useEffect(() => {
        console.log('useEffect for change farms');
        setListOfFarms([...farms]);
    }, [farms]);

    const farmsList = listOfFarms.map((item, index) =>
        <Farm
            key={item.id}
            id={item.id}
            name={item.name}
            address={item.address}
            getAverageDogsAge={() => ''}
            getAverageCatsAge={() => ''}
            pocetCats={() => 0}
            pocetDogs={() => 0}
        >
        </Farm>);

    return (

        <>
            {farmsList}

        </>
    );
}

export default React.memo(ListOfFarms);
