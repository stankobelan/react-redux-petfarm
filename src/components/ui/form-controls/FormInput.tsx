import React, { ChangeEvent } from 'react';
import { Form } from 'react-bootstrap';
import { UseFormRegister, FieldError } from 'react-hook-form';

interface FormInputProps {
  /** Input label text */
  label: string;
  /** Input name to be registered with react-hook-form */
  name: string;
  /** React Hook Form's register function */
  register: UseFormRegister<any>;
  /** Rules for react-hook-form validation */
  rules?: Record<string, any>;
  /** Error object from react-hook-form */
  error?: FieldError;
  /** Input type (text, email, password, etc.) */
  type?: string;
  /** Input placeholder */
  placeholder?: string;
  /** Whether the input is disabled */
  disabled?: boolean;
  /** Additional CSS classes for the input */
  className?: string;
  /** Whether the field is required */
  required?: boolean;
  /** Help text to display below the input */
  helpText?: string;
  /** Input value */
  value?: string;
  /** Change event handler */
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

/**
 * Reusable form input component with validation support
 * Integrates with react-hook-form for form handling
 */
const FormInput: React.FC<FormInputProps> = ({
  label,
  name,
  register,
  rules,
  error,
  type = 'text',
  placeholder,
  disabled = false,
  className = '',
  required = false,
  helpText,
  value,
  onChange,
}) => {
  // Create modified rules that include our onChange handler
  const modifiedRules = onChange ? {
    ...rules,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e); // Call the provided onChange handler
    }
  } : rules;

  return (
    <Form.Group className="mb-3" controlId={`form-${name}`}>
      <Form.Label>
        {label}
        {required && <span className="text-danger ms-1">*</span>}
      </Form.Label>

      <Form.Control
        type={type}
        placeholder={placeholder}
        isInvalid={!!error}
        disabled={disabled}
        className={className}
        value={value}
        {...register(name, modifiedRules)}
      />

      {helpText && !error && <Form.Text className="text-muted">{helpText}</Form.Text>}

      {error && <Form.Control.Feedback type="invalid">{error.message}</Form.Control.Feedback>}
    </Form.Group>
  );
};

export default FormInput;
