import React, {useState} from "react";
import {IFarm} from "../../../share/interfaces/IFarm";
import {IPet} from "../../../share/interfaces/IPet";
import {useHistory } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'
import {addFarm} from '../../../redux/reducer/farmSlice';
import axios from '../../../axios-inst';
import {apiURL} from '../../../share/ApiUrl';
import FarmFormular from "./farm-form";
import {RootState} from "../../../redux/reducer/rootReducer";
import {Dog} from "../../../share/models/Dog";
import {Cat} from "../../../share/models/Cat";

const CreateFarm = () => {
    const dispatch = useDispatch();
    let history = useHistory();
    const onSubmit = () => {
        console.log()
        const data = {id: 0, name: name, address: address};
        axios.post<IFarm>(apiURL.OWNERS , data)
            .then(response => {
                dispatch(addFarm(response.data.id, response.data.name, response.data.address));
            })
        history.push("/");
    };
    const pets = useSelector(
        (state: RootState) => state.pets.pets
    );
    const [listOfPets, setListOfPets] = useState<IPet[]>(pets);
    const [name, setName] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [addNewDogs, setDogs] = useState<IPet[]>();
    const [addNewCats, setCats] = useState<IPet[]>();


    return (
        <FarmFormular
            address={address}
            name={name}
            onSubmit={onSubmit}
            setAddress={setAddress}
            setName={setName}
            addNewCats={addNewCats}
            addNewDogs={addNewDogs}
            setNewCats={setCats}
            setNewDogs={setDogs}
        />
    );
}
export default React.memo(CreateFarm);
