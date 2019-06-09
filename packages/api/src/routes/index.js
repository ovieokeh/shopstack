import express from 'express';
import customerRoutes from './customerRoutes';
import stripeRoutes from './stripeRoutes';
import attributeRoutes from './attributeRoutes';
import categoryRoutes from './categoryRoutes';

const router = express.Router();

router.use(customerRoutes);
router.use(stripeRoutes);
router.use(attributeRoutes);
router.use(categoryRoutes);

router.use('*', (_, res) => {
  res.status(200).json({
    status: 'success',
    data: 'welcome to Shopstack',
  });
});

export default router;
