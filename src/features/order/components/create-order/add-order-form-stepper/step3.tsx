/// You have to Import this line to

import { ErrorMessage, Field } from 'formik';

const Step3 = () => {
  return (
    <>
      <div className="mb-3">
        <label htmlFor="bankName" className="form-label">
          Nom De Banque
        </label>

        <Field
          name="bankName"
          type="text"
          className="form-control"
          placeholder="Nom De Banque Du Membre"
        />
        <ErrorMessage
          name="bankName"
          component="span"
          className="text-danger"
        />
      </div>
      <div className="row g-3 mb-3">
        <div className="col-sm-6">
          <label htmlFor="codeBank" className="form-label">
            Code Banque
          </label>

          <Field
            name="codeBank"
            type="text"
            className="form-control"
            placeholder="Code Bank"
          />
          <ErrorMessage
            name="codeBank"
            component="span"
            className="text-danger"
          />
        </div>
        <div className="col-sm-6">
          <label htmlFor="codeGuichet" className="form-label">
            Code Guichet
          </label>
          <Field
            name="codeGuichet"
            type="text"
            className="form-control required"
            placeholder="Code Guichet"
          />
          <ErrorMessage
            name="codeGuichet"
            component="span"
            className="text-danger"
          />
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="iban" className="form-label">
          IBAN
        </label>

        <Field
          name="iban"
          type="text"
          className="form-control"
          placeholder="IBAN"
        />
        <ErrorMessage name="iban" component="span" className="text-danger" />
      </div>
      <div className="mb-3">
        <label htmlFor="rib" className="form-label">
          Relevé d'Identité Bancaire (RIB)
        </label>

        <Field
          name="rib"
          type="text"
          className="form-control"
          placeholder="RIB Du membre"
        />
        <ErrorMessage name="rib" component="span" className="text-danger" />
      </div>
      <div className="row g-3 mb-3">
        <div className="col-sm-6">
          <label htmlFor="cleRib" className="form-label">
            Clé RIB
          </label>

          <Field
            name="cleRib"
            type="text"
            className="form-control"
            placeholder="Clé RIB"
          />
          <ErrorMessage
            name="cleRib"
            component="span"
            className="text-danger"
          />
        </div>
        <div className="col-sm-6">
          <label htmlFor="swift" className="form-label">
            SWIFT
          </label>
          <Field
            name="swift"
            type="text"
            className="form-control required"
            placeholder="Code Guichet"
          />
          <ErrorMessage name="swift" component="span" className="text-danger" />
        </div>
      </div>
    </>
  );
};

export default Step3;
