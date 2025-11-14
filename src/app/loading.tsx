import { LoaderIcon } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex items-center justify-center place-items-center h-screen">
      <LoaderIcon size={30} color="#4A5568" />
    </div>
  );
}
