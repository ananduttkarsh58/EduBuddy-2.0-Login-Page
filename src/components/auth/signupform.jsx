import { useState } from 'react'
import BackButton from '../common/BackButton'
import Button from '../common/Button'

export default function SignupForm({ 
  selectedRole, 
  formData, 
  onInputChange, 
  onSignup, 
  onBack,
  loading 
}) {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  return (
    <div>
      <BackButton onClick={onBack} />

      <h2 className="text-2xl font-bold text-white mb-2">Sign Up as {selectedRole}</h2>
      <p className="text-gray-200 mb-6">Create your new account</p>

      <div>
        <div className="mb-4">
          <label className="block text-white font-medium mb-2">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={onInputChange}
            className="w-full px-4 py-3 bg-white bg-opacity-15 backdrop-blur-sm border border-white border-opacity-30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
            placeholder="Choose a username"
            disabled={loading}
          />
        </div>

        <div className="mb-4">
          <label className="block text-white font-medium mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={onInputChange}
            className="w-full px-4 py-3 bg-white bg-opacity-15 backdrop-blur-sm border border-white border-opacity-30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
            placeholder="Enter your email"
            disabled={loading}
          />
        </div>

        <div className="mb-4">
          <label className="block text-white font-medium mb-2">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={onInputChange}
              className="w-full px-4 py-3 pr-12 bg-white bg-opacity-15 backdrop-blur-sm border border-white border-opacity-30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
              placeholder="Enter your password"
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

        <div className="mb-6">
          <label className="block text-white font-medium mb-2">Confirm Password</label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={onInputChange}
              className="w-full px-4 py-3 pr-12 bg-white bg-opacity-15 backdrop-blur-sm border border-white border-opacity-30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
              placeholder="Re-enter your password"
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white opacity-70 hover:opacity-100 transition cursor-pointer text-lg"
              title={showConfirmPassword ? "Hide password" : "Show password"}
              disabled={loading}
            >
              {showConfirmPassword ? '👁️' : '🙈'}
            </button>
          </div>
        </div>

        <button
          onClick={onSignup}
          disabled={loading}
          className="w-full bg-white text-green-700 font-semibold py-3 px-6 rounded-full hover:bg-gray-100 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Creating Account...' : 'Sign Up'}
        </button>
      </div>
    </div>
  )
}