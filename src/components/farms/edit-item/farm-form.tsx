import React, { useEffect, useState } from 'react';
import { Form, Row, Col, Button, Card } from 'react-bootstrap';
import { useForm, FieldError } from 'react-hook-form';
import { IPet } from '../../../share/interfaces/IPet';
import { Cat } from '../../../share/models/Cat';
import { Dog } from '../../../share/models/Dog';
import FormInput from '../../ui/form-controls/FormInput';
import { useFormValidation } from '../../../hooks/useFormValidation';

interface FarmFormProps {
  /** Handler for form submission */
  onSubmit: () => void;
  /** Farm name value */
  name: string;
  /** Farm name setter */
  setName: React.Dispatch<React.SetStateAction<string>>;
  /** Farm address value */
  address: string;
  /** Farm address setter */
  setAddress: React.Dispatch<React.SetStateAction<string>>;
  /** Farm description value (optional) */
  description?: string;
  /** Farm description setter (optional) */
  setDescription?: React.Dispatch<React.SetStateAction<string>>;
  /** Available dogs to add to farm */
  addNewDogs: IPet[];
  /** Available cats to add to farm */
  addNewCats: IPet[];
  /** Handler to add cat to farm */
  setNewCatForFarm?: (index: number) => void;
  /** Handler to add dog to farm */
  setNewDogForFarm?: (index: number) => void;
  /** Whether form is currently submitting */
  isSubmitting?: boolean;
}

/**
 * Farm form component for creating and editing farms
 */
const FarmFormular: React.FC<FarmFormProps> = ({
  onSubmit,
  name,
  setName,
  address,
  setAddress,
  description = '',
  setDescription,
  addNewDogs,
  addNewCats,
  setNewCatForFarm,
  setNewDogForFarm,
  isSubmitting = false,
}) => {
  // Form validation setup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Get validation rules
  const validation = useFormValidation();

  // Local state for available pets
  const [availableDogs, setAvailableDogs] = useState<IPet[]>([]);
  const [availableCats, setAvailableCats] = useState<IPet[]>([]);
  const [selectedDogIndex, setSelectedDogIndex] = useState<number>(0);
  const [selectedCatIndex, setSelectedCatIndex] = useState<number>(0);

  // Sync available pets lists
  useEffect(() => {
    setAvailableCats([...addNewCats]);
  }, [addNewCats]);

  useEffect(() => {
    setAvailableDogs([...addNewDogs]);
  }, [addNewDogs]);

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="p-2">
      <Row className="mb-3">
        <Col md={6}>
          <FormInput
            label="Farm Name"
            name="name"
            register={register}
            rules={validation.requiredText('Farm name', 3)}
            error={errors.name as FieldError | undefined}
            placeholder="Enter farm name"
            required
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
          />
        </Col>

        <Col md={6}>
          <FormInput
            label="Address"
            name="address"
            register={register}
            rules={validation.requiredText('Address', 5)}
            error={errors.address as FieldError | undefined}
            placeholder="Enter farm address"
            required
            value={address}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAddress(e.target.value)}
          />
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={12}>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter farm description (optional)"
              value={description}
              {...register('description', {
                maxLength: {
                  value: 500,
                  message: 'Description cannot exceed 500 characters',
                },
                onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => {
                  setDescription?.(e.target.value);
                },
              })}
              isInvalid={!!errors.description}
            />
            {errors.description && (
              <Form.Control.Feedback type="invalid">
                {errors.description.message as string}
              </Form.Control.Feedback>
            )}
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={6}>
          <Card className="h-100">
            <Card.Header>
              <h5 className="mb-0">Add Cats</h5>
            </Card.Header>
            <Card.Body>
              <Form.Group>
                <Form.Label>Select Cat</Form.Label>
                <div className="d-flex">
                  <Form.Select
                    name="chooseCat"
                    className="me-2"
                    onChange={e => setSelectedCatIndex(+e.target.value)}
                    disabled={availableCats.length === 0}
                  >
                    {availableCats.length === 0 ? (
                      <option>No cats available</option>
                    ) : (
                      availableCats.map((cat: IPet, index: number) => (
                        <option key={index} value={index}>
                          {(cat as Cat).name || `Cat #${index + 1}`}
                        </option>
                      ))
                    )}
                  </Form.Select>
                  <Button
                    variant="outline-primary"
                    onClick={() => setNewCatForFarm?.(selectedCatIndex)}
                    disabled={availableCats.length === 0}
                    title="Add this cat to the farm"
                  >
                    <i className="bi bi-plus-circle"></i> Add
                  </Button>
                </div>
              </Form.Group>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="h-100">
            <Card.Header>
              <h5 className="mb-0">Add Dogs</h5>
            </Card.Header>
            <Card.Body>
              <Form.Group>
                <Form.Label>Select Dog</Form.Label>
                <div className="d-flex">
                  <Form.Select
                    name="chooseDog"
                    className="me-2"
                    onChange={e => setSelectedDogIndex(+e.target.value)}
                    disabled={availableDogs.length === 0}
                  >
                    {availableDogs.length === 0 ? (
                      <option>No dogs available</option>
                    ) : (
                      availableDogs.map((dog: IPet, index: number) => (
                        <option key={index} value={index}>
                          {(dog as Dog).name || `Dog #${index + 1}`}
                        </option>
                      ))
                    )}
                  </Form.Select>
                  <Button
                    variant="outline-primary"
                    onClick={() => setNewDogForFarm?.(selectedDogIndex)}
                    disabled={availableDogs.length === 0}
                    title="Add this dog to the farm"
                  >
                    <i className="bi bi-plus-circle"></i> Add
                  </Button>
                </div>
              </Form.Group>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <div className="d-flex justify-content-end mt-4">
        <Button variant="primary" type="submit" disabled={isSubmitting} className="px-4">
          {isSubmitting ? 'Saving...' : 'Save Farm'}
        </Button>
      </div>
    </Form>
  );
};

export default React.memo(FarmFormular);
