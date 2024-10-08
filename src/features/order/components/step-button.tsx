import React from 'react';
import { ArrowLeftShort, ArrowRightShort } from 'react-bootstrap-icons';

type ActionType = {
  next: boolean;
};

const StepButton: React.FC<ActionType> = ({ next }) => {
  return (
    <button className="btn btn-ghost bordered text-primary">
      {next ? (
        <>
          Continuer <ArrowRightShort className="w-6 h-6 " />
        </>
      ) : (
        <>
          <ArrowLeftShort className="w-6 h-6" /> Retour
        </>
      )}
    </button>
  );
};

export default StepButton;
