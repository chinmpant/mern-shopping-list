import axios from 'axios'

const API_URL = '/api/items/'

// Add new item
const addItem = async (itemData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const res = await axios.post(API_URL, itemData, config)

  return res.data
}

// Get user items
const getItems = async token => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const res = await axios.get(API_URL, config)

  return res.data
}

// Delete item
const deleteItem = async (itemId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const res = await axios.delete(API_URL + itemId, config)

  return res.data
}

const listService = {
  addItem,
  getItems,
  deleteItem
}

export default listService
