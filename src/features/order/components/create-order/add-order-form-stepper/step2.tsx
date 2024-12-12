import { ErrorMessage, Field, useFormikContext } from 'formik'; // Assurez-vous d'importer useFormikContext
import { useState } from 'react';

import {
  useGetBasicDepartmentsQuery,
  useGetJobsQuery,
} from '@/store/api-slice';

const Step2 = () => {
  const [departmentId, setDepartmentId] = useState<number | null>(null);

  // Récupération des départements
  const { data: dptsResponse, isFetching: isDepartmentsFetching } =
    useGetBasicDepartmentsQuery(undefined, {
      refetchOnMountOrArgChange: true,
    });
  const departments = dptsResponse?.data;
  // Récupération des jobs liés au département sélectionné
  const { data: jobsResponse, isFetching: isJobsFetching } = useGetJobsQuery(
    { departmentId: departmentId as number },
    { skip: !departmentId, refetchOnMountOrArgChange: true },
  );
  const jobs = jobsResponse?.data;
  // Utilisation de Formik pour gérer le champ 'department'
  const { setFieldValue } = useFormikContext(); // Accès à setFieldValue

  /**
   * Gère le changement de département
   * @param event L'événement de changement de valeur de la direction
   */
  const handleDepartmentChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const selectedValue = event.target.value
      ? parseInt(event.target.value, 10)
      : null;

    setDepartmentId(selectedValue); // Mise à jour de l'état local
    console.log(selectedValue);

    setFieldValue('departmentId', selectedValue); // Mise à jour de Formik
  };

  return (
    <>
      <div className="row g-3 mb-3">
        {/* Durée du contrat */}
        <div className="col-sm-6">
          <label htmlFor="duration" className="form-label">
            Durée
          </label>
          <Field
            name="duration"
            type="number"
            className="form-control required"
            placeholder="Durée du contrat en mois"
          />
          <ErrorMessage
            name="duration"
            component="span"
            className="text-danger"
          />
        </div>

        {/* Date de début */}
        <div className="col-sm-6">
          <label htmlFor="beginDate" className="form-label">
            Date de début
          </label>
          <Field
            name="beginDate"
            type="date"
            className="form-control required"
          />
          <ErrorMessage
            name="beginDate"
            component="span"
            className="text-danger"
          />
        </div>
      </div>

      {/* Sélection de la direction */}
      <div className="mb-3">
        <label htmlFor="departmentId" className="form-label">
          Direction
        </label>

        {isDepartmentsFetching ? (
          <div className="d-flex align-items-center">
            <span
              className="spinner-grow spinner-grow-sm me-2"
              role="status"
              aria-hidden="true"
            ></span>
            Chargement des directions...
          </div>
        ) : (
          <>
            <Field
              as="select"
              className="form-control"
              name="departmentId"
              onChange={handleDepartmentChange}
              value={departmentId || ''}
            >
              <option value="">-- Sélectionner une direction --</option>
              {departments?.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.departmentName}
                </option>
              ))}
            </Field>
            <ErrorMessage
              name="departmentId"
              component="span"
              className="text-danger"
            />
          </>
        )}
      </div>

      {/* Sélection du poste */}
      <div className="mb-3">
        <label htmlFor="jobId" className="form-label">
          Poste
        </label>

        {isJobsFetching ? (
          <div className="d-flex align-items-center">
            <span
              className="spinner-grow spinner-grow-sm me-2"
              role="status"
              aria-hidden="true"
            ></span>
            Chargement des postes...
          </div>
        ) : (
          <>
            <Field
              as="select"
              className="form-control"
              name="jobId"
              disabled={!departmentId}
            >
              <option value="">-- Sélectionner un poste --</option>
              {jobs?.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.title}
                </option>
              ))}
            </Field>
            <ErrorMessage
              name="jobId"
              component="span"
              className="text-danger"
            />
          </>
        )}
      </div>
    </>
  );
};

export default Step2;
