import React, { useEffect, useState } from 'react';
import { IFarm } from '../../../share/interfaces/IFarm';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { editFarm } from '../../../redux/reducer/farmSlice';
import axios from '../../../axios-inst';
import { apiURL } from '../../../share/ApiUrl';
import FarmFormular from './farm-form';
import EMW from '../../../hoc/EMW/EMW';
import GetListOfPets from '../../pets/pets-list';
import { IPet, PetType } from '../../../share/interfaces/IPet';
import { Dog as DogClass } from '../../../share/models/Dog';
import { removePet, addPets } from '../../../redux/reducer/petsSlice';
import { Cat as CatClass } from '../../../share/models/Cat';
import { RootState } from '../../../redux/reducer/rootReducer';
import { addPetToCaclulation, removePetToCaclulation } from 'redux/reducer/calcFarmSlice';
import {
  clearNewFarm,
  initFarms,
  addPetToFarm,
  removePetFromFarm,
} from '../../../redux/reducer/createFarmSlice';

interface LocationState {
  farmToEdit: {
    id: number;
    name: string;
    address: string;
  };
}

const EditFarm = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const location = useLocation<LocationState>();
  const { farmToEdit } = location.state;
  const [name, setName] = useState<string>(farmToEdit.name);
  const [address, setAddress] = useState<string>(farmToEdit.address);

  const pets = useSelector((state: RootState) => state.pets.pets);
  const availableCatsForFarm = useSelector((state: RootState) => state.createFarmSlice.offerCats);
  const availableDogsForFarm = useSelector((state: RootState) => state.createFarmSlice.offerDogs);

  const [listOfPets, setlistOfPets] = useState<IPet[]>([]);
  const [availableListOfCats, setAvailableListOfCats] = useState<IPet[]>([]);
  const [availableListOfDogs, setAvailableListOfDogs] = useState<IPet[]>([]);

  useEffect(() => {
    console.log('useEffect ListOfPets ');
    setlistOfPets([...pets.filter(item => item.petOwnerId === farmToEdit.id)]);
    if (availableCatsForFarm.length === 0) {
      // init catalog
      dispatch(initFarms([...pets.filter(item => item.petOwnerId !== farmToEdit.id)]));
    }
  }, [pets, farmToEdit.id]);

  useEffect(() => {
    console.log('sync avaliableCatsForFarm');
    setAvailableListOfCats([...availableCatsForFarm]);
  }, [availableCatsForFarm]);

  useEffect(() => {
    console.log('sync avaliableDogsForFarm');
    setAvailableListOfDogs([...availableDogsForFarm]);
  }, [availableDogsForFarm]);

  const removePetHandler = (index: number) => {
    const pet = { ...listOfPets[index] };

    switch (pet.type) {
      case PetType.DOG:
        {
          axios.delete<DogClass>(apiURL.DOGS + '/' + pet.id).then(() => {
            dispatch(removePet(pet));
            dispatch(removePetToCaclulation(pet));
            dispatch(removePetFromFarm(pet));
          });
        }
        break;
      case PetType.CAT:
        {
          axios.delete<CatClass>(apiURL.CATS + '/' + pet.id).then(() => {
            dispatch(removePet(pet));
            dispatch(removePetToCaclulation(pet));
            dispatch(removePetFromFarm(pet));
          });
        }
        break;
    }
  };

  const addCatToEditingFarmHandler = (index: number) => {
    const pet = { ...availableListOfCats[index] };
    pet.petOwnerId = farmToEdit.id;
    axios.post<CatClass[]>(apiURL.CATS, [pet]).then(response => {
      response.data
        .map(item => {
          item.type = PetType.CAT;
          return item;
        })
        .forEach(e => {
          dispatch(addPets(e));
          dispatch(addPetToCaclulation(e));
          dispatch(addPetToFarm(pet));
        });
    });
  };

  const addDogToEditingFarmHandler = (index: number) => {
    const pet = { ...availableListOfDogs[index] };
    pet.petOwnerId = farmToEdit.id;
    axios.post<DogClass[]>(apiURL.DOGS, [pet]).then(response => {
      response.data
        .map(item => {
          item.type = PetType.DOG;
          return item;
        })
        .forEach(e => {
          dispatch(addPetToFarm(e));
          dispatch(addPets(e));
          dispatch(addPetToCaclulation(pet));
        });
    });
  };

  const onSubmit = () => {
    console.log();
    const data = { id: farmToEdit.id, name: name, address: address };
    axios.put<IFarm>(apiURL.OWNERS + '/' + farmToEdit.id, data).then(() => {
      dispatch(editFarm(data as IFarm));
    });
    dispatch(clearNewFarm());
    history.push('/');
  };

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
};
export default React.memo(EditFarm);
