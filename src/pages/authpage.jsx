import { useState } from 'react'
import RoleSelection from '../components/auth/roleSelection'
import LoginForm from '../components/auth/loginForm'
import SignupForm from '../components/auth/signupform'
import AuthLayout from '../components/auth/authLayout'
import ForgotPasswordModal from '../components/auth/ForgotPasswordModal'
import Navbar from '../components/common/Navbar'
import { authAPI } from '../services/api'

export default function AuthPage() {
  const [currentView, setCurrentView] = useState('role-selection')
  const [selectedRole, setSelectedRole] = useState('')
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false)
  const [loading, setLoading] = useState(false)

  // Role selection
  const handleRoleSelection = (role) => {
    setSelectedRole(role)
    setCurrentView('login')
  }

  // Input handler
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  // ✅ Login handler with Remember Me logic
  const handleLogin = async (rememberMe) => {
    setLoading(true)
    try {
      const response = await authAPI.login({
        email: formData.email,
        password: formData.password,
        role: selectedRole
      })

      console.log('Login successful:', response)

      // ✅ Store token (simulated now, real later)
      const token = response?.token || 'fake-token-12345'

      if (rememberMe) {
        localStorage.setItem('authToken', token)
      } else {
        sessionStorage.setItem('authToken', token)
      }

      alert(`Login successful! Welcome ${response.user?.username || 'User'}`)
    } catch (error) {
      if (error.message === 'Failed to fetch') {
        alert('Server is not reachable. Please try again later (frontend only).')
      } else {
        alert(error.message || 'Login failed. Please check your credentials.')
      }
    } finally {
      setLoading(false)
    }
  }

  // Signup handler
  const handleSignup = async () => {
    if (!formData.username) {
      alert('Please enter a username')
      return
    }

    if (!formData.email) {
      alert('Please enter an email')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!')
      return
    }

    setLoading(true)
    try {
      const response = await authAPI.signup({
        username: formData.username,
        email: formData.email,
        password: formData.password,
        role: selectedRole
      })

      console.log('Signup successful:', response)
      alert(`Account created successfully!\nWelcome ${formData.username}!`)

      // After successful signup → redirect to login
      setCurrentView('login')
      setFormData({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
      })
    } catch (error) {
      if (error.message === 'Failed to fetch') {
        // Friendly message for frontend-only testing
        alert(`Backend not connected — signup simulated!\nWelcome ${formData.username}!`)
        setCurrentView('login')
        setFormData({
          username: '',
          email: '',
          password: '',
          confirmPassword: ''
        })
      } else {
        alert(error.message || 'Signup failed. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleForgotPassword = () => {
    setShowForgotPasswordModal(true)
  }

  const resetToRoleSelection = () => {
    setCurrentView('role-selection')
    setSelectedRole('')
    setFormData({
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    })
  }

  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* Main content with gradient background */}
      <div
        className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
        style={{ paddingTop: '64px' }}
      >
        {/* Animated gradient background */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background: 'linear-gradient(135deg, #001a12 0%, #064e3b 40%, #0f172a 100%)',
            top: '64px'
          }}
        />

        {/* Animated blurred shapes */}
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
          <div
            className="absolute rounded-full"
            style={{
              width: '450px',
              height: '450px',
              background: 'radial-gradient(circle, #34d399 0%, #10b981 100%)',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              filter: 'blur(120px)',
              opacity: 0.2,
              animation: 'float 25s ease-in-out infinite',
              animationDelay: '-5s'
            }}
          />
        </div>

        {/* Dark overlay */}
        <div
          className="absolute inset-0 bg-black bg-opacity-10 z-0"
          style={{ top: '64px' }}
        ></div>

        {/* Auth Content */}
        <div className="relative z-10">
          <AuthLayout>
            {currentView === 'role-selection' && (
              <RoleSelection onRoleSelect={handleRoleSelection} />
            )}

            {currentView === 'login' && (
              <LoginForm
                selectedRole={selectedRole}
                formData={formData}
                onInputChange={handleInputChange}
                onLogin={handleLogin} // ✅ now accepts rememberMe
                onSignupClick={() => setCurrentView('signup')}
                onForgotPassword={handleForgotPassword}
                onBack={resetToRoleSelection}
                loading={loading}
              />
            )}

            {currentView === 'signup' && (
              <SignupForm
                selectedRole={selectedRole}
                formData={formData}
                onInputChange={handleInputChange}
                onSignup={handleSignup}
                onBack={() => setCurrentView('login')}
                loading={loading}
              />
            )}
          </AuthLayout>
        </div>

        {/* Forgot Password Modal */}
        <ForgotPasswordModal
          isOpen={showForgotPasswordModal}
          onClose={() => setShowForgotPasswordModal(false)}
        />

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
