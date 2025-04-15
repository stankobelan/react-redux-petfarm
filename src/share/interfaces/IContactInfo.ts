/**
 * Interface representing contact form data
 */
export interface IContactInfo {
  /** Name of the person submitting the contact form */
  name: string;
  /** Email address for contact */
  email: string;
  /** Subject of the contact message */
  subject: string;
  /** Phone number (optional) */
  phone?: string;
  /** Message body/description */
  description: string;
}
