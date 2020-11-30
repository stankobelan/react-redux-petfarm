import React from 'react';
import {Link} from "react-router-dom";
import cssclass from '../farm.module.scss';
import {ReactComponent as FarmLogo} from '../../../assets/farmer.svg';
import Accordion from "react-bootstrap/cjs/Accordion";
import Card from "react-bootstrap/cjs/Card";
import  './farm.scss';

export interface FarmProps {
    id: number | null,
    address: string | null,
    name: string | null,
    children: any[],
    averageDogsAge: string,
    averageCatsAge: string,
    sumOfCats: number,
    sumOfDogs: number
}

const Farm = (props: FarmProps) => {
    //const decoratedOnClick = useAccordionToggle(eventKey, onClick);
    let btnClasses = [cssclass.btn, cssclass.drawing__border].join(' ');
    return (
        <Accordion  defaultActiveKey="0">
            <Card>
                <div key={props.id} className={[cssclass.card__farm].join(' ')}>
                    <Accordion.Toggle as={Card.Header} eventKey="1">
                        <FarmLogo className={cssclass.card__image__scaleA}/>
                        <p className={cssclass.card__name}>{props.name}</p>
                        <p className={cssclass.card__address}>{props.address}</p>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="1">
                        <Card.Body>
                        <div className={cssclass.card__address}>
                            {props.averageDogsAge} Priemerny vek psov
                        </div>

                        <div className={cssclass.card__address}>
                            {props.averageCatsAge} Priemerny vek maciek
                        </div>
                        <div className={cssclass.grid__container}>
                            <div className="grid-child-followers">
                                {props.sumOfCats} Pocet maciek
                            </div>
                            <div className="grid-child-followers">
                                {props.sumOfDogs} Pocet psov
                            </div>

                        </div>
                        </Card.Body>
                    </Accordion.Collapse>
                    <div className={cssclass.btn_container}>

                        <Link to={{pathname: "/farm-pets/" + props.id}}>
                            <button className={btnClasses}>All pets</button>
                        </Link>
                        <Link to={{
                            pathname: "/edit-farm/" + props.id,
                            state: {
                                farmToEdit: {id: props.id, name: props.name, address: props.address}
                            }
                        }}>
                            <button className={btnClasses}>Edit</button>
                        </Link>
                    </div>
                </div>
            </Card>
        </Accordion>
    );
};

export default React.memo(Farm);
