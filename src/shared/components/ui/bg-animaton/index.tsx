import './style.css';

const BgAnimated = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMin slice"
      viewBox="24 105 156 95"
      className="bg-svg"
    >
      <rect x="0" y="0" width="300" height="300" fill="#cf9091" />
      <path
        className="top-outer"
        fill="#938888"
        stroke="#383232"
        stroke-width="1"
        d="M68 1c23,0 67,17 69,39 4,38 5,52 -5,69 -20,36 -68,46 -120,-9 -27,-28 -7,-101 56,-99z"
      />
      <path
        className="top-inner"
        fill="#9d94a648"
        stroke="#9d94a6"
        stroke-width="1"
        d="M69 22c33,-7 52,21 54,37 3,26 -1,28 -8,40 -15,25 -48,25 -85,-14 -19,-20 -4,-53 39,-63z"
      />
      <path
        className="bottom-outer"
        fill="#b7b0b0"
        stroke="#f3a460"
        stroke-width="1"
        d="M158 158c30,13 56,50 44,75 -9,18 -22,46 -42,55 -20,10 -48,2 -73,-19 -29,-25 -27,-55 -9,-79 17,-22 43,-48 80,-32z"
      />

      <path
        className="bottom-inner"
        fill="#2f1415"
        stroke="#dbd7d7"
        stroke-width="1"
        d="M136 180c32,-9 45,13 46,29 3,27 8,29 0,42 -14,25 -52,24 -79,0 -21,-18 -2,-61 33,-71z"
      />
    </svg>
  );
};

export default BgAnimated;
