import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AuthPage from './pages/authpage'
import ResetPasswordPage from './pages/ResetPasswordPage'

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App