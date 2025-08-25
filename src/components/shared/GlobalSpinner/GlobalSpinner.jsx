import { Spinner } from "flowbite-react";

const GlobalSpinner = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <Spinner size="xl" color="gray" />
    </div>
  );
};

export default GlobalSpinner;
