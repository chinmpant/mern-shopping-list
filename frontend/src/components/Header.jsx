import { useEffect, useCallback } from 'react'
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import jwtDecode from 'jwt-decode'
import { logout, reset } from '../features/auth/authSlice'

const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth)

  const handleLogout = useCallback(() => {
    dispatch(logout())
    dispatch(reset())
    navigate('/login')
  }, [dispatch, navigate])

  useEffect(() => {
    if (user) {
      const token = user.token

      if (token) {
        try {
          // Decode JWT token
          const decoded = jwtDecode(token)

          // Check if token is expired
          if (decoded.exp * 1000 < new Date().getTime()) {
            toast.error('Session has expired!', { theme: 'colored' })
            handleLogout()
          }
        } catch (error) {
          console.log(error.message)
          handleLogout()
        }
      }
    }
  })

  return (
    <header className="header">
      <div className="logo">
        <Link to={user && '/'}>Shopping List</Link>
      </div>
      <ul>
        {user ? (
          <li>
            <button className="btn btn-danger" onClick={handleLogout}>
              <FaSignOutAlt /> Logout
            </button>
          </li>
        ) : (
          <>
            <li>
              <Link to="/login">
                <FaSignInAlt /> Login
              </Link>
            </li>
            <li>
              <Link to="/register">
                <FaUser /> Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  )
}

export default Header
