import { nanoid } from 'nanoid';
import UrlModel, { IUrl } from '../models/Url';
import { validateUrl, validateShortCode, ValidationError } from './validationService';

export class UrlNotFoundError extends Error {
  constructor() {
    super('URL not found');
    this.name = 'UrlNotFoundError';
  }
}

export const generateShortCode = (): string => {
  return nanoid(6);
};

export const shortenUrl = async (originalUrl: string): Promise<IUrl> => {
  validateUrl(originalUrl);
  
  const shortCode = generateShortCode();
  
  const url = new UrlModel({
    shortCode,
    originalUrl,
  });
  
  await url.save();
  return url;
};

export const getOriginalUrl = async (shortCode: string): Promise<string> => {
  validateShortCode(shortCode);
  
  const url = await UrlModel.findOne({ shortCode });
  if (!url) {
    throw new UrlNotFoundError();
  }
  
  return url.originalUrl;
};