import { ImSpinner6 } from "react-icons/im";

function Spinner({ activity, Spinner }) {
  const SpinnerIcon = Spinner || ImSpinner6;

  return (
    <SpinnerIcon
      className={`mt-1 ${
        activity ? "animate-" + activity : "animate-spin"
      } text-xl`}
    />
  );
}

export default Spinner;
