import axios from 'axios'

const API_URL = '/api/users/'

// Register user
const register = async userData => {
  const res = await axios.post(API_URL, userData)
  const user = await getUserData(res.data.token)

  if (res.data && user) {
    localStorage.setItem(
      'user',
      JSON.stringify({ ...user, token: res.data.token })
    )
  }

  return { ...user, token: res.data.token }
}

// Login user
const login = async userData => {
  const res = await axios.post(API_URL + 'login', userData)
  const user = await getUserData(res.data.token)

  if (res.data && user) {
    localStorage.setItem(
      'user',
      JSON.stringify({ ...user, token: res.data.token })
    )
  }

  return { ...user, token: res.data.token }
}

// Get user data
const getUserData = async token => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const res = await axios.get(API_URL + 'me', config)

  return res.data
}

const authService = {
  register,
  login
}

export default authService
