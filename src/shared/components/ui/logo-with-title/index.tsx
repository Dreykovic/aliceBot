import Logo from '@/assets/images/logo/logo.jpeg';

const AuthTitle = ({ className }: { className: string }) => {
  return (
    <div
      className={
        ' px-16  mobile:py-1 laptop:py-3 max-mobile:px-8  ' + className
      }
    >
      <div className="text-base-content">
        <div className="mb-2 flex flex-col items-center">
          <img
            src={Logo}
            alt="Alice Bot Logo"
            className=" max-mobile:w-[90px] w-[150px]"
          />
          <h1 className="laptop:mb-3 mobile:mb-0 mobile:text-md laptop:text-2xl">
            Alice Bot
          </h1>
        </div>
      </div>
    </div>
  );
};

export default AuthTitle;
