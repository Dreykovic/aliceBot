import { ReactNode } from 'react';

type Prps = {
  className?: string;
  children: ReactNode | string;
};
const Title: React.FC<Prps> = ({ className, children }) => {
  return <p className={`text-2xl font-bold  ${className}`}>{children}</p>;
};

export default Title;
