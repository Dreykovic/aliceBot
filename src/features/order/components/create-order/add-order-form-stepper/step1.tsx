/// You have to Import this line to

import { ErrorMessage, Field } from 'formik';

const Step1 = () => {
  return (
    <>
      <div className="row g-3 mb-3">
        <div className="col-sm-6">
          <label htmlFor="lastName" className="form-label required">
            Nom
          </label>

          <Field
            name="lastName"
            type="text"
            className="form-control "
            placeholder="Nom De Famille"
          />
          <ErrorMessage
            name="lastName"
            component="span"
            className="text-danger"
          />
        </div>
        <div className="col-sm-6">
          <label htmlFor="firstName" className="form-label required">
            Prénom
          </label>
          <Field
            name="firstName"
            type="text"
            className="form-control "
            placeholder="Prénom"
          />
          <ErrorMessage
            name="firstName"
            component="span"
            className="text-danger"
          />
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label required">
          Adresse Email
        </label>
        <Field
          name="email"
          type="email"
          className="form-control"
          placeholder="Adresse Électronique"
        />
        <ErrorMessage name="email" component="span" className="text-danger" />
      </div>
      <div className="mb-3">
        <label htmlFor="phoneNumber" className="form-label required">
          N° Téléphone
        </label>

        <Field
          name="phoneNumber"
          type="tel"
          className="form-control"
          placeholder="+228 70707070"
        />
        <ErrorMessage
          name="phoneNumber"
          component="span"
          className="text-danger"
        />
      </div>
      <div className="row g-3 mb-3">
        <div className="col-sm-6">
          <label htmlFor="address1" className="form-label required">
            Adresse
          </label>
          <Field
            name="address1"
            type="text"
            className="form-control"
            placeholder="(Quartier, Rue, MAison)"
          />
          <ErrorMessage
            name="address1"
            component="span"
            className="text-danger"
          />
        </div>
        <div className="col-sm-6">
          <label htmlFor="country" className="form-label required">
            Pays
          </label>
          <Field
            name="country"
            type="text"
            className="form-control "
            placeholder="Ex:Togo"
            readOnly
          />
          <ErrorMessage
            name="country"
            component="span"
            className="text-danger"
          />
        </div>
      </div>
      <div className="row g-3 mb-3">
        <div className="col-sm-6">
          <label htmlFor="city" className="form-label">
            Ville
          </label>
          <Field
            name="city"
            type="text"
            className="form-control"
            placeholder="Ville De Résidence"
          />
          <ErrorMessage name="city" component="span" className="text-danger" />
        </div>
        <div className="col-sm-6">
          <label htmlFor="address2" className="form-label">
            Adresse Secondaire
          </label>
          <Field
            name="address2"
            type="text"
            className="form-control "
            placeholder=""
          />
          <ErrorMessage
            name="address2"
            component="span"
            className="text-danger"
          />
        </div>
      </div>
    </>
  );
};

export default Step1;
