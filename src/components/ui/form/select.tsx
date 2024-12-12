import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

import React from 'react';
import { FieldProps } from 'formik';
import AsyncSelect from 'react-select/async';

// Composant personnalisé pour AsyncSelect
const AsyncSelectField: React.FC<
  FieldProps & { setter?: (arg: any) => void; loadOptions: () => Promise<any> }
> = ({ field, form, setter, loadOptions, ...props }) => {
  return (
    <>
      <AsyncSelect
        {...props} // Transmet les props supplémentaires
        value={field.value ?? null} // Convertit en option affichable
        onChange={(selectedOption: any) => {
          if (setter) {
            setter(selectedOption.value);
          }
          form.setFieldValue(
            field.name,
            selectedOption ? selectedOption : null,
          );
        }} // Mise à jour avec uniquement la valeur
        onBlur={() => form.setFieldTouched(field.name, true)} // Gestion du blur
        components={animatedComponents}
        cacheOptions
        defaultOptions
        closeMenuOnSelect={true}
        isClearable={true}
        loadingMessage={() => 'Chargement'}
        noOptionsMessage={() => 'Pas de données'}
        className="text-black "
      />
    </>
  );
};

export default AsyncSelectField;
