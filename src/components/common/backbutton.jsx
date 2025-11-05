export default function BackButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="text-gray-300 hover:text-white mb-4 flex items-center transition"
    >
      <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
      Back
    </button>
  )
}