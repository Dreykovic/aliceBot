import { ReactNode } from 'react';

type Prps = {
  className: string;
  children: ReactNode | string;
};
const Subtitle: React.FC<Prps> = ({ className, children }) => {
  return <div className={`text-xl font-semibold ${className}`}>{children}</div>;
};

export default Subtitle;
