import { FaTimes } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { deleteItem } from '../features/list/listSlice'

const ListItem = ({ item }) => {
  const dispatch = useDispatch()

  return (
    <div className="item">
      <div>{new Date(item.createdAt).toLocaleDateString('en-IN')}</div>
      <h2>{item.name}</h2>
      <button
        className="close"
        onClick={() => {
          dispatch(deleteItem(item._id))
        }}
      >
        <FaTimes />
      </button>
    </div>
  )
}

export default ListItem
