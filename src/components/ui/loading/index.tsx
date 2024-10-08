import Logo from '@/assets/images/logo/logo-bg.png';

import Title from '../Typography/title';
export const Loading = () => {
  return (
    <>
      <div className="absolute h-screen w-full flex items-center justify-center -z-50 bg-gray-950">
        <img src={Logo} alt="" className="" />
      </div>

      <div className="w-full h-screen  flex items-center justify-center  ">
        <div className="flex flex-col items-center justify-end ">
          <div className="m-8">
            <span className="loading loading-spinner text-warning loading-lg"></span>
          </div>

          <Title className="text-base-100 m-8">AliceBot</Title>
          <span className="text-base-100">Powered by EmileBusiness</span>
        </div>
      </div>
    </>
  );
};
