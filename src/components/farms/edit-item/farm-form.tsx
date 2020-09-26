import {Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import React from "react";
import {useForm} from "react-hook-form";
import {IPet} from "../../../share/interfaces/IPet";

interface IFarmFormularProps {
    onSubmit:()=>void,
    name: string,
    setName: React.Dispatch<React.SetStateAction<string>>,
    address:string,
    setAddress: React.Dispatch<React.SetStateAction<string>>,
    listOfPets? : IPet[],
    addNewDogs?: IPet[],
    addNewCats?: IPet[],
    setNewDogs?: React.Dispatch<React.SetStateAction<IPet[] | undefined>>,
    setNewCats?: React.Dispatch<React.SetStateAction<IPet[] | undefined>>,
}

const FarmFormular = (props : IFarmFormularProps) => {
    const {handleSubmit, register, errors} = useForm();
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
                >
                    <option label={"1"} value={"1"} >1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                </Form.Control>
                {errors.address && errors.address.message}
                <Button className="float-right mt-1" variant="secondary"> Add Cat</Button>
            </Form.Group>

            <Form.Group>
                <Form.Label> Select the dog </Form.Label>
                <Form.Control
                    as="select"
                    type="text"
                    name="chooseCat"
                >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                </Form.Control>
                {errors.address && errors.address.message}
                <Button className="float-right mt-1" variant="secondary"> Add Cat</Button>
            </Form.Group>

            <Button className="mt-4" variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
}
export default React.memo(FarmFormular);
