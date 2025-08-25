import { Spinner } from "flowbite-react";
import { useIsFetching } from "@tanstack/react-query";

export default function GlobalSpinner() {
  const isFetching = useIsFetching();

  if (!isFetching) return null;
if (isFetching >0){

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <Spinner size="xl" color="gray" />
    </div>
  );
}
}
