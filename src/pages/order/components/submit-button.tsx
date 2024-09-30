import React from 'react';

type SubmitType = {
  isLoading: boolean;
};

const SubmitButton: React.FC<SubmitType> = ({ isLoading }) => {
  return (
    <div className="w-full flex justify-center">
      <button
        type="submit"
        className={`btn btn-primary ${isLoading ? 'loading' : ''}`}
      >
        Valider la Transaction
      </button>
    </div>
  );
};

export default SubmitButton;
