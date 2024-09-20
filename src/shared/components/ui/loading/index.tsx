import Logo from '@/assets/images/logo/logo.jpg';

import Title from '../Typography/title';
export const Loading = () => {
  return (
    <>
      <div className="absolute h-screen w-full flex items-center justify-center -z-50">
        <img src={Logo} alt="" className="" />
      </div>

      <div className="w-full h-screen  flex items-center justify-center  ">
        <div className="flex flex-col items-center justify-end ">
          <div className="m-8">
            <span className="loading loading-spinner text-warning loading-lg"></span>
          </div>

          <Title className="text-base-200 m-8">AliceBot</Title>
          <span className="text-base-content">Powered by EmileBusiness</span>
        </div>
      </div>
    </>
  );
};
