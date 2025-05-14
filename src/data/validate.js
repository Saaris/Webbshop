import Joi from 'joi';

// Joi schema for login, addItem och editToy
const validateSchema = Joi.object({
  username: Joi.string()
    .valid('admin')
    .optional(),
    
  password: Joi.string()
    .valid('password')
    .optional(), 
    
  name: Joi.string()
    .min(4)
    .max(40)
    .regex(/^[a-zA-Z0-9 åäöÅÄÖ.,!?():-]*$/)
    .optional()
    .label('Namn'),

  category: Joi.string()
    .valid('strandleksak', 'trädgårdsleksak', 'poolleksak')
    .optional()
    .label('Kategori'),

  description: Joi.string()
    .min(5)
    .max(90)
    .regex(/^[a-zA-Z0-9 åäöÅÄÖ.,!?():-]*$/)
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
  // Exkludera "id" från valideringen
  const { id, ...dataToValidate } = touchedInput;
  let message = {};

  const results = validateSchema.validate(dataToValidate, { abortEarly: false });
  console.log('Validation Results:', results);

  if (results.error) {
    results.error.details.forEach((e) => {
      const key = e.context.key;

      const regex = /^[a-zA-Z0-9 åäöÅÄÖ.,!?():-]*$/;

      console.log('Validation Errors:', message);

      //validerings fel för login
      if (key === 'username') {
        message[key] = 'Vänligen ange ditt användarnamn.';
      } else if (key === 'password') {
        message[key] = 'Vänligen ange ditt lösenord.';

        //validering för EditToy /addItem inputs
      } else if (key === 'price') {
        message[key] = 'Priset måste vara ett positivt nummer.';

      } else if (key === 'name') {
        if (!regex.test(dataToValidate.name)) {
          message[key] = 'Endast a-zA-Z0-9 åäöÅÄÖ.,!?:()- och mellanslag är tillåtna.';
        } else if (dataToValidate.name.length < 4 || dataToValidate.name.length > 40) {
          message[key] = 'Namnet måste vara mellan 4 och 40 tecken.';
        }
      } else if (key === 'image') {
        message[key] = 'Ange en giltig URL.';

      } else if (key === 'description') {
        message[key] = 'Ge en beskrivning av produkten.';
        if (!regex.test(dataToValidate.description)) {
          message[key] = 'Endast a-zA-Z0-9 åäöÅÄÖ.,!?:()- och mellanslag är tillåtna.';
        }
          else if (touchedInput.description.length < 3 || touchedInput.description.length > 90) {
            message[key] = 'Beskrivning måste vara mellan 5 och 90 tecken.';
      }
      } else if (key === 'category') {
        message[key] = 'Kategori måste vara poolleksak, trädgårdsleksak eller strandleksak".'; 
      }
    });
  }

  const formIsValid = !results.error;
  return { message, formIsValid };
}

export { validateSchema, inputValidation };