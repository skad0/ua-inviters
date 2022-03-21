import * as yup from "yup";

export const validators = {
  name: yup.string().required(),
  location: yup.string().required(),
  other_contacts: yup.string().required(),
  phone: yup.string().required(),
  has_animals: yup.bool().required(),
  people_amount: yup.number().required(),
  additional_notes: yup.string().required(),
};
