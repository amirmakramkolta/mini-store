import express from 'express';
import { Joi } from 'express-validation';
import { schema } from 'express-validation';

export function createUserValidation():schema{
    return {
        body: Joi.object({
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required()
        })
    }
}

export function signinValidation():schema{
    return {
        body: Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().required()
        })
    }
}

export function createProductValidation():schema{
    return {
        body: Joi.object({
            name:Joi.string().required(),
            price: Joi.number().required(),
            imageURL:Joi.string().optional()
        })
    }
}

export function getProductValidation():schema {
    return{
        params: Joi.object({
            id:Joi.string().uuid().required()
        })
    }
}

export function editProductValidation():schema{
    return{
        body: Joi.object({
            name:Joi.string().optional(),
            price: Joi.number().optional(),
            imageURL:Joi.string().optional()
        }),
        params: Joi.object({
            id:Joi.string().uuid().required()
        })
    }
}

export function deleteProductValidation():schema{
    return{
        params: Joi.object({
            id:Joi.string().uuid().required()
        })
    }
}