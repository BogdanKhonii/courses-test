function Loader({ className = "h-4 w-4 animate-spin text-gray" }) {
  return (
    <span className={`absolute left-3 top-1/2 -translate-y-1/2 ${className}`}>
      <svg className="w-4 h-4 text-gray" fill="none" viewBox="0 0 24 24">
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        />
      </svg>
    </span>
  );
}

export { Loader };
