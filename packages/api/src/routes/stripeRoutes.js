import express from 'express';
import { StripeController } from '../controllers';

const router = express.Router();
const { createCustomer, postCharge, handleWebhooks } = StripeController;

router.post('/stripe/charge', postCharge);
router.post('/stripe/webhooks', handleWebhooks);
router.post('/stripe/customer', createCustomer);

export default router;
