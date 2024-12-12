import React from 'react';

type SubmitType = {
  isLoading: boolean;
  text?: string;
  disabled?: boolean;
};

const SubmitButton: React.FC<SubmitType> = ({
  isLoading,
  text = 'Soumettre',
}) => {
  return (
    <button
      className="btn btn-outline-secondary"
      type="button"
      disabled={isLoading}
    >
      {isLoading ? (
        <span
          className="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
        ></span>
      ) : (
        ''
      )}

      {`${isLoading ? 'Loading...' : text}`}
    </button>
  );
};

export default SubmitButton;
