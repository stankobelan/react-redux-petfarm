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
import {Dog as DogClass, Dog} from "../../../share/models/Dog";
import {Cat as CatClass, Cat} from "../../../share/models/Cat";
import {
    removePetFromFarm,
    initFarms,
    addPetToFarm,
    clearNewFarm,
    modifyNewFarm
} from "../../../redux/reducer/createFarmSlice";


const CreateFarm = () => {
    const dispatch = useDispatch();
    let history = useHistory();
    const onSubmit = () => {
        console.log()
        const data = {id: 0, name: name, address: address};
        axios.post<IFarm>(apiURL.OWNERS, data)
            .then(response => {
                dispatch(addFarm(response.data.id, response.data.name, response.data.address));
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
        console.log('sync newPetsForFarm');
        setAvailableCats([...availableCatsForFarm]);
    }, [availableCatsForFarm])

    useEffect(() => {
        console.log('init for form');
        setAvailableDogs([...availableDogsForFarm]);
    }, [availableDogsForFarm])


    const removePetHandler = (index: number) => {
        let pet = {...newPetsForFarm[index]};
        dispatch(removePetFromFarm(pet));
    }

    const addCatToFarmHandler = (index: number) => {
        let pet = {...availableCats[index]};
        dispatch(removePetFromFarm(pet));
    }

    const addDogToFarmHandler = (index: number) => {
        let pet = {...availableDogs[index]};
        dispatch(removePetFromFarm(pet));
    }

    return (
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
    );
}
export default React.memo(CreateFarm);
