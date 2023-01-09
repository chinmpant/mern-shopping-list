import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addItem, editItem } from '../features/list/listSlice'

const ItemForm = ({ currentId, setCurrentId }) => {
  const [name, setName] = useState('')
  const item = useSelector(state =>
    state.list.items.find(item => item._id === currentId)
  )

  const dispatch = useDispatch()

  useEffect(() => {
    if (item) setName(item.name)
  }, [item])

  const handleSubmit = e => {
    e.preventDefault()

    if (currentId) {
      dispatch(editItem({ ...item, name }))
    } else {
      dispatch(addItem({ name }))
    }

    setName('')
    setCurrentId('')
  }

  return (
    <section className="form">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="name"
            id="name"
            placeholder=" "
            value={name}
            onChange={e => setName(e.target.value)}
            autoComplete="off"
            required
          />
          <label htmlFor="name">Item Name</label>
        </div>
        <div className="form-group">
          <button className="btn btn-block" type="submit">
            {currentId ? 'Edit' : 'Add'} Item
          </button>
        </div>
      </form>
    </section>
  )
}

export default ItemForm
