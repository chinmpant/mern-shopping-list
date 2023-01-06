import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addItem } from '../features/list/listSlice'

const ItemForm = () => {
  const [name, setName] = useState('')

  const dispatch = useDispatch()

  const handleSubmit = e => {
    e.preventDefault()

    dispatch(addItem({ name }))
    setName('')
  }

  return (
    <section className="form">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Item Name</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Enter item name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <button className="btn btn-block" type="submit">
            Add Item
          </button>
        </div>
      </form>
    </section>
  )
}

export default ItemForm
