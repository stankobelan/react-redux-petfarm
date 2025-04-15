import React from 'react';
import './Backdrop.scss';

interface BackdropProps {
  /** Whether the backdrop should be displayed */
  show: boolean;
  /** Click handler function */
  clicked?: () => void;
  /** Optional z-index value */
  zIndex?: number;
}

/**
 * Backdrop component creates a semi-transparent overlay
 * Used typically with modals and other floating elements
 */
const Backdrop: React.FC<BackdropProps> = ({ show, clicked, zIndex = 100 }) =>
  show ? (
    <div
      className="backdrop"
      onClick={clicked}
      style={{ zIndex }}
      aria-hidden="true"
      data-testid="backdrop"
    />
  ) : null;

export default React.memo(Backdrop);
