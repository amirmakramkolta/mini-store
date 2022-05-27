import express from 'express';
import { Joi } from 'express-validation';

export function createUserValidation(){
    return {
        body: Joi.object({
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required()
        })
    }
}

export function signinValidation(){
    return {
        body: Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().required()
        })
    }
}