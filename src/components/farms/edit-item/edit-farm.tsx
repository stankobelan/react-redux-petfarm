import React, { useState} from "react";
import {IFarm} from "../../../share/interfaces/IFarm";
import {useHistory, useLocation} from "react-router-dom";
import {useDispatch } from 'react-redux'
import {editFarm } from '../../../redux/reducer/farmSlice';
import axios from '../../../axios-inst';
import {apiURL} from '../../../share/ApiUrl';
import FarmFormular from "./farm-form";
import EMW from "../../../hoc/EMW/EMW";
import GetListOfPets from "../../pets/pets-list";

interface LocationState {
    farmToEdit: {
        id: number,
        name: string,
        address: string
    }
}

const EditFarm = () => {
    const dispatch = useDispatch();
    let history = useHistory();
    const onSubmit = () => {
        console.log()
        const data = {id: farmToEdit.id, name: name, address: address};
        axios.put<IFarm>(apiURL.OWNERS + '/' + farmToEdit.id, data)
            .then(response => {
                dispatch(editFarm(data as IFarm));
            })
        history.push("/");
    };
    let location = useLocation<LocationState>();
    const {farmToEdit} = location.state;

    const [name, setName] = useState<string>(farmToEdit.name);
    const [address, setAddress] = useState<string>(farmToEdit.address);

    return (
        <EMW>
            <FarmFormular
                address={address}
                name={name}
                onSubmit={onSubmit}
                setAddress={setAddress}
                setName={setName}
            />
            <GetListOfPets
                farmId={farmToEdit.id} edit={true}
            />
        </EMW>
    );
}
export default React.memo(EditFarm);
