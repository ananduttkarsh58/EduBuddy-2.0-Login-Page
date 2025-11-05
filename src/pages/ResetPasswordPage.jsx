// to view this page, use http://localhost:5173/Reset-password?token=test-token-123

import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import AuthLayout from '../components/auth/authLayout'
import Navbar from "../components/common/Navbar";
import { authAPI } from '../services/api'

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const token = searchParams.get('token')

  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // Handle input changes
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setError('')
  }

  // Handle password reset
  const handleResetPassword = async () => {
    if (!formData.newPassword || !formData.confirmPassword) {
      setError('Please fill in all fields')
      return
    }

    if (formData.newPassword.length < 6) {
      setError('Password must be at least 6 characters long')
      return
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setLoading(true)

    try {
      const response = await authAPI.resetPassword(token, formData.newPassword)
      console.log('Password reset successful:', response)

      alert('Password reset successful! You can now login with your new password.')
      navigate('/')  // redirect to login
    } catch (error) {
      if (error.message === "Failed to fetch") {
        // 🌐 Backend not available — frontend-only fallback
        alert('Backend not connected — password reset simulated successfully.')
        navigate('/')
      } else {
        setError(error.message || 'Failed to reset password. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div
        className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
        style={{ paddingTop: '64px' }}
      >
        {/* Background */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background: 'linear-gradient(135deg, #001a12 0%, #064e3b 40%, #0f172a 100%)',
            top: '64px'
          }}
        />

        {/* Animated shapes */}
        <div
          className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
          style={{ top: '64px' }}
        >
          <div
            className="absolute rounded-full"
            style={{
              width: '600px',
              height: '600px',
              background: 'radial-gradient(circle, #10b981 0%, #059669 100%)',
              left: '-15%',
              top: '-15%',
              filter: 'blur(100px)',
              opacity: 0.3,
              animation: 'float 20s ease-in-out infinite',
              animationDelay: '0s'
            }}
          />
          <div
            className="absolute rounded-full"
            style={{
              width: '550px',
              height: '550px',
              background: 'radial-gradient(circle, #3b82f6 0%, #1e40af 100%)',
              right: '-10%',
              bottom: '-20%',
              filter: 'blur(100px)',
              opacity: 0.25,
              animation: 'float 20s ease-in-out infinite',
              animationDelay: '-10s'
            }}
          />
        </div>

        {/* Form layout */}
        <div className="relative z-10">
          <AuthLayout>
            <div>
              <h2 className="text-3xl font-bold text-white mb-2 text-center">Reset Password</h2>
              <p className="text-gray-200 mb-8 text-center text-sm">
                Enter your new password below
              </p>

              {error && (
                <div className="mb-4 p-3 bg-red-500 bg-opacity-20 border border-red-500 rounded-lg text-red-200 text-sm">
                  {error}
                </div>
              )}

              <div>
                {/* New Password */}
                <div className="mb-5">
                  <label className="block text-white font-medium mb-2">New Password</label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 pr-12 bg-white bg-opacity-15 backdrop-blur-sm border border-white border-opacity-30 rounded-full text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transition"
                      placeholder="Enter new password"
                      disabled={loading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white opacity-70 hover:opacity-100 transition cursor-pointer text-lg"
                      disabled={loading}
                      title={showNewPassword ? "Hide password" : "Show password"}
                    >
                      {showNewPassword ? '👁️' : '🙈'}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="mb-6">
                  <label className="block text-white font-medium mb-2">Confirm New Password</label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 pr-12 bg-white bg-opacity-15 backdrop-blur-sm border border-white border-opacity-30 rounded-full text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transition"
                      placeholder="Re-enter new password"
                      disabled={loading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white opacity-70 hover:opacity-100 transition cursor-pointer text-lg"
                      disabled={loading}
                      title={showConfirmPassword ? "Hide password" : "Show password"}
                    >
                      {showConfirmPassword ? '👁️' : '🙈'}
                    </button>
                  </div>
                </div>

                {/* Reset button */}
                <button
                  onClick={handleResetPassword}
                  disabled={loading}
                  className="w-full bg-white text-purple-700 font-semibold py-3 px-6 rounded-full hover:bg-gray-100 transition duration-200 mb-5 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Resetting Password...' : 'Reset Password'}
                </button>

                {/* Back to login */}
                <div className="text-center">
                  <button
                    onClick={() => navigate('/')}
                    className="text-white hover:text-gray-200 text-sm transition"
                    disabled={loading}
                  >
                    Back to Login
                  </button>
                </div>
              </div>
            </div>
          </AuthLayout>
        </div>

        {/* Floating animation */}
        <style>{`
          @keyframes float {
            0%, 100% {
              transform: translate(0, 0) scale(1);
            }
            33% {
              transform: translate(30px, -30px) scale(1.05);
            }
            66% {
              transform: translate(-20px, 20px) scale(0.95);
            }
          }
        `}</style>
      </div>
    </>
  )
}
