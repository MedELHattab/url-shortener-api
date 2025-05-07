export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

export const validateUrl = (url: string): void => {
  if (!url) {
    throw new ValidationError('URL is required');
  }

  try {
    new URL(url);
  } catch (error) {
    throw new ValidationError('Invalid URL format');
  }
};

export const validateShortCode = (shortCode: string): void => {
  if (!shortCode) {
    throw new ValidationError('Short code is required');
  }
}; 