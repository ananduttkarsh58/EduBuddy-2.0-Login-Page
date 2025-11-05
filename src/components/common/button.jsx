export default function Button({ 
  children, 
  onClick, 
  variant = 'primary', 
  fullWidth = false,
  className = ''
}) {
  const baseStyles = 'font-semibold py-3 rounded-full transition duration-200'
  const widthStyles = fullWidth ? 'w-full' : ''
  
  const variants = {
    primary: 'bg-white text-purple-700 hover:bg-gray-100',
    success: 'bg-white text-green-700 hover:bg-gray-100',
  }

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${widthStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  )
}