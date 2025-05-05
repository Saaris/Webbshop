import Joi from 'joi';

// Joi schema for login form
const validateSchema = Joi.object({
  username: Joi.string()
    .valid('mytoysadmin')
    .required()
    .messages({
      'any.only': 'The username is wrong.',
      'any.required': 'Username is required.'
    }),
  password: Joi.string()
    .valid('We4545!')
    .required()
    .messages({
      'any.only': 'The password is wrong.',
      'any.required': 'Password is required.'
    })
});

function inputValidation(touchedInput) {
  let message = {
    username: '',
    password: ''
  };

  const results = validateSchema.validate(touchedInput, { abortEarly: false });

  if (results.error) {
    results.error.details.forEach((e) => {
      const key = e.context.key;
      message[key] = e.message; 
    });
  }

  const formIsValid = !results.error;
  return { message, formIsValid };
}

export { validateSchema, inputValidation }; // 