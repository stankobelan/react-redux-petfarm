import {Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {IPet} from "../../../share/interfaces/IPet";
import {Cat} from "../../../share/models/Cat";
import {Dog} from "../../../share/models/Dog";

interface IFarmFormularProps {
    onSubmit:()=>void,
    name: string,
    setName: React.Dispatch<React.SetStateAction<string>>,
    address:string,
    setAddress: React.Dispatch<React.SetStateAction<string>>,
    addNewDogs: IPet[],
    addNewCats: IPet[],
    setNewCatForFarm?: (index:number)=> void,
    setNewDogForFarm?: (index:number)=> void
}

const FarmFormular = (props : IFarmFormularProps) => {
    const {handleSubmit, register, errors} = useForm();
    const [availableDogs, setAvailableDogs] = useState<IPet[]>([]);
    const [availableCats, setAvailableCats] = useState<IPet[]>([]);

    const [selectedDogIndex, setAvailableDogIndex] = useState<number>(0);
    const [selectedCatIndex, setAvailableCatIndex] = useState<number>(0);



    useEffect(() => {
        console.log('sync setAvailableCats');
        setAvailableCats([...props.addNewCats]);
    }, [props.addNewCats])

    useEffect(() => {
        console.log('sync setAvailableDogs');
        setAvailableDogs([...props.addNewDogs]);
    }, [props.addNewDogs])

    return (
        <Form className="m-5" onSubmit={handleSubmit(props.onSubmit)}>
            <Form.Group>
                <Form.Label> Name </Form.Label>
                <Form.Control
                    as={"input"}
                    name="name"
                    placeholder="Farm name"
                    defaultValue={props.name}
                    onChange={(event) => props.setName(event.target.value)}
                    ref={register({
                        required: "Required",
                        pattern: {
                            value: /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/i,
                            message: "invalid name"
                        }
                    })}
                />
                {errors.name && errors.name.message}
            </Form.Group>

            <Form.Group>
                <Form.Label> Address </Form.Label>
                <Form.Control
                    type="text"
                    name="address"
                    defaultValue={props.address}
                    onChange={(event) => props.setAddress(event.target.value)}
                    ref={register({
                        required: "Required",
                        pattern: {
                            value: /[a-zA-Z]{2,30}\s|[a-zA-Z]{2,15}\s|[a-zA-Z]{2,15}|\d/i,
                            message: "invalid Address"
                        }
                    })}
                />
                {errors.address && errors.address.message}
            </Form.Group>

            <Form.Group>
                <Form.Label> Select the cat </Form.Label>
                <Form.Control
                    as="select"
                    type="text"
                    name="chooseCat"
                    onChange={(event) => setAvailableCatIndex(+(event.target.value))}
                >
                    { availableCats.map( (cat:IPet, index:number) => {
                       return <option key={index} label={(cat as Cat).name ?? index.toString()} value={index} />
                    })}

                </Form.Control>
                {errors.address && errors.address.message}
                <Button className="float-right mt-1" variant="secondary"
                        onClick={() => {props.setNewCatForFarm?.(selectedCatIndex);}}
                > Add Cat</Button>
            </Form.Group>

            <Form.Group>
                <Form.Label> Select the dog </Form.Label>
                <Form.Control
                    as="select"
                    type="text"
                    name="chooseDog"
                    onChange={(event) => setAvailableDogIndex(+(event.target.value))}
                >
                    { availableDogs.map( (dog, index) => {
                        return <option key={index} label={(dog as Dog).name ?? index.toString()} value={index} />
                    })}
                </Form.Control>
                {errors.address && errors.address.message}
                <Button className="float-right mt-1" variant="secondary"
                        onClick={() => {props.setNewDogForFarm?.(selectedDogIndex);}}
                > Add Cat</Button>
            </Form.Group>

            <Button className="mt-4" variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
}
export default React.memo(FarmFormular);
