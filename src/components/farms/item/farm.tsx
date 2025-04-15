import React from 'react';
import { Link } from 'react-router-dom';
import { Accordion, Card } from 'react-bootstrap';
import { ReactComponent as FarmLogo } from '../../../assets/farmer.svg';
import cssclass from '../farm.module.scss';
import './farm.scss';

export interface FarmProps {
  /** Unique farm identifier */
  id: number;
  /** Farm physical address */
  address: string;
  /** Farm name */
  name: string;
  /** Average age of dogs on the farm */
  averageDogsAge: string;
  /** Average age of cats on the farm */
  averageCatsAge: string;
  /** Total number of cats on the farm */
  sumOfCats: number;
  /** Total number of dogs on the farm */
  sumOfDogs: number;
  /** Optional children elements */
  children?: React.ReactNode;
}

/**
 * Farm component displays a farm card with collapsible details
 * Shows basic farm info and statistics about pets on the farm
 */
const Farm: React.FC<FarmProps> = ({
  id,
  name,
  address,
  averageDogsAge,
  averageCatsAge,
  sumOfCats,
  sumOfDogs,
  children,
}) => {
  const btnClasses = [cssclass.btn, cssclass.drawing__border].join(' ');

  return (
    <Accordion className="mb-3">
      <Card>
        <div key={id} className={cssclass.card__farm}>
          <Accordion.Button as={Card.Header} eventKey="0" className="d-flex align-items-center">
            <FarmLogo className={cssclass.card__image__scaleA} />
            <div className="ms-3">
              <p className={cssclass.card__name}>{name}</p>
              <p className={cssclass.card__address}>{address}</p>
            </div>
          </Accordion.Button>

          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <div className="mb-2">
                <strong>Average dog age:</strong> {averageDogsAge}
              </div>

              <div className="mb-3">
                <strong>Average cat age:</strong> {averageCatsAge}
              </div>

              <div className={cssclass.grid__container}>
                <div className="grid-child-followers">
                  <span className="badge bg-primary me-2">{sumOfCats}</span>
                  Cats
                </div>
                <div className="grid-child-followers">
                  <span className="badge bg-secondary me-2">{sumOfDogs}</span>
                  Dogs
                </div>
              </div>

              {children}
            </Card.Body>
          </Accordion.Collapse>

          <div className={cssclass.btn_container}>
            <Link to={`/farm-pets/${id}`}>
              <button className={btnClasses}>All pets</button>
            </Link>
            <Link
              to={`/edit-farm/${id}`}
              state={{
                farmToEdit: { id, name, address },
              }}
            >
              <button className={btnClasses}>Edit</button>
            </Link>
          </div>
        </div>
      </Card>
    </Accordion>
  );
};

export default React.memo(Farm);
