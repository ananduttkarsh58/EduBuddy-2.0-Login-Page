import { useState } from 'react'
import { authAPI } from '../../services/api'

export default function ForgotPasswordModal({ isOpen, onClose }) {
  const [resetEmail, setResetEmail] = useState('')
  const [emailSent, setEmailSent] = useState(false)
  const [loading, setLoading] = useState(false)

  if (!isOpen) return null

  const handleSendResetLink = async () => {
    if (!resetEmail) {
      alert('Please enter your email address')
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(resetEmail)) {
      alert('Please enter a valid email address')
      return
    }

    setLoading(true)
    try {
      const response = await authAPI.forgotPassword(resetEmail)
      console.log('Password reset link sent:', response)
      setEmailSent(true)
    } catch (error) {
      if (error.message === 'Failed to fetch') {
        // 🌐 Frontend-only simulation
        alert('Backend not connected — simulated reset link sent successfully!')
        setEmailSent(true)
      } else {
        alert(error.message || 'Failed to send reset link. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    setResetEmail('')
    setEmailSent(false)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 bg-opacity-95 backdrop-blur-xl border border-white border-opacity-20 rounded-2xl p-6 w-full max-w-md shadow-2xl">
        {!emailSent ? (
          <>
            <h3 className="text-xl font-bold text-white mb-2">Reset Password</h3>
            <p className="text-gray-300 text-sm mb-4">
              Enter your email address to receive a password reset link
            </p>

            <input
              type="email"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-3 mb-4 bg-white bg-opacity-10 backdrop-blur-sm border border-white border-opacity-30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transition"
              disabled={loading}
              onKeyPress={(e) => {
                if (e.key === 'Enter') handleSendResetLink()
              }}
            />

            <div className="flex gap-3">
              <button
                onClick={handleCancel}
                className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition duration-200"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                onClick={handleSendResetLink}
                className="flex-1 px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading ? 'Sending...' : 'Send Link'}
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="text-center mb-4">
              <div className="text-5xl mb-3">✅</div>
              <h3 className="text-xl font-bold text-white mb-2">Email Sent!</h3>
              <p className="text-gray-300 text-sm">
                We've sent a password reset link to{' '}
                <span className="font-semibold text-white">{resetEmail}</span>
              </p>
              <p className="text-gray-400 text-xs mt-2">
                Check your inbox and click the link to reset your password.
              </p>
            </div>

            <button
              onClick={handleCancel}
              className="w-full px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition duration-200 font-semibold"
            >
              OK
            </button>
          </>
        )}
      </div>
    </div>
  )
}
