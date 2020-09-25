import React from 'react';
import { Link } from "react-router-dom";
import cssclass from '../farm.module.scss';
import {ReactComponent as FarmLogo} from '../../../assets/farmer.svg';


export interface FarmProps {
    id :number | null,
    address: string | null,
    name: string | null,
    children : any[],
    getAverageDogsAge : () => string,
    getAverageCatsAge : () => string,
    pocetCats : () => number,
    pocetDogs:() => number
}

const Farm  = (props: FarmProps) => {

    let btnClasses = [cssclass.btn, cssclass.drawing__border].join(' ');
    return (
        <div key={props.id}  className={[cssclass.card__farm].join(' ')}>
            <FarmLogo className={cssclass.card__image__scaleA}></FarmLogo>
            <p className={cssclass.card__name}>{props.name}</p>
            <p className={cssclass.card__address}>{props.address}</p>
            <div className={cssclass.card__address}>
                {props.getAverageDogsAge()} Priemerny vek psov
            </div>

            <div className={cssclass.card__address}>
                {props.getAverageCatsAge()} Priemerny vek maciek
            </div>
            <div className={cssclass.grid__container}>
                <div className="grid-child-followers">
                    {props.pocetCats()} Pocet maciek
                </div>
                <div className="grid-child-followers">
                    {props.pocetDogs()} Pocet psov
                </div>

            </div>
            <div className={cssclass.btn_container}>

                <Link to={ { pathname :"/farm-pets/"+props.id} }>
                    <button className={btnClasses} >All pets</button>
                </Link>
                <Link to={ {
                    pathname :"/edit-farm/"+props.id,
                    state: {
                        farmToEdit : { id: props.id , name : props.name , address : props.address }
                    }
                } }>
                    <button className={btnClasses}>Edit</button>
                </Link>
            </div>
        </div>
    );
};

export default React.memo(Farm);
