import { Formik, Form, FormikHelpers } from 'formik';
import { useState } from 'react';
import { ModalProps } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import { showAlert } from '@/components/ui/alerts/alert-slice';
import LoadingButton from '@/components/ui/loading-button';
import { useCreateDutyMutation } from '@/features/employee/api';
import { AppDispatch } from '@/store';
import { ApiResponse, EmployeeDetails } from '@/types/api';

import Stepper from './add-order-form-stepper';
import steps from './add-order-form-stepper/steps';
import { initialValues } from './add-order-form-stepper/validation';

const CreateEmployee = ({ show, handleClose }: ModalProps) => {
  const [stepIndex, setStepIndex] = useState(0);
  const currentStep = steps[stepIndex];
  const [formData, setFormData] = useState({});
  const [createDuty] = useCreateDutyMutation();
  const dispatch = useDispatch<AppDispatch>();

  const handleNext = async (
    values: any,
    { setSubmitting }: FormikHelpers<any>,
  ) => {
    if (stepIndex < steps.length - 1) {
      setFormData((prev) => ({ ...prev, ...values }));

      setStepIndex(stepIndex + 1);
    } else {
      await handleSubmit();
      setSubmitting(false);
    }
    setSubmitting(false);
  };

  const handlePrevious = () => {
    setStepIndex(stepIndex - 1);
  };
  const handleSubmit = async () => {
    try {
      if (formData) {
        const data: Partial<EmployeeDetails> = formData;

        const response: ApiResponse<null> = await createDuty(data).unwrap();
        if (response.success) {
          dispatch(
            showAlert({
              title: 'Succès !',
              message: `${response.message}`,
            }),
          );
        }

        handleClose();
      } else {
        throw new Error('Pas de valeur fournies');
      }
    } catch (error) {
      console.error(error);

      dispatch(
        showAlert({
          title: 'Erreur !',
          message:
            'Une erreur est survenue lors de l’enregistrement ' +
            (error as any).data.message,
          success: false,
        }),
      );
    } finally {
      handleClose();
    }
  };
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Formulaire Ajout Membre Du Personnel</Modal.Title>
        </Modal.Header>
        <Stepper step={stepIndex} setStep={setStepIndex} steps={steps} />{' '}
        <Formik
          initialValues={initialValues} // Ajustez selon les valeurs globales de votre formulaire
          validationSchema={currentStep.validationSchema}
          onSubmit={handleNext}
        >
          {({ isSubmitting }) => (
            <Form>
              <Modal.Body>{currentStep.content}</Modal.Body>
              <Modal.Footer>
                {stepIndex === 0 ? (
                  ''
                ) : (
                  <button
                    type="button"
                    onClick={handlePrevious}
                    className="btn btn-secondary"
                  >
                    Retour
                  </button>
                )}

                <LoadingButton
                  isLoading={isSubmitting}
                  classes="btn btn-success"
                  type="submit"
                  text={`${stepIndex < steps.length - 1 ? 'Continuer' : 'Soumettre'}`}
                />
              </Modal.Footer>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
};

export default CreateEmployee;
