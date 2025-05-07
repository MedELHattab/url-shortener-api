// src/controllers/urlController.ts
import { Request, Response } from 'express';
import { shortenUrl, getOriginalUrl, UrlNotFoundError } from '../services/urlService';
import { ValidationError } from '../services/validationService';

export class UrlController {
  /**
   * Shortens a URL and saves it to the database
   * @route POST /shorten
   */
  async shortenUrl(req: Request, res: Response): Promise<void> {
    try {
      const shortenedUrl = await shortenUrl(req.body.url);
      res.status(201).json({ short: shortenedUrl.shortCode });
    } catch (error) {
      if (error instanceof ValidationError) {
        res.status(400).json({ error: error.message });
      } else {
        console.error('Error shortening URL:', error);
        res.status(500).json({ error: 'Server error' });
      }
    }
  }

  /**
   * Redirects to the original URL based on the short code
   * @route GET /:short
   */
  async redirectToUrl(req: Request, res: Response): Promise<void> {
    try {
      const originalUrl = await getOriginalUrl(req.params.short);
      res.redirect(originalUrl);
    } catch (error) {
      if (error instanceof ValidationError) {
        res.status(400).json({ error: error.message });
      } else if (error instanceof UrlNotFoundError) {
        res.status(404).json({ error: error.message });
      } else {
        console.error('Error redirecting URL:', error);
        res.status(500).json({ error: 'Server error' });
      }
    }
  }
}

// Export a singleton instance of the controller
export default new UrlController();