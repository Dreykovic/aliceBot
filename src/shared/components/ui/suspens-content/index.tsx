const SuspenseContent: React.FC = () => {
  return (
    <div className="w-full h-screen bg-transparent flex items-center justify-center">
      <span className="loading loading-infinity text-warning loading-lg"></span>
    </div>
  );
};

export default SuspenseContent;
