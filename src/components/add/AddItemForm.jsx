import React, { useState } from 'react';
import Joi from 'joi';
import './AddItemForm.css';

function AddItemForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    price: '',
    image: ''
  });
  const [errors, setErrors] = useState({});

  const schema = Joi.object({
    name: Joi.string()
    .min(3).max(30)
    .required().label('Name'),

    category: Joi.string()
    .min(3)
    .max(30)
    .required()
    .label('Category'),

    description: Joi.string()
    .min(10)
    .max(500)
    .required()
    .label('Description'),

    price: Joi.number()
    .positive()
    .required()
    .label('Price'),

    image: Joi.string()
    .uri().required()
    .label('Image URL')
  });

 