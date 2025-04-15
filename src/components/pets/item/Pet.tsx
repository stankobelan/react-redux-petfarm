import React from 'react';
import cssclass from './pet.module.scss';
import { PetType } from '../../../share/interfaces/IPet';

interface PetProps {
  /** Pet's name */
  name: string;
  /** Pet's age as formatted string */
  age: string;
  /** Number of times this pet needs to be fed per day */
  feedingsPerDay: number;
  /** Type of pet (dog or cat) */
  type: PetType;
  /** Whether pet is in edit mode */
  edit: boolean;
  /** Click handler for main button action */
  onClick: () => void;
  /** Optional child elements (typically pet icon) */
  children?: React.ReactNode;
}

/**
 * Pet component displays information about a single pet
 * Shows pet details and action button for feeding or removing
 */
const Pet: React.FC<PetProps> = ({ name, age, feedingsPerDay, type, edit, onClick, children }) => {
  const buttonText = edit ? 'Remove' : `Feed the ${type.toLowerCase()}`;
  const buttonClasses = [cssclass.btn, cssclass.drawing__border, cssclass.btn_container].join(' ');

  return (
    <div className={cssclass.card}>
      {/* Pet icon */}
      {children}

      {/* Pet details */}
      <p className={cssclass.card__name}>{name}</p>

      <div className={cssclass.card__address}>
        <strong>Age:</strong> {age}
      </div>

      <div className={cssclass.card__address}>
        <strong>Feedings per day:</strong> {feedingsPerDay}
      </div>

      {/* Action button */}
      <button className={buttonClasses} onClick={onClick} aria-label={buttonText}>
        {buttonText}
      </button>
    </div>
  );
};

export default React.memo(Pet);
