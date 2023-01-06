import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { logout, reset as authReset } from '../features/auth/authSlice'
import { getItems, reset } from '../features/list/listSlice'
import ItemForm from '../components/ItemForm'
import Spinner from '../components/Spinner'
import ListItem from '../components/ListItem'

const Dashboard = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector(state => state.auth)
  const { items, isLoading, isError, message } = useSelector(
    state => state.list
  )

  useEffect(() => {
    if (isError) {
      if (
        message.includes('Not authorized') ||
        message === "User doesn't exist"
      ) {
        return () => {
          toast.dismiss()
          dispatch(reset())
          dispatch(logout())
          dispatch(authReset())
          navigate('/login')
        }
      }
      toast.error(message)
    }

    if (!user) {
      navigate('/login')
    } else {
      dispatch(getItems())
    }

    return () => {
      dispatch(reset())
    }
  }, [dispatch, isError, message, navigate, user])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className="heading">
        <h1>Welcome {user && user.name}!</h1>
        <p>Your shopping list</p>
      </section>

      <ItemForm />

      <section className="content">
        {items.length > 0 ? (
          <div className="items">
            {items.map(item => (
              <ListItem key={item._id} item={item} />
            ))}
          </div>
        ) : (
          <h3>You have no items in your shopping list</h3>
        )}
      </section>
    </>
  )
}

export default Dashboard
