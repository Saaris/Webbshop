import Joi from 'joi';

// Joi schema for login form
const validateSchema = Joi.object({
  username: Joi.string()
    .valid('mytoysadmin')
    .optional()
    .messages({
      'any.only': 'Användarnamn är fel.',
      'any.required': 'Du behöver skriva in användarnamn.'
    }),
  password: Joi.string()
    .valid('We4545!')
    .optional()
    .messages({
      'any.only': 'Lösenordet är fel.',
      'any.required': 'Du behöver fylla i ditt lösenord.'
    }),
  name: Joi.string()
    .min(3)
    .max(30)
    .optional()
    .label('Name'),
  category: Joi.string()
    .min(3)
    .max(30)
    .optional()
    .label('Category'),
  description: Joi.string()
    .min(10)
    .max(500)
    .optional()
    .label('Description'),
  price: Joi.number()
    .positive()
    .optional()
    .label('Price'),
  image: Joi.string()
    .uri()
    .optional()
    .label('Image URL')
});

function inputValidation(touchedInput) {
  let message = {};

  const results = validateSchema.validate(touchedInput, { abortEarly: false });

  if (results.error) {
    results.error.details.forEach((e) => {
      const key = e.context.key;

      if (key === 'username') {
        message[key] = 'Användarnamnet är inte korrekt. Försök igen.';
      } else if (key === 'password') {
        message[key] = 'Lösenordet är felaktigt. Kontrollera och försök igen.';
      } else if (key === 'price') {
        message[key] = 'Priset måste vara ett positivt nummer.';
      } else if (key === 'name') {
        message[key] = 'Namnet måste vara mellan 3 och 30 tecken.';
      } else if (key === 'image') {
        message[key] = 'Bildens URL måste vara giltig.';
      } else if (key === 'category') {
        message[key] = 'Kategorin måste vara mellan 3 och 30 tecken.';
      } else if (key === 'description') {
        message[key] = 'Beskrivningen måste vara mellan 10 och 500 tecken.';
      }
    });
  }

  const formIsValid = !results.error;
  return { message, formIsValid };
}

export { validateSchema, inputValidation };