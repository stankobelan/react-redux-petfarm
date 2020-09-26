import {IPet, PetType} from "../../share/interfaces/IPet";
import {Dog as DogClass} from "../../share/models/Dog";
import {Dog as DogComponent} from "./item/Dog";
import {Cat as CatClass} from "../../share/models/Cat";
import {Cat as CatComponent} from "./item/Cat";
import React, {useEffect, useState} from "react";
import {toBeautifulString} from "../../share/SharedServiceFunc";
import {useDispatch, useSelector} from "react-redux";
import {updatePet, removePet} from "redux/reducer/petsSlice";
import axios from '../../axios-inst';
import {apiURL} from '../../share/ApiUrl';
import {RootState} from "../../redux/reducer/rootReducer";

interface IGetListOfPetsProps {
    farmId: number | null,
    edit: boolean
}

const GetListOfPets = (props: IGetListOfPetsProps) => {

    const pets = useSelector(
        (state: RootState) => state.pets.pets
    );
    const [listOfPets, setlistOfPets] = useState<IPet[]>(pets.filter(x => x.petOwnerId === props.farmId));
    const dispatch = useDispatch();

    useEffect(() => {
        console.log('useEffect GetListOfPets for props.listOfPets');
        setlistOfPets(pets.filter(x => x.petOwnerId === props.farmId));
    }, [pets, props.farmId]);

    const feedPet = (index: number) => {
        let pet = {...listOfPets[index]};
        pet.pocetKrmeni += 1;
        switch (pet.type) {
            case PetType.DOG: {
                axios.put<DogClass>(apiURL.DOGS + '/' + pet.id, pet)
                    .then(response => {
                            dispatch(updatePet(pet));
                        }
                    )
            }
                break;
            case PetType.CAT: {
                axios.put<CatClass>(apiURL.CATS + '/' + pet.id, pet)
                    .then(response => {
                            dispatch(updatePet(pet));
                        }
                    )
            }
                break;
        }
    }
    const removePetHandler = (index: number) => {
        let pet = {...listOfPets[index]};

        switch (pet.type) {
            case PetType.DOG: {
                axios.delete<DogClass>(apiURL.DOGS + '/' + pet.id)
                    .then(response => {
                            dispatch(removePet(pet));
                        }
                    )
            }
                break;
            case PetType.CAT: {
                axios.delete<CatClass>(apiURL.CATS + '/' + pet.id)
                    .then(response => {
                            dispatch(removePet(pet));
                        }
                    )
            }
                break;
        }
    }

    const list = listOfPets.map((pet, index) => {
        switch (pet.type) {
            case PetType.CAT:
                let cat = pet as CatClass;
                return <CatComponent key={index}
                                     name={cat.name}
                                     age={toBeautifulString(cat.datumNarodenia)}
                                     id={index}
                                     pocetKrmeni={cat.pocetKrmeni}
                                     pocetMaciatok={cat.pocetMaciatok}
                                     edit={props.edit}
                                     click={() => props.edit ? removePetHandler(index) : feedPet(index)}
                />
                break;
            case PetType.DOG:
                let dog = pet as DogClass;
                return <DogComponent key={index}
                                     name={dog.name}
                                     age={toBeautifulString(dog.datumNarodenia)}
                                     id={index}
                                     pocetKrmeni={dog.pocetKrmeni}
                                     pocetUhriznuti={dog.pocetUhriznuti}
                                     edit={props.edit}
                                     click={() => props.edit ? removePetHandler(index) : feedPet(index)}
                />
                break;
            default:
                return null;
        }

    });

    return <> {list} </>
}
export default React.memo(GetListOfPets);
