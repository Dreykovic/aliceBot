import React from 'react';

import { Step } from './steps';
export interface StepProps {
  step: number;
  setStep: (step: number) => void;
  steps: Step[];
}
const Stepper: React.FC<StepProps> = ({ step, steps }) => {
  return (
    <div>
      <div className="stepper">
        {steps.map((oneStep, index) => (
          <div key={index} className={`step ${step === index ? 'active' : ''}`}>
            <div className={`circle ${step >= index ? 'completed' : ''}`}>
              {index + 1}
            </div>
            <div className="label">{oneStep.title}</div>
          </div>
        ))}
      </div>
      <style>
        {`
          .stepper {
            display: flex;
            justify-content: space-between;
            margin-bottom: 2rem;
          }
          .step {
            display: flex;
            flex-direction: column;
            align-items: center;
            flex: 1;
          }
          .circle {
            width: 30px;
            height: 30px;
            border: 2px solid #ccc;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            background: #fff;
          }
          .circle.completed {
            background: #4caf50;
            color: #fff;
            border-color: #4caf50;
          }
          .active .circle {
            border-color: #2196f3;
          }
          .label {
            margin-top: 8px;
            font-size: 14px;
            text-align: center;
          }
        `}
      </style>
    </div>
  );
};

export default Stepper;
