export default function AuthLayout({ children }) {
  return (
    <div
      className="relative 
                 bg-green-900 bg-opacity-20
                 backdrop-blur-xl
                 border border-white border-opacity-20 
                 rounded-3xl 
                 w-full max-w-xl p-12 overflow-hidden 
                 shadow-2xl"
      style={{ 
        boxShadow: '0 8px 32px 0 rgba(6, 78, 59, 0.4), inset 0 1px 0 0 rgba(255, 255, 255, 0.2)',
        background: 'rgba(15, 23, 42, 0.3)'
      }}
    >
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}