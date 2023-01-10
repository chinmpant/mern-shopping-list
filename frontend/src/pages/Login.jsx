import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaSignInAlt, FaEye, FaEyeSlash } from 'react-icons/fa'
import { motion } from 'framer-motion'
import Spinner from '../components/Spinner'
import { login, reset } from '../features/auth/authSlice'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)

  const { email, password } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    state => state.auth
  )

  useEffect(() => {
    if (isError) {
      toast.error(message, { theme: 'colored' })
    }

    if (isSuccess || user) {
      navigate('/')
    }

    return () => {
      dispatch(reset())
    }
  }, [dispatch, isError, isSuccess, message, navigate, user])

  const handleChange = e => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = e => {
    e.preventDefault()

    const userData = { email, password }
    dispatch(login(userData))
  }

  return (
    <motion.div
      className="page"
      initial={{ opacity: 0.5, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0.5, scale: 0.98 }}
      transition={{ duration: 0.1 }}
    >
      <section className="heading">
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Please login to add items</p>
      </section>

      {isLoading ? (
        <Spinner />
      ) : (
        <section className="form">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder=" "
                value={email}
                onChange={handleChange}
                autoComplete="off"
                required
              />
              <label htmlFor="email">Email</label>
            </div>
            <div className="form-group">
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-control"
                id="password"
                name="password"
                placeholder=" "
                value={password}
                onChange={handleChange}
                autoComplete="off"
                required
              />
              <span
                aria-label="Toggle password visibility"
                role="button"
                tabIndex={0}
                onClick={() => {
                  setShowPassword(prevShowPassword => !prevShowPassword)
                }}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
              <label htmlFor="password">Password</label>
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-block">
                Login
              </button>
            </div>
          </form>
        </section>
      )}
    </motion.div>
  )
}

export default Login
