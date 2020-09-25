import React from 'react';
import cssclass from './pet.module.scss';

interface IPetProps {
    children: any,
    name: string | null,
    age: string,
    pocetKrmeni: number,
    typ: string,
    edit: boolean,
    click: ()=>void
}

const Pet = (props: IPetProps) => {
    return (
        <div className={cssclass.card}>
            {props.children}
            <p className={cssclass.card__name}>{props.name}</p>

            <div className={cssclass.card__address}>
                {props.age}
            </div>

            <div className={cssclass.card__address}>
                {props.pocetKrmeni} PocetKrmeni
            </div>

            <button className={[cssclass.btn, cssclass.drawing__border, cssclass.btn_container].join(' ')}
                 onClick={props.click}
                //disabled={props.isFeedingDisabled}
            >{props.edit ? 'Remove' : 'Feed the ' + props.typ}</button>
        </div>
    );
};

export default React.memo(Pet);
