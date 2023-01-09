import { FaTrashAlt, FaEllipsisH } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { deleteItem } from '../features/list/listSlice'

const ListItem = ({ item, setCurrentId, formRef }) => {
  const dispatch = useDispatch()

  return (
    <div className="item">
      <div>{new Date(item.createdAt).toLocaleDateString('en-IN')}</div>
      <h2>{item.name}</h2>
      <button
        className="edit"
        onClick={() => {
          setCurrentId(item._id)
          formRef.current.scrollIntoView()
        }}
      >
        <FaEllipsisH />
      </button>
      <button
        className="delete"
        onClick={() => {
          dispatch(deleteItem(item._id))
        }}
      >
        <FaTrashAlt />
      </button>
    </div>
  )
}

export default ListItem
