import { ReactNode } from 'react';

type Prps = {
  className: string;
  children: ReactNode | string;
};
const ErrorText: React.FC<Prps> = ({ className, children }) => {
  return <p className={`text-center  text-error ${className}`}>{children}</p>;
};

export default ErrorText;
