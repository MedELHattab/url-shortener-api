import { validateUrl, validateShortCode, ValidationError } from '../../services/validationService';

describe('Validation Service', () => {
  describe('validateUrl', () => {
    it('should not throw for valid URL', () => {
      expect(() => validateUrl('https://example.com')).not.toThrow();
    });

    it('should throw ValidationError for invalid URL', () => {
      expect(() => validateUrl('invalid-url')).toThrow(ValidationError);
    });

    it('should throw ValidationError for empty URL', () => {
      expect(() => validateUrl('')).toThrow(ValidationError);
    });
  });

  describe('validateShortCode', () => {
    it('should not throw for valid short code', () => {
      expect(() => validateShortCode('abc123')).not.toThrow();
    });

    it('should throw ValidationError for empty short code', () => {
      expect(() => validateShortCode('')).toThrow(ValidationError);
    });
  });
}); 