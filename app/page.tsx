export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900">
      <div className="mx-auto max-w-2xl px-6 py-12 text-center">
        {/* Animated Icon/Logo */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 animate-ping rounded-full bg-indigo-400 opacity-20"></div>
            <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-linear-to-br from-indigo-500 to-purple-600 shadow-lg">
              <svg
                className="h-12 w-12 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Main Heading */}
        <h1 className="mb-4 text-5xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-6xl">
          TurboTechnik
        </h1>

        {/* Under Development Badge */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-500"></span>
          </span>
          Under Development
        </div>

        {/* Main Message */}
        <p className="mb-6 text-xl text-slate-600 dark:text-slate-300 sm:text-2xl">
          We&apos;re currently working on something amazing!
        </p>
        <p className="mb-8 text-lg text-slate-500 dark:text-slate-400">
          Please visit us later. We&apos;ll be launching soon.
        </p>

        {/* Decorative Elements */}
        <div className="mt-12 flex justify-center gap-2">
          <div className="h-2 w-2 animate-bounce rounded-full bg-indigo-500 [animation-delay:-0.3s]"></div>
          <div className="h-2 w-2 animate-bounce rounded-full bg-indigo-500 [animation-delay:-0.15s]"></div>
          <div className="h-2 w-2 animate-bounce rounded-full bg-indigo-500"></div>
        </div>
      </div>
    </div>
  );
}
