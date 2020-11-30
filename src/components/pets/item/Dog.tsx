import React from 'react';
import cssClasses from './pet.module.scss';
import Pet from "./Pet";
import {ReactComponent as Logo} from '../../../assets/dog.svg';

interface IDogProps {
    name: string | null,
    age: string,
    pocetKrmeni: number,
    edit: boolean,
    id: number | null,
    pocetUhriznuti: number,
    click: ()=>void
}

export const Dog = (props: IDogProps) => {
    return (
        <Pet
            edit={props.edit}
            pocetKrmeni={props.pocetKrmeni}
            age={props.age}
            click = {props.click}
            typ='dog'
            name={props.name}
        >
            <Logo className={cssClasses.card__image}/>
            <span> PocetUhriznuti : {props.pocetUhriznuti}</span>
        </Pet>
    );
};

export default React.memo(Dog);

