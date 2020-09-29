import React, {useEffect, useState} from "react";
import {IFarm} from "../../../share/interfaces/IFarm";
import {useHistory, useLocation} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'
import {editFarm} from '../../../redux/reducer/farmSlice';
import axios from '../../../axios-inst';
import {apiURL} from '../../../share/ApiUrl';
import FarmFormular from "./farm-form";
import EMW from "../../../hoc/EMW/EMW";
import GetListOfPets from "../../pets/pets-list";
import {IPet, PetType} from "../../../share/interfaces/IPet";
import {Dog as DogClass} from "../../../share/models/Dog";
import {removePet, addPets} from "../../../redux/reducer/petsSlice";
import {Cat as CatClass} from "../../../share/models/Cat";
import {RootState} from "../../../redux/reducer/rootReducer";
import {addPetToCaclulation, removePetToCaclulation} from "redux/reducer/calcFarmSlice";

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
            .then(() => {
                dispatch(editFarm(data as IFarm));
            })
        history.push("/");
    };
    let location = useLocation<LocationState>();
    const {farmToEdit} = location.state;
    const [name, setName] = useState<string>(farmToEdit.name);
    const [address, setAddress] = useState<string>(farmToEdit.address);

    const pets = useSelector(
        (state: RootState) => state.pets.pets
    );
    const [listOfPets, setlistOfPets] = useState<IPet[]>([]);
    const [availableListOfCats, setAvailableListOfCats] = useState<IPet[]>([]);
    const [availableListOfDogs, setAvailableListOfDogs] = useState<IPet[]>([]);

    useEffect(() => {
        console.log("useEffect ListOfPets ");
        setlistOfPets([...pets.filter(item => item.petOwnerId === (farmToEdit.id))]);
        setAvailableListOfCats([...pets.filter(item =>
            item.petOwnerId !== (farmToEdit.id) &&
            item.type === PetType.CAT)]);
        setAvailableListOfDogs([...pets.filter(item =>
            item.petOwnerId !== (farmToEdit.id) &&
            item.type === PetType.DOG)]);
    }, [pets, farmToEdit.id]);

    const removePetHandler = (index: number) => {
        let pet = {...listOfPets[index]};

        switch (pet.type) {
            case PetType.DOG: {
                axios.delete<DogClass>(apiURL.DOGS + '/' + pet.id)
                    .then(() => {
                            dispatch(removePet(pet));
                            dispatch(removePetToCaclulation(pet));
                        }
                    )
            }
                break;
            case PetType.CAT: {
                axios.delete<CatClass>(apiURL.CATS + '/' + pet.id)
                    .then(() => {
                            dispatch(removePet(pet));
                            dispatch(removePetToCaclulation(pet));
                        }
                    )
            }
                break;
        }
    }

    const addCatToEditingFarmHandler = (index: number) => {
        let pet = {...availableListOfCats[index]};
        pet.petOwnerId = farmToEdit.id
        axios.post<CatClass[]>(apiURL.CATS, [pet])
            .then(response => {
                    response.data.map(item => {
                        item.type = PetType.CAT;
                        return item;
                    }).forEach(e => {
                        dispatch(addPets(e));
                        dispatch(addPetToCaclulation(e));
                    });
                }
            )
    }

    const addDogToEditingFarmHandler = (index: number) => {
        let pet = {...availableListOfDogs[index]};
        pet.petOwnerId = farmToEdit.id
        axios.post<DogClass[]>(apiURL.DOGS, [pet])
            .then(response => {
                    response.data.map(item => {
                        item.type = PetType.DOG;
                        return item;
                    }).forEach(e => {
                        dispatch(addPets(e))
                        dispatch(addPetToCaclulation(e))
                    });
                }
            )
    }

    return (
        <EMW>
            <FarmFormular
                address={address}
                name={name}
                onSubmit={onSubmit}
                setAddress={setAddress}
                setName={setName}
                addNewDogs={availableListOfDogs}
                addNewCats={availableListOfCats}
                setNewCatForFarm={addCatToEditingFarmHandler}
                setNewDogForFarm={addDogToEditingFarmHandler}
            />
            <GetListOfPets
                // farmId={farmToEdit.id}
                edit={true}
                clickRemoveOrFeed={removePetHandler}
                listOfPets={listOfPets}
            />
        </EMW>
    );
}
export default React.memo(EditFarm);
