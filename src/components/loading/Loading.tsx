import { ImSpinner8 } from 'react-icons/im';

export default function Loading() {
  return (
    <div className="flex items-center justify-center text-5xl min-h-48">
      <span className="animate-spin text-cyan-500">
        <ImSpinner8 />
      </span>
    </div>
  );
}
