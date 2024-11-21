import Spinner from "react-bootstrap/Spinner";

export default function SpinnerGrow() {
  return (
    <div className="flex items-center space-x-1.5">
      <Spinner animation="grow" className="w-2 h-2 bg-jwdAqua-500 animate-delay-200" />
      <Spinner animation="grow" className="w-3 h-3 bg-jwdAqua-400 animate-delay-100" />
      <Spinner animation="grow" className="w-4 h-4 bg-jwdAqua-300 " />
    </div>
  );
}
