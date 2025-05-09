import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../axios-inst';
import { apiURL } from '../../share/ApiUrl';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/reducer/rootReducer';
import { IPet, PetType } from '../../share/interfaces/IPet';
import { Cat as CatClass } from '../../share/models/Cat';
import { updatePet } from 'redux/reducer/petsSlice';
import { Dog as DogClass } from '../../share/models/Dog';
import GetListOfPets from './pets-list';

interface queryUrlParams {
  id: string;
}

const ListOfPets = () => {
  const dispatch = useDispatch();
  const pets = useSelector((state: RootState) => state.pets.pets);
  const [listOfPets, setListOfPets] = useState<IPet[]>([]);
  const { id } = useParams<queryUrlParams>();

  useEffect(() => {
    console.log('useEffect ListOfPets ');
    console.dir(pets);
    console.dir(+id);
    console.dir([...pets.filter(item => item.petOwnerId === +id)]);
    setListOfPets([...pets.filter(item => item.petOwnerId === +id)]);
  }, [pets, id]);

  const feedPet = (index: number) => {
    const pet = { ...listOfPets[index] };
    pet.pocetKrmeni += 1;
    switch (pet.type) {
      case PetType.DOG:
        {
          axios.put<DogClass>(apiURL.DOGS + '/' + pet.id, pet).then(() => {
            dispatch(updatePet(pet));
          });
        }
        break;
      case PetType.CAT:
        {
          axios.put<CatClass>(apiURL.CATS + '/' + pet.id, pet).then(() => {
            dispatch(updatePet(pet));
          });
        }
        break;
    }
  };

  return (
    <GetListOfPets
      // farmId={+id}
      edit={false}
      clickRemoveOrFeed={feedPet}
      listOfPets={listOfPets}
    />
  );
};

export default React.memo(ListOfPets);
