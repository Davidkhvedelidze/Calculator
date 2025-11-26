export interface ValidationResult<T> {
  success: boolean;
  errors?: string[];
  data?: T;
}

export interface InquiryInput {
  name: string;
  email: string;
  preferences: string;
  travelDates?: string;
  groupSize?: number;
}

const emailRegex = /\S+@\S+\.\S+/;

export function validateInquiry(input: InquiryInput): ValidationResult<InquiryInput> {
  const errors: string[] = [];
  if (!input.name || input.name.trim().length < 2) errors.push("Name is required.");
  if (!input.email || !emailRegex.test(input.email)) errors.push("Valid email is required.");
  if (!input.preferences || input.preferences.trim().length < 10)
    errors.push("Please describe your travel preferences (10+ characters).");
  if (input.groupSize && input.groupSize < 1) errors.push("Group size cannot be less than 1.");

  return { success: errors.length === 0, errors, data: input };
}
