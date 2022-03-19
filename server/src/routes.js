import express from 'express';
import companyControllerRouter from './controllers/companyManagement.js';

const router = express.Router()

router.use('/company', companyControllerRouter);

export default router;
