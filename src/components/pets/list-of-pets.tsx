import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from '../../axios-inst';
import {apiURL} from '../../share/ApiUrl';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/reducer/rootReducer";
import {IPet, PetType} from "../../share/interfaces/IPet";
import {Cat as CatClass} from "../../share/models/Cat";
import {initPets} from "redux/reducer/petsSlice";
import {Dog as DogClass} from "../../share/models/Dog";
import GetListOfPets from "./pets-list";

interface queryUrlParams {
    id: string;
}

const ListOfPets = () => {
    const dispatch = useDispatch();
    const pets = useSelector(
        (state: RootState) => state.pets.pets
    );
    const [listOfPets, setListOfPets] = useState<IPet[]>(pets);
    let {id} = useParams<queryUrlParams>();

    useEffect(() => {
        console.log("useEffect ListOfPets ");
        setListOfPets([...pets.filter(item => item.petOwnerId === (+id))]);
    }, [ pets]);

    return (<GetListOfPets farmId={+id} edit={false}></GetListOfPets>);
}

export default React.memo(ListOfPets);
