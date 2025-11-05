import { useState } from 'react'
import BackButton from '../common/BackButton'

export default function LoginForm({ 
  selectedRole, 
  formData, 
  onInputChange, 
  onLogin, 
  onSignupClick, 
  onForgotPassword, 
  onBack,
  loading 
}) {
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false) // ✅ added

  const handleLoginClick = () => {
    onLogin(rememberMe) // ✅ pass rememberMe state to parent
  }

  return (
    <div>
      <BackButton onClick={onBack} />

      <h2 className="text-3xl font-bold text-white mb-2 text-center">Login</h2>
      <p className="text-gray-200 mb-8 text-center text-sm">Login as {selectedRole}</p>

      <div>
        <div className="mb-5">
          <div className="relative">
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={onInputChange}
              className="w-full px-4 py-3 pr-12 bg-white bg-opacity-15 backdrop-blur-sm border border-white border-opacity-30 rounded-full text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transition"
              placeholder="Username or Email"
              disabled={loading}
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white opacity-70">
              👤
            </span>
          </div>
        </div>

        <div className="mb-5">
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={onInputChange}
              className="w-full px-4 py-3 pr-20 bg-white bg-opacity-15 backdrop-blur-sm border border-white border-opacity-30 rounded-full text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transition"
              placeholder="Password"
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white opacity-70 hover:opacity-100 transition cursor-pointer text-lg"
              title={showPassword ? "Hide password" : "Show password"}
              disabled={loading}
            >
              {showPassword ? '👁️' : '🙈'}
            </button>
          </div>
        </div>

        {/* ✅ Remember Me + Forgot Password */}
        <div className="flex justify-between items-center mb-6 text-sm">
          <label className="flex items-center text-white cursor-pointer">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
              className="mr-2 w-4 h-4 cursor-pointer"
              disabled={loading}
            />
            <span>Remember me</span>
          </label>
          <button
            onClick={onForgotPassword}
            className="text-white hover:text-gray-200 transition"
            disabled={loading}
          >
            Forgot Password?
          </button>
        </div>

        {/* ✅ Pass rememberMe on login */}
        <button
          onClick={handleLoginClick}
          disabled={loading}
          className="w-full bg-white text-purple-700 font-semibold py-3 px-6 rounded-full hover:bg-gray-100 transition duration-200 mb-5 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <div className="text-center">
          <button
            onClick={onSignupClick}
            className="text-white hover:text-gray-200 text-sm transition"
            disabled={loading}
          >
            Don't have an account? <span className="font-semibold">Register</span>
          </button>
        </div>
      </div>
    </div>
  )
}
