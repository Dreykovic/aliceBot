import Logo from '@/assets/images/logo/logo-bg.png';

export const Loading = () => {
  return (
    <>
      <div className="absolute h-screen w-full flex items-center justify-center -z-50 bg-gray-950"></div>

      <div className="w-full h-screen  flex items-center justify-center  ">
        <div className="flex flex-col items-center justify-end ">
          <img src={Logo} alt="" className="" />

          <div className="m-8">
            <span className="loading loading-dots text-warning loading-lg"></span>
          </div>

          <span className="text-base-100">Powered by Emile Business</span>
        </div>
      </div>
    </>
  );
};
