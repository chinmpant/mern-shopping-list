import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { logout, reset as authReset } from '../features/auth/authSlice'
import { getItems, reset } from '../features/list/listSlice'
import { motion } from 'framer-motion'
import jwtDecode from 'jwt-decode'
import ItemForm from '../components/ItemForm'
import Spinner from '../components/Spinner'
import ListItem from '../components/ListItem'

const Dashboard = () => {
  const [currentId, setCurrentId] = useState(null)
  const formRef = useRef(null)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector(state => state.auth)
  const { items, isLoading, isError, message } = useSelector(
    state => state.list
  )

  useEffect(() => {
    if (!user) {
      navigate('/login')
    } else {
      dispatch(getItems())
    }

    if (isError) {
      try {
        const decoded = jwtDecode(user.token)

        if (decoded.exp * 1000 < new Date().getTime()) {
          toast.error('Session has expired!', { theme: 'colored' })
        } else {
          toast.error(message, { theme: 'colored' })
        }
      } catch (error) {
        toast.error('Invalid token!', { theme: 'colored' })
      }

      dispatch(logout())
      dispatch(authReset())
      navigate('/login')
    }

    return () => {
      dispatch(reset())
    }
  }, [user, isError, message, dispatch, navigate])

  if (user) {
    return (
      <motion.div
        className="page"
        initial={{ opacity: 0.5, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0.5, scale: 0.98 }}
        transition={{ duration: 0.1 }}
      >
        <section className="heading" ref={formRef}>
          <h1>Welcome {user.name}!</h1>
          <p>Your shopping list</p>
        </section>

        <ItemForm currentId={currentId} setCurrentId={setCurrentId} />

        {isLoading ? (
          <Spinner />
        ) : (
          <section className="content">
            {items.length > 0 ? (
              <div className="items">
                {items
                  .map(item => (
                    <ListItem
                      key={item._id}
                      item={item}
                      currentId={currentId}
                      setCurrentId={setCurrentId}
                      formRef={formRef}
                    />
                  ))
                  .reverse()}
              </div>
            ) : (
              <h3>You have no items in your shopping list</h3>
            )}
          </section>
        )}
      </motion.div>
    )
  }
}

export default Dashboard
