import React from 'react';

type SubmitType = {
  isLoading: boolean;
  disabled?: boolean;
};

const SubmitButton: React.FC<SubmitType> = ({ isLoading }) => {
  return (
    <button className={`btn btn-secondary ${isLoading ? 'loading' : ''}`}>
      Valider la Transaction
    </button>
  );
};

export default SubmitButton;
