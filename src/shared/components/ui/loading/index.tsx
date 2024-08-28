import Logo from '@/assets/images/logo/logo.jpg';

import Title from '../Typography/title';
export const Loading = () => {
  return (
    <>
      <img src={Logo} alt="" className="absolute top-0 w-full h-screen -z-50" />
      <div className="w-full h-screen  flex items-center justify-center bg-transparent">
        <div className="flex flex-col items-center justify-end ">
          <div className="m-8">
            <span className="loading loading-spinner text-warning loading-lg"></span>
          </div>
          <Title className="text-base-300 m-8">AliceBot</Title>
          <span className="text-base-100">Powered by EmileBusiness</span>
        </div>
      </div>
    </>
  );
};
