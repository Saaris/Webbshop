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
    .min(5)
    .max(30)
    .regex(/^[a-zA-Z0-9 åäöÅÄÖ.,!?()-]*$/)
    .optional()
    .label('Namn'),

  category: Joi.string()
    .min(3)
    .max(30)
    .regex(/^[a-zA-Z0-9 åäöÅÄÖ.,!?()-]*$/)
    .optional()
    .label('Kategori'),

  description: Joi.string()
    .min(10)
    .max(500)
    .optional()
    .label('Beskrivning'),

  price: Joi.number()
    .positive()
    .optional()
    .label('Price'),

  image: Joi.string()
    .uri()
    .optional()
    .label('Bild URL')
});

function inputValidation(touchedInput) {
  let message = {};

  const results = validateSchema.validate(touchedInput, { abortEarly: false });

  if (results.error) {
    results.error.details.forEach((e) => {
      const key = e.context.key;

      const regex = /^[a-zA-Z0-9 åäöÅÄÖ]*$/;


      //login input
      if (key === 'username') {
        message[key] = 'Användarnamnet är inte korrekt. Försök igen.';
      } else if (key === 'password') {
        message[key] = 'Lösenordet är felaktigt. Kontrollera och försök igen.';

        //addItem inputs
      } else if (key === 'price') {
        message[key] = 'Priset måste vara ett positivt nummer.';
      } else if (key === 'name') {
        if (!regex.test(touchedInput.name)) {
          message[key] = 'Endast (a-z, åäö,.) och mellanslag är tillåtna.';
        } else if (touchedInput.name.length < 3 || touchedInput.name.length > 30) {
          message[key] = 'Namnet måste vara mellan 3 och 30 tecken.';
        }
      } else if (key === 'image') {
        message[key] = 'Bildens URL måste vara giltig.';
      } else if (key === 'category') {
        message[key] = 'Kategorin måste vara mellan 3 och 30 tecken.';
      } else if (key === 'description') {
        message[key] = 'Beskrivningen måste vara poolleksak, trädgårdsleksak eller strandleksak".'; }
    });
  }

  const formIsValid = !results.error;
  return { message, formIsValid };
}

export { validateSchema, inputValidation };