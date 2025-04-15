import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Form, Container, Card, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from '../../../axios-inst';
import { API_ENDPOINTS } from '../../../share/ApiUrl';
import { IContactInfo } from '../../../share/interfaces/IContactInfo';
import FormInput from '../form-controls/FormInput';
import { useAppDispatch } from '../../../redux/data/store';
import { addNotification } from '../../../redux/reducer/commonSlice';

/**
 * Contact form component that handles user inquiries
 */
const ContactFormular: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm<IContactInfo>();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  /**
   * Handle form submission
   */
  const onSubmitHandler: SubmitHandler<IContactInfo> = async data => {
    try {
      await axios.post(API_ENDPOINTS.CONTACT, data);

      dispatch(
        addNotification({
          type: 'success',
          message: 'Thank you for contacting us. We will reply as soon as possible.',
        })
      );

      reset(); // Clear form
      navigate('/'); // Redirect to home page
    } catch (error) {
      console.error('Contact form submission failed:', error);
      dispatch(
        addNotification({
          type: 'error',
          message: 'Failed to submit contact form. Please try again later.',
        })
      );
    }
  };

  return (
    <Container className="py-4">
      <h1 className="mb-4">Contact Us</h1>

      <Card>
        <Card.Body>
          {isSubmitSuccessful && (
            <Alert variant="success">Your message has been sent successfully!</Alert>
          )}

          <Form onSubmit={handleSubmit(onSubmitHandler)}>
            <FormInput
              label="Name"
              name="name"
              register={register}
              rules={{
                required: 'Name is required',
                pattern: {
                  value: /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,
                  message: 'Please enter a valid name',
                },
              }}
              error={errors.name}
              placeholder="Enter your name"
              required
            />

            <FormInput
              label="Subject"
              name="subject"
              register={register}
              rules={{
                required: 'Subject is required',
              }}
              error={errors.subject}
              placeholder="Enter message subject"
              required
            />

            <FormInput
              label="Email Address"
              name="email"
              type="email"
              register={register}
              rules={{
                required: 'Email is required',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: 'Please enter a valid email address',
                },
              }}
              error={errors.email}
              placeholder="Enter your email"
              required
            />

            <FormInput
              label="Phone Number"
              name="phone"
              register={register}
              rules={{
                pattern: {
                  value: /^[+]*[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/,
                  message: 'Please enter a valid phone number',
                },
              }}
              error={errors.phone}
              placeholder="Enter your phone number (optional)"
            />

            <Form.Group className="mb-3" controlId="form-description">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Enter your message"
                isInvalid={!!errors.description}
                {...register('description', {
                  required: 'Please enter your message',
                  minLength: {
                    value: 10,
                    message: 'Message should be at least 10 characters',
                  },
                })}
              />
              {errors.description && (
                <Form.Control.Feedback type="invalid">
                  {errors.description.message}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            <div className="d-flex mt-4">
              <Button variant="secondary" className="me-2" onClick={() => navigate('/')}>
                Cancel
              </Button>
              <Button variant="primary" type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Submit'}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ContactFormular;
