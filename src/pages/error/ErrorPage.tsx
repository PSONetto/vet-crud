import { useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="flex flex-col items-center gap-4 justify-center w-full min-h-[50vh] rounded p-4">
      <h1 className="text-5xl font-bold">Oops! :(</h1>
      <p className="text-2xl">
        Sorry, an unexpected{' '}
        <span className="underline text-red-400">error</span> has occurred.
      </p>
      <p className="text-xl text-red-400">
        <i>
          {(error as Error)?.message ||
            (error as { statusText?: string })?.statusText}
        </i>
      </p>
    </div>
  );
}
