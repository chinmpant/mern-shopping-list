import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaUser, FaEye, FaEyeSlash } from 'react-icons/fa'
import { motion } from 'framer-motion'
import Spinner from '../components/Spinner'
import { register, reset } from '../features/auth/authSlice'

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false)

  const { name, email, password, passwordConfirm } = formData

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

    if (password !== passwordConfirm) {
      toast.error('Passwords do not match', { theme: 'colored' })
    } else {
      const userData = { name, email, password }

      dispatch(register(userData))
    }
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
          <FaUser /> Register
        </h1>
        <p>Please create an account</p>
      </section>

      {isLoading ? (
        <Spinner />
      ) : (
        <section className="form">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                placeholder=" "
                value={name}
                onChange={handleChange}
                autoComplete="off"
                required
              />
              <label htmlFor="name">Name</label>
            </div>
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
              <input
                type={showPasswordConfirm ? 'text' : 'password'}
                className="form-control"
                id="passwordConfirm"
                name="passwordConfirm"
                placeholder=" "
                value={passwordConfirm}
                onChange={handleChange}
                autoComplete="off"
                required
              />
              <span
                aria-label="Toggle confirmation password visibility"
                role="button"
                tabIndex={0}
                onClick={() => {
                  setShowPasswordConfirm(
                    prevShowPasswordConfirm => !prevShowPasswordConfirm
                  )
                }}
              >
                {showPasswordConfirm ? <FaEyeSlash /> : <FaEye />}
              </span>
              <label htmlFor="passwordConfirm">Confirm Password</label>
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-block">
                Register
              </button>
            </div>
          </form>
        </section>
      )}
    </motion.div>
  )
}

export default Register
