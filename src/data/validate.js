import Joi from 'joi';

// Joi schema for login form
const validateSchema = Joi.object({
  username: Joi.string()
    .valid('mytoysadmin')
    .required()
    .messages({
      'any.only': 'Användarnamn är fel.',
      'any.required': 'Du behöver skriva in användarnamn.'
    }),
  password: Joi.string()
    .valid('We4545!')
    .required()
    .messages({
      'any.only': 'Lösenordet är fel.',
      'any.required': 'Du behöver fylla i ditt lösenord.'
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


      if (key === 'username') {
        message[key] = 'Användarnamnet är inte korrekt. Försök igen.';
      } else if (key === 'password') { // Fix the syntax here
        message[key] = 'Lösenordet är felaktigt. Kontrollera och försök igen.';
      }
    });
  }

  const formIsValid = !results.error;
  return { message, formIsValid };
}

export { validateSchema, inputValidation }; // 