import React, { useEffect, useState } from 'react';
import { Card, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../redux/data/store';
import { IPet, PetType } from '../../../share/interfaces/IPet';
import { Cat as CatClass } from '../../../share/models/Cat';
import { Dog as DogClass } from '../../../share/models/Dog';
import {
  addPetToFarm,
  clearNewFarm,
  initFarmPets,
  removePetFromFarm,
} from '../../../redux/reducer/createFarmSlice';
import { addFarm } from '../../../redux/reducer/farmSlice';
import { addNewFarmToCalc, addPetsToNewFarmForCalc } from '../../../redux/reducer/calcFarmSlice';
import { addArrayOfPets } from '../../../redux/reducer/petsSlice';
import { addNotification } from '../../../redux/reducer/commonSlice';
import GetListOfPets from '../../pets/pets-list';
import FarmFormular from './farm-form';
import { CreateFarmDto } from '../../../share/interfaces/IFarm';
import { API_ENDPOINTS } from '../../../share/ApiUrl';
import axios from '../../../axios-inst';

/**
 * Create Farm component
 * Handles creating a new farm with pets
 */
const CreateFarm: React.FC = (): React.ReactElement => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Local state
  const [name, setName] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Redux state
  // Redux state
  const pets = useAppSelector(state => state.pets.pets);
  const currentPetsOnFarm = useAppSelector(state => state.farmForm.farmPets);
  const availableCatsForFarm = useAppSelector(state => state.farmForm.offerCats);
  const availableDogsForFarm = useAppSelector(state => state.farmForm.offerDogs);
  // Derived state
  const [newPetsForFarm, setNewPetsForFarm] = useState<IPet[]>([]);
  const [availableDogs, setAvailableDogs] = useState<IPet[]>([]);
  const [availableCats, setAvailableCats] = useState<IPet[]>([]);

  // Initialize available pets
  useEffect(() => {
    dispatch(initFarmPets([...pets]));
  }, [pets, dispatch]);

  // Sync pets with Redux state
  useEffect(() => {
    setNewPetsForFarm([...currentPetsOnFarm]);
  }, [currentPetsOnFarm]);

  useEffect(() => {
    setAvailableCats([...availableCatsForFarm]);
  }, [availableCatsForFarm]);

  useEffect(() => {
    setAvailableDogs([...availableDogsForFarm]);
  }, [availableDogsForFarm]);

  /**
   * Handle form submission for farm creation
   */
  const handleSubmit = async (): Promise<void> => {
    try {
      setIsSubmitting(true);

      // Create farm data object
      const farmData: CreateFarmDto = {
        name,
        address,
        description,
      };

      // Create farm via API
      const response = await axios.post(API_ENDPOINTS.FARMS, farmData);
      const newFarm = response.data;

      // Update Redux state with new farm
      dispatch(addFarm(newFarm));
      dispatch(addNewFarmToCalc(newFarm));

      // Process cats for the new farm
      const cats = newPetsForFarm
        .filter(pet => pet.type === PetType.CAT)
        .map(pet => {
          const cat = { ...pet } as CatClass;
          cat.farmId = newFarm.id;
          return cat;
        });

      // Process dogs for the new farm
      const dogs = newPetsForFarm
        .filter(pet => pet.type === PetType.DOG)
        .map(pet => {
          const dog = { ...pet } as DogClass;
          dog.farmId = newFarm.id;
          return dog;
        });

      // Create cats via API
      if (cats.length > 0) {
        const catsResponse = await axios.post(API_ENDPOINTS.PETS.CATS, cats);
        const updatedCats = catsResponse.data.map((pet: IPet) => ({
          ...pet,
          type: PetType.CAT,
        }));

        dispatch(addArrayOfPets(updatedCats));
        dispatch(addPetsToNewFarmForCalc(updatedCats));
      }

      // Create dogs via API
      if (dogs.length > 0) {
        const dogsResponse = await axios.post(API_ENDPOINTS.PETS.DOGS, dogs);
        const updatedDogs = dogsResponse.data.map((pet: IPet) => ({
          ...pet,
          type: PetType.DOG,
        }));

        dispatch(addArrayOfPets(updatedDogs));
        dispatch(addPetsToNewFarmForCalc(updatedDogs));
      }

      // Clear form state
      dispatch(clearNewFarm());

      // Show success notification
      dispatch(
        addNotification({
          type: 'success',
          message: `Farm "${name}" was created successfully!`,
        })
      );

      // Navigate to farms list
      navigate('/');
    } catch (error) {
      console.error('Failed to create farm:', error);
      dispatch(
        addNotification({
          type: 'error',
          message: 'Failed to create farm. Please try again.',
        })
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Remove a pet from the farm
   */
  const handleRemovePet = (index: number): void => {
    const pet = { ...newPetsForFarm[index] };
    dispatch(removePetFromFarm(pet));
  };

  /**
   * Add a cat to the farm
   */
  const handleAddCat = (index: number): void => {
    const cat = { ...availableCats[index] };
    dispatch(addPetToFarm(cat));
  };

  /**
   * Add a dog to the farm
   */
  const handleAddDog = (index: number): void => {
    const dog = { ...availableDogs[index] };
    dispatch(addPetToFarm(dog));
  };

  return (
    <Container className="py-4">
      <h1 className="mb-4">Create New Farm</h1>

      <Card className="mb-4">
        <Card.Body>
          <FarmFormular
            name={name}
            address={address}
            description={description}
            onSubmit={handleSubmit}
            setName={setName}
            setAddress={setAddress}
            setDescription={setDescription}
            addNewCats={availableCats}
            addNewDogs={availableDogs}
            setNewCatForFarm={handleAddCat}
            setNewDogForFarm={handleAddDog}
            isSubmitting={isSubmitting}
          />
        </Card.Body>
      </Card>

      {currentPetsOnFarm.length > 0 && (
        <Card>
          <Card.Header>
            <h2 className="h5 mb-0">Pets for this Farm</h2>
          </Card.Header>
          <Card.Body>
            <GetListOfPets
              edit={true}
              clickRemoveOrFeed={handleRemovePet}
              listOfPets={currentPetsOnFarm}
            />
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default React.memo(CreateFarm);
