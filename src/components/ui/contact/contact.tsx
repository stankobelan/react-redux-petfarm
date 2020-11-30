import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {IContactInfo} from "../../../share/interfaces/IContactInfo";
import {useHistory} from "react-router-dom";
import axios from '../../../axios-inst';
import {apiURL} from '../../../share/ApiUrl';

const ContactFormular = () => {
    const {handleSubmit, register, errors} = useForm();
    let history = useHistory();
    const [contact, setContact] = useState<IContactInfo>({
    name:'',
    email:'',
    phone:'',
    description:'',
    subject:''} as IContactInfo);

    const onSubmitHandler = () => {
        console.dir(contact);
        axios.post<IContactInfo>(apiURL.CONTACT,contact)
            .then(() => {
              alert('Thank you for contacting me, I will reply as soon as possible.')
            });
        history.push("/");
    }

    return (
        <Form className="m-5" onSubmit={handleSubmit(onSubmitHandler)}>
            <Form.Group>
                <Form.Label> Name </Form.Label>
                <Form.Control
                    as={"input"}
                    name="name"
                    placeholder="Name"
                    defaultValue={contact.name}
                    onChange={(event) => setContact({ ...contact, name:  event.target.value})}
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
                <Form.Label> Subject </Form.Label>
                <Form.Control
                    type="text"
                    name="subject"
                    defaultValue={contact.subject}
                    placeholder="Subject"
                    onChange={(event) => setContact({ ...contact, subject:  event.target.value})}
                    ref={register({
                        required: "Required"
                    })}
                />
                {errors.subject && errors.subject.message}
            </Form.Group>

            <Form.Group>
                <Form.Label> Email Address </Form.Label>
                <Form.Control
                    type="text"
                    name="email"
                    placeholder="Contact email"
                    defaultValue={contact.email}
                    onChange={(event) => setContact({ ...contact, email:  event.target.value})}
                    ref={register({
                        required: "Required",
                        pattern: {
                            value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i,
                            message: "invalid email Address"
                        }
                    })}
                />
                {errors.email && errors.email.message}
            </Form.Group>

            <Form.Group>
                <Form.Label> Mobile </Form.Label>
                <Form.Control
                    type="text"
                    name="phone"
                    placeholder="Mobile"
                    defaultValue={contact.phone}
                    onChange={(event) => setContact({ ...contact, phone:  event.target.value})}
                />
            </Form.Group>

            <Form.Group>
                <Form.Label> Description </Form.Label>
                <Form.Control as="textarea" rows={4}
                    name="description"
                    defaultValue={contact.description}
                    onChange={(event) => setContact({ ...contact, description:  event.target.value})}
                />

            </Form.Group>

            <Button className="mt-4" variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
}
export default React.memo(ContactFormular);
