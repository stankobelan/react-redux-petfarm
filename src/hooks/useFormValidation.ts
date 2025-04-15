import { RegisterOptions } from 'react-hook-form';

/**
 * Custom hook providing reusable form validation rules
 * Ensures consistent validation across the application
 */
export const useFormValidation = () => {
  /**
   * Validation rules for required text fields
   * @param fieldName - Display name of the field for error messages
   * @param minLength - Minimum length requirement
   * @param maxLength - Maximum length requirement
   */
  const requiredText = (fieldName: string, minLength = 2, maxLength = 100): RegisterOptions => ({
    required: `${fieldName} is required`,
    minLength: {
      value: minLength,
      message: `${fieldName} must be at least ${minLength} characters`,
    },
    maxLength: {
      value: maxLength,
      message: `${fieldName} cannot exceed ${maxLength} characters`,
    },
  });

  /**
   * Validation rules for email fields
   */
  const email: RegisterOptions = {
    required: 'Email address is required',
    pattern: {
      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      message: 'Please enter a valid email address',
    },
  };

  /**
   * Validation rules for phone number fields
   * @param required - Whether the field is required
   */
  const phone = (required = false): RegisterOptions => ({
    ...(required && { required: 'Phone number is required' }),
    pattern: {
      value: /^[+]*[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/,
      message: 'Please enter a valid phone number',
    },
  });

  /**
   * Validation rules for numeric fields
   * @param fieldName - Display name of the field for error messages
   * @param min - Minimum value
   * @param max - Maximum value
   * @param required - Whether the field is required
   */
  const numeric = (
    fieldName: string,
    min?: number,
    max?: number,
    required = true
  ): RegisterOptions => ({
    ...(required && { required: `${fieldName} is required` }),
    pattern: {
      value: /^[0-9]+$/,
      message: `${fieldName} must be a number`,
    },
    ...(min !== undefined && {
      min: {
        value: min,
        message: `${fieldName} must be at least ${min}`,
      },
    }),
    ...(max !== undefined && {
      max: {
        value: max,
        message: `${fieldName} cannot exceed ${max}`,
      },
    }),
  });

  /**
   * Validation rules for date fields
   * @param fieldName - Display name of the field for error messages
   * @param required - Whether the field is required
   * @param pastDateOnly - Whether only past dates are allowed
   */
  const date = (fieldName: string, required = true, pastDateOnly = false): RegisterOptions => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return {
      ...(required && { required: `${fieldName} is required` }),
      validate: pastDateOnly
        ? value => !value || new Date(value) <= today || `${fieldName} must be in the past`
        : undefined,
    };
  };

  /**
   * Validation for password fields
   * @param minLength - Minimum password length
   */
  const password = (minLength = 8): RegisterOptions => ({
    required: 'Password is required',
    minLength: {
      value: minLength,
      message: `Password must be at least ${minLength} characters`,
    },
    pattern: {
      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      message: 'Password must include uppercase, lowercase, number and special character',
    },
  });

  return {
    requiredText,
    email,
    phone,
    numeric,
    date,
    password,
  };
};
