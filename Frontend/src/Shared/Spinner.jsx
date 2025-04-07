import { ImSpinner6 } from "react-icons/im";

function Spinner({ Spinner, activity }) {
  const SpinnerIcon = Spinner || ImSpinner6;

  return <SpinnerIcon className={`mt-1 animate-${activity} text-xl`} />;
}

export default Spinner;
