import express from 'express';
import jwt from 'jsonwebtoken';

import {
    getAllCompany,
    createCompany,
    updateCompany,
    deleteCompany
} from '../services/companyService.js';

import {
    createUser,
    loginUser,
    verifyAUth
} from '../services/userService.js';

const companyControllerRouter = express.Router();

companyControllerRouter.post("/create", verifyAUth, async (req, res) => {
    try {
        let result;
        if(!req.body.id)
        result = await createCompany(req.body);
        else 
        result = await updateCompany(req.body);
        res.status(200).send({success: true, data: result});
    } catch (error) {
        console.log(`Expection occured in create company`, error);
        res.status(500).send({success: false, data: error.message});
    }
});

companyControllerRouter.get('/fetch', verifyAUth, async (req, res) => {
    try {
        const result = await getAllCompany();
        res.status(200).send({success: true, data: result});
    } catch (error) {
        console.log(`Expection occured in fetch fetch`, error);
        res.status(500).send({success: false, data: error.message});
    }
});

companyControllerRouter.delete('/delete', async (req, res) => {
    try {
        const result = await deleteCompany(req.query);
        res.status(200).send({success: true, data: result});
    } catch (error) {
        console.log(`Expection occured in delete company`, error);
        res.status(500).send({success: false, data: error.message});
    }
});

companyControllerRouter.put('/update', async (req, res) => {
    try {
        const result = await updateCompany(req.body);
        res.status(200).send({success: true, data: result});
    } catch (error) {
        console.log(`Expection occured in update company`, error);
        res.status(500).send({success: false, data: error.message});
    }
});

companyControllerRouter.post('/user/create', async (req, res) => {
    try {
        const result = await createUser(req.body);
        res.status(200).send({success: true, data: result});
    } catch (error) {
        console.log(`Expection occured in create user`, error);
        res.status(500).send({success: false, data: error.message});
    }
});

companyControllerRouter.post('/user/login', async (req, res) => {
    try {
        const result = await loginUser(req.body);
        if(result)  {
            var token = jwt.sign({ id: result.id}, "config.secret", {});
            res.cookie('jwt',token, { httpOnly: true, secure: true })
            res.status(200).send({success: true, data: 'Login Successfull'});
        }
        res.status(401).send({success: false, data: "Check UserName/Password"});
    } catch (error) {
        console.log(`Expection occured in loginUser user`, error);
        res.status(500).send({success: false, data: error.message});
    }
});

export default companyControllerRouter;