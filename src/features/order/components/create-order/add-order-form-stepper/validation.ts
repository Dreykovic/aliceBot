import * as yup from 'yup';

const schema = yup.object({
  firstName: yup.string().trim().required('Le prénom est requis'),
  lastName: yup.string().trim().required('Le nom est requis'),
  phoneNumber: yup
    .string()
    .matches(
      /^(?:(228)?\s?|0)(9[0-9]{1}|2[2-5]{1}|9[5-7]{1}|7[0-9]{1})[0-9]{6}$/,
      'Le numéro de téléphone est invalide. Il doit correspondre au format Yas ou Moov Africa.',
    )
    .required('Le numéro de téléphone est requis'),
  email: yup
    .string()
    .email("Format d'email invalide")
    .required("L'email est requis"),
  address1: yup.string().required("L'adresse 1 est requise"),
  address2: yup.string().nullable(),
  city: yup.string().nullable(),
  state: yup.string().nullable(),
  country: yup
    .string()
    .oneOf(['TG'], 'Seul "TG" est autorisé comme pays')
    .nullable(),
  codeBank: yup
    .string()
    .matches(/^\d{5}$/, 'Le code banque doit contenir exactement 5 chiffres')
    .nullable(),
  bankName: yup.string().nullable(),
  codeGuichet: yup
    .string()
    .matches(/^\d{5}$/, 'Le code guichet doit contenir exactement 5 chiffres')
    .nullable(),
  rib: yup
    .string()
    .matches(/^\d{14}$/, 'Le RIB doit contenir exactement 14 chiffres')
    .nullable(),
  cleRib: yup
    .string()
    .matches(/^\d{2}$/, 'La clé RIB doit contenir exactement 2 chiffres')
    .nullable(),
  iban: yup
    .string()
    .matches(
      /^TG\d{24}$/,
      'L\'IBAN doit commencer par "TG" et contenir 24 chiffres',
    )
    .nullable(),
  swift: yup
    .string()
    .matches(/^[A-Z]{6}[A-Z\d]{2}([A-Z\d]{3})?$/, 'Le code SWIFT est invalide')
    .nullable(),
  departmentId: yup
    .number()
    .integer('La Direction choisis est invalide')
    .positive('La Direction choisis est invalide')
    .required('La Direction est requise'),
  jobId: yup
    .number()
    .integer('Le Poste choisis est invalide')
    .positive('Le Poste choisis est invalide')
    .required('Le Poste est requise'),
  duration: yup
    .number()
    .integer('La durée doit être un entier')
    .positive('La durée doit être un nombre positif')
    .required('La durée est requise'),
  beginDate: yup
    .date()
    .min(new Date(), 'La date de début ne peut pas être dans le passé')
    .required('La date de début est requise'),
});
export const schemaStep1 = yup.object({
  firstName: yup.string().trim().required('Le prénom est requis'),
  lastName: yup.string().trim().required('Le nom est requis'),
  phoneNumber: yup
    .string()
    .matches(
      /^(?:(228)?\s?|0)(9[0-9]{1}|2[2-5]{1}|9[5-7]{1}|7[0-9]{1})[0-9]{6}$/,
      'Le numéro de téléphone est invalide. Il doit correspondre au format Yas ou Moov Africa.',
    )
    .required('Le numéro de téléphone est requis'),
  email: yup
    .string()
    .email("Format d'email invalide")
    .required("L'email est requis"),
  address1: yup.string().required("L'adresse 1 est requise"),
  address2: yup.string().nullable(),
  city: yup.string().nullable(),
  state: yup.string().nullable(),
  country: yup
    .string()
    .oneOf(['TG'], 'Seul "TG" est autorisé comme pays')
    .nullable(),
});
export const schemaStep2 = yup.object({
  departmentId: yup
    .number()
    .integer('La Direction choisis est invalide')
    .positive('La Direction choisis est invalide')
    .required('La Direction est requise'),
  jobId: yup
    .number()
    .integer('LePoste choisis est invalide')
    .positive('Le Poste choisis est invalide')
    .required('Le Poste est requise'),
  duration: yup
    .number()
    .integer('La durée doit être un entier')
    .positive('La durée doit être un nombre positif')
    .required('La durée est requise'),
  beginDate: yup.date().required('La date de début est requise'),
});
export const schemaStep3 = yup.object({
  codeBank: yup
    .string()
    .matches(/^\d{5}$/, 'Le code banque doit contenir exactement 5 chiffres')
    .nullable(),
  bankName: yup.string().nullable(),
  codeGuichet: yup
    .string()
    .matches(/^\d{5}$/, 'Le code guichet doit contenir exactement 5 chiffres')
    .nullable(),
  rib: yup
    .string()
    .matches(/^\d{14}$/, 'Le RIB doit contenir exactement 14 chiffres')
    .nullable(),
  cleRib: yup
    .string()
    .matches(/^\d{2}$/, 'La clé RIB doit contenir exactement 2 chiffres')
    .nullable(),
  iban: yup
    .string()
    .matches(
      /^TG\d{24}$/,
      'L\'IBAN doit commencer par "TG" et contenir 24 chiffres',
    )
    .nullable(),
  swift: yup
    .string()
    .matches(/^[A-Z]{6}[A-Z\d]{2}([A-Z\d]{3})?$/, 'Le code SWIFT est invalide')
    .nullable(),
});
export const initialValues = {
  firstName: 'Test',
  lastName: 'Tester',
  phoneNumber: '90236130', // Vide pour que l'utilisateur saisisse son numéro
  email: 'a@a.com', // Vide pour que l'utilisateur saisisse son e-mail
  address1: '5000',
  address2: undefined, // Optionnel, souvent laissé vide
  city: undefined,
  state: undefined,
  country: 'TG', // Valeur par défaut car fixe dans vos données
  codeBank: undefined,
  bankName: undefined,
  codeGuichet: undefined,
  rib: undefined,
  cleRib: undefined,
  iban: undefined,
  swift: undefined,
  departmentId: undefined, // Vide pour permettre la sélection d'un département
  jobId: undefined, // Vide pour permettre la sélection d'un poste
  duration: 5, // Vide pour permettre la saisie
  beginDate: new Date().toISOString().split('T')[0], // Vide pour que l'utilisateur renseigne la date
};
export const initialValuesTest = {
  firstName: 'Test',
  lastName: 'Tester',
  phoneNumber: '90236130', // Vide pour que l'utilisateur saisisse son numéro
  email: 'a@a.com', // Vide pour que l'utilisateur saisisse son e-mail
  address1: '5000',
  address2: undefined, // Optionnel, souvent laissé vide
  city: undefined,
  state: undefined,
  country: 'TG', // Valeur par défaut car fixe dans vos données
  codeBank: undefined,
  bankName: undefined,
  codeGuichet: undefined,
  rib: undefined,
  cleRib: undefined,
  iban: undefined,
  swift: undefined,
  departmentId: undefined, // Vide pour permettre la sélection d'un département
  jobId: undefined, // Vide pour permettre la sélection d'un poste
  duration: 5, // Vide pour permettre la saisie
  beginDate: new Date().toISOString().split('T')[0], // Vide pour que l'utilisateur renseigne la date
};
export const initialValues1 = {
  firstName: undefined,
  lastName: undefined,
  phoneNumber: undefined, // Vide pour que l'utilisateur saisisse son numéro
  email: undefined, // Vide pour que l'utilisateur saisisse son e-mail
  address1: undefined,
  address2: undefined, // Optionnel, souvent laissé vide
  city: undefined,
  state: undefined,
  country: 'TG', // Valeur par défaut car fixe dans vos données
};
export const initialValues2 = {
  departmentId: undefined, // Vide pour permettre la sélection d'un département
  jobId: undefined, // Vide pour permettre la sélection d'un poste
  duration: 0, // Vide pour permettre la saisie
  beginDate: new Date().toISOString().split('T')[0], // Vide pour que l'utilisateur renseigne la date
};
export const initialValues3 = {
  codeBank: undefined,
  bankName: undefined,
  codeGuichet: undefined,
  rib: undefined,
  cleRib: undefined,
  iban: undefined,
  swift: undefined,
};
export const touchedValues = {
  firstName: true,
  lastName: true,
  phoneNumber: true,
  email: true,
  address1: true,
  address2: true,
  city: true,
  state: true,
  country: true,
  codeBank: true,
  bankName: true,
  codeGuichet: true,
  rib: true,
  cleRib: true,
  iban: true,
  swift: true,
  departmentId: true,
  jobId: true,
  duration: true,
  beginDate: true,
};

export default schema;
export interface EmployeeDetailsUnsafe {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  country: string;
  codeBank: string;
  bankName: string;
  codeGuichet: string;
  rib: string;
  cleRib: string;
  iban: string;
  swift: string;
  department: number;
  job: number;
  duration: number;
  beginDate: Date; // Vous pouvez utiliser `Date` si vous voulez manipuler des objets Date
}
