import { FaTrashAlt, FaEllipsisH } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { deleteItem } from '../features/list/listSlice'

const ListItem = ({ item, currentId, setCurrentId, formRef }) => {
  const dispatch = useDispatch()

  return (
    <div className="item">
      <span>{new Date(item.createdAt).toLocaleDateString('en-IN')}</span>
      <h2>{item.name}</h2>
      <button
        aria-label="Edit Item"
        className="edit"
        onClick={() => {
          setCurrentId(item._id)
          formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }}
      >
        <FaEllipsisH />
      </button>
      <button
        aria-label="Delete Item"
        className="delete"
        onClick={() => {
          dispatch(deleteItem(item._id))
          if (currentId === item._id) {
            setCurrentId(null)
          }
        }}
      >
        <FaTrashAlt />
      </button>
    </div>
  )
}

export default ListItem
