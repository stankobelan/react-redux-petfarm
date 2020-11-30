import React, {useEffect, useState} from "react";
import {IFarm} from "../../../share/interfaces/IFarm";
import {IPet, PetType} from "../../../share/interfaces/IPet";
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'
import {addFarm} from '../../../redux/reducer/farmSlice';
import axios from '../../../axios-inst';
import {apiURL} from '../../../share/ApiUrl';
import FarmFormular from "./farm-form";
import {RootState} from "../../../redux/reducer/rootReducer";
import {Cat as CatClass} from "../../../share/models/Cat";
import {Dog as DogClass} from "../../../share/models/Dog";
import {addPetToFarm, clearNewFarm, initFarms, removePetFromFarm} from "../../../redux/reducer/createFarmSlice";
import {addNewFarmToCalc, addPetsToNewFarmForCalc} from "../../../redux/reducer/calcFarmSlice";
import {addArrayOfPets} from "../../../redux/reducer/petsSlice";
import GetListOfPets from "../../pets/pets-list";
import EMW from "../../../hoc/EMW/EMW";


const CreateFarm = () => {
    const dispatch = useDispatch();
    let history = useHistory();
    const onSubmit = () => {
        console.log()
        const data = {id: 0, name: name, address: address};
        axios.post<IFarm>(apiURL.OWNERS, data)
            .then(response => {
                dispatch(addFarm(response.data.id, response.data.name, response.data.address));
                dispatch(addNewFarmToCalc(response.data));
                let cats = newPetsForFarm
                    .filter(pet => pet.type === PetType.CAT)
                    .map(pet => {
                        let cat = {...pet} as CatClass;
                        cat.petOwnerId = response.data.id;
                        return cat;
                    });

                let dogs = newPetsForFarm
                    .filter(pet => pet.type === PetType.DOG)
                    .map(pet => {
                        let dog = {...pet} as DogClass
                        dog.petOwnerId = response.data.id;
                        return dog;
                    });

                axios.post<CatClass[]>(apiURL.CATS, cats).then(responses => {
                        let lCats = responses.data
                            .map(pet => {
                                let cat = {...pet} as CatClass;
                                cat.type = PetType.CAT;
                                return cat;
                            });

                        dispatch(addArrayOfPets(lCats));
                        dispatch(addPetsToNewFarmForCalc(lCats));
                    }
                );

                axios.post<DogClass[]>(apiURL.DOGS, dogs).then(responses => {

                        let lDogs = responses.data
                            .map(pet => {
                                let cat = {...pet} as DogClass;
                                cat.type = PetType.DOG;
                                return cat;
                            });
                        dispatch(addArrayOfPets(lDogs));
                        dispatch(addPetsToNewFarmForCalc(lDogs));
                    }
                );

                dispatch(clearNewFarm());
            })
        history.push("/");
    };

    const pets = useSelector(
        (state: RootState) => state.pets.pets
    );
    const currentPetsOnFarm = useSelector(
        (state: RootState) => state.createFarmSlice.farmPets
    );
    const availableCatsForFarm = useSelector(
        (state: RootState) => state.createFarmSlice.offerCats
    );
    const availableDogsForFarm = useSelector(
        (state: RootState) => state.createFarmSlice.offerDogs
    );

    const [newPetsForFarm, setNewPetsForFarm] = useState<IPet[]>([]);
    const [name, setName] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [availableDogs, setAvailableDogs] = useState<IPet[]>([]);
    const [availableCats, setAvailableCats] = useState<IPet[]>([]);


    useEffect(() => {
        console.log('init for form');
        dispatch(initFarms([...pets]));
    }, [pets])

    useEffect(() => {
        console.log('sync newPetsForFarm');
        setNewPetsForFarm([...currentPetsOnFarm]);
    }, [currentPetsOnFarm])

    useEffect(() => {
        console.log('sync avaliableCatsForFarm');
        setAvailableCats([...availableCatsForFarm]);
    }, [availableCatsForFarm])

    useEffect(() => {
        console.log('sync avaliableDogsForFarm');
        setAvailableDogs([...availableDogsForFarm]);
    }, [availableDogsForFarm])


    const removePetHandler = (index: number) => {
        let pet = {...newPetsForFarm[index]};
        dispatch(removePetFromFarm(pet));
    }

    const addCatToFarmHandler = (index: number) => {
        let pet = {...availableCats[index]};
        dispatch(addPetToFarm(pet));
    }

    const addDogToFarmHandler = (index: number) => {
        let pet = {...availableDogs[index]};
        dispatch(addPetToFarm(pet));
    }

    return (
        <EMW>
            <FarmFormular
                address={address}
                name={name}
                onSubmit={onSubmit}
                setAddress={setAddress}
                setName={setName}
                addNewCats={availableCats}
                addNewDogs={availableDogs}
                setNewCatForFarm={addCatToFarmHandler}
                setNewDogForFarm={addDogToFarmHandler}
            />
            <GetListOfPets
                // farmId={farmToEdit.id}
                edit={true}
                clickRemoveOrFeed={removePetHandler}
                listOfPets={currentPetsOnFarm}
            />
        </EMW>
    );
}
export default React.memo(CreateFarm);
