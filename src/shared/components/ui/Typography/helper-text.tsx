import { ReactNode } from 'react';

type Prps = {
  className: string;
  children: ReactNode | string;
};
const HelperText: React.FC<Prps> = ({ className, children }) => {
  return <div className={`text-slate-400 ${className}`}>{children}</div>;
};

export default HelperText;
