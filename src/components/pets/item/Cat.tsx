import React from 'react';
import Pet from "./Pet";
import {ReactComponent as CatLogo} from '../../../assets/cat.svg';
import cssClasses from "./pet.module.scss";

interface ICatProps {
    id: number | null,
    pocetKrmeni: number,
    pocetMaciatok: number,
    age: string,
    edit: boolean,
    name: string | null,
    click: ()=>void
}

export const Cat = (props: ICatProps) => {
    return (

        <Pet
            edit={props.edit}
            pocetKrmeni={props.pocetKrmeni}
            age={props.age}
            click={props.click}
            typ='cat'
            name={props.name}
        >
            <CatLogo className={cssClasses.card__image}/>
            <span> Pocet maciatok : {props.pocetMaciatok}</span>
        </Pet>
    );
};

export default React.memo(Cat);
