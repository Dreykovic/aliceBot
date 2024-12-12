// Définition des étapes
import { FormikValues } from 'formik';
import * as Yup from 'yup';

import Step1 from './step1';
import Step2 from './step2';
import Step3 from './step3';
import {
  schemaStep1,
  schemaStep2,
  initialValues1,
  initialValues2,
  schemaStep3,
  initialValues3,
} from './validation';
// Définition du type des étapes
export interface Step {
  initialValues: FormikValues;
  title: string;
  content: JSX.Element;
  validationSchema: Yup.Schema;
}
const steps: Step[] = [
  {
    initialValues: initialValues1,
    title: 'Infos Personnelles',
    content: (
      <>
        <Step1 />
      </>
    ),
    validationSchema: schemaStep1,
  },
  {
    initialValues: initialValues2,

    title: 'Contrat',
    content: (
      <>
        <Step2 />
      </>
    ),
    validationSchema: schemaStep2,
  },

  {
    initialValues: initialValues3,

    title: 'RIB',
    content: (
      <>
        <Step3 />
      </>
    ),
    validationSchema: schemaStep3,
  },
];
export default steps;
