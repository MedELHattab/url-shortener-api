import { shortenUrl, getOriginalUrl, UrlNotFoundError } from '../../services/urlService';
import { validateUrl, validateShortCode, ValidationError } from '../../services/validationService';
import UrlModel from '../../models/Url';

// Mock nanoid
jest.mock('nanoid', () => ({
  nanoid: () => 'abcdef',
}));

// Mock validationService
jest.mock('../../services/validationService', () => ({
  validateUrl: jest.fn(),
  validateShortCode: jest.fn(),
  ValidationError: class ValidationError extends Error {},
}));

// Mock UrlModel (Mongoose model)
jest.mock('../../models/Url');

describe('urlService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('shortenUrl', () => {
    it('should validate and save a new URL', async () => {
      const mockSave = jest.fn().mockResolvedValue(undefined);
      const mockUrl = {
        shortCode: 'abcdef',
        originalUrl: 'https://example.com',
        save: mockSave,
      };
      // Mock constructor
      ((UrlModel as unknown) as jest.Mock).mockImplementation(() => mockUrl);

      const result = await shortenUrl('https://example.com');

      expect(validateUrl).toHaveBeenCalledWith('https://example.com');
      expect(mockSave).toHaveBeenCalled();
      expect(result.shortCode).toBe('abcdef');
      expect(result.originalUrl).toBe('https://example.com');
    });
  });

  describe('getOriginalUrl', () => {
    it('should return the original URL if shortCode exists', async () => {
      const mockUrl = { originalUrl: 'https://example.com' };
      (UrlModel.findOne as jest.Mock).mockResolvedValue(mockUrl);

      const result = await getOriginalUrl('abcdef');

      expect(validateShortCode).toHaveBeenCalledWith('abcdef');
      expect(result).toBe('https://example.com');
    });

    it('should throw UrlNotFoundError if shortCode does not exist', async () => {
      (UrlModel.findOne as jest.Mock).mockResolvedValue(null);

      await expect(getOriginalUrl('xxxxxx')).rejects.toThrow(UrlNotFoundError);
    });
  });
});
