import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
        Page Not Found
      </h1>
      <p className="mt-4 text-lg text-gray-600">
        Sorry, we could not find the page you are looking for.
      </p>
      <Link
        href="/"
        className="mt-8 inline-block rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 transition-colors"
      >
        Back to Homepage
      </Link>
    </div>
  );
}
