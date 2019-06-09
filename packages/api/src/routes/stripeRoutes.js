import express from 'express';
import { StripeController } from '../controllers';

const router = express.Router();
const { postCharge, handleWebhooks } = StripeController;

router.post('/stripe/charge', postCharge);
router.post('/stripe/webhooks', handleWebhooks);

export default router;
