import React from 'react';
import { Modal as BootstrapModal, Button } from 'react-bootstrap';

interface ModalProps {
  show: boolean;
  modalClosed: () => void;
  children: React.ReactNode;
  title?: string;
}

/**
 * Modal component that uses React Bootstrap
 * Shows a modal dialog with customizable content and a close button
 */
const Modal: React.FC<ModalProps> = ({ show, modalClosed, children, title }) => {
  return (
    <BootstrapModal
      show={show}
      onHide={modalClosed}
      backdrop="static"
      keyboard={false}
      centered
    >
      {title && (
        <BootstrapModal.Header closeButton>
          <BootstrapModal.Title>{title}</BootstrapModal.Title>
        </BootstrapModal.Header>
      )}
      <BootstrapModal.Body>
        {children}
      </BootstrapModal.Body>
      <BootstrapModal.Footer>
        <Button variant="secondary" onClick={modalClosed}>
          Close
        </Button>
      </BootstrapModal.Footer>
    </BootstrapModal>
  );
};

export default React.memo(Modal);
