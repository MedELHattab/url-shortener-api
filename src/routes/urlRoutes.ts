import { Router } from 'express';
import urlController from '../controllers/urlController';

const router = Router();

// Route to shorten a URL
router.post('/shorten', urlController.shortenUrl.bind(urlController));

// Route to redirect to original URL
router.get('/:short', urlController.redirectToUrl.bind(urlController));

export default router;