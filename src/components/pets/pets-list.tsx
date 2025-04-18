import { IPet, PetType } from '../../share/interfaces/IPet';
import { Dog as DogClass } from '../../share/models/Dog';
import { Dog as DogComponent } from './item/Dog';
import { Cat as CatClass } from '../../share/models/Cat';
import { Cat as CatComponent } from './item/Cat';
import React, { useEffect, useState } from 'react';
import { toBeautifulString } from '../../share/SharedServiceFunc';
import cssClass from './item/pet.module.scss';

interface IGetListOfPetsProps {
  edit: boolean;
  clickRemoveOrFeed: (index: number) => void;
  listOfPets: IPet[];
}

const GetListOfPets = (props: IGetListOfPetsProps) => {
  const [localListOfPets, setlistOfPets] = useState<IPet[]>(props.listOfPets);

  useEffect(() => {
    console.log('useEffect GetListOfPets');
    setlistOfPets([...props.listOfPets]);
  }, [props.listOfPets]);

  const list = localListOfPets.map((pet, index) => {
    switch (pet.type) {
      case PetType.CAT:
        const cat = pet as CatClass;
        return (
          <CatComponent
            key={index}
            name={cat.name}
            age={toBeautifulString(cat.datumNarodenia)}
            id={index}
            pocetKrmeni={cat.pocetKrmeni}
            pocetMaciatok={cat.pocetMaciatok}
            edit={props.edit}
            click={() => props.clickRemoveOrFeed(index)}
          />
        );
      case PetType.DOG:
        const dog = pet as DogClass;
        return (
          <DogComponent
            key={index}
            name={dog.name}
            age={toBeautifulString(dog.datumNarodenia)}
            id={index}
            pocetKrmeni={dog.pocetKrmeni}
            pocetUhriznuti={dog.pocetUhriznuti}
            edit={props.edit}
            click={() => props.clickRemoveOrFeed(index)}
          />
        );
      default:
        return null;
    }
  });

  return <div className={cssClass.container}> {list} </div>;
};
export default React.memo(GetListOfPets);
