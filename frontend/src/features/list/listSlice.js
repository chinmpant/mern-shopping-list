import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import listService from './listService'

const initialState = {
  items: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
}

// Add new item
export const addItem = createAsyncThunk(
  'list/addItem',
  async (itemData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await listService.addItem(itemData, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()

      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Get user items
export const getItems = createAsyncThunk(
  'list/getItems',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user?.token
      return await listService.getItems(token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()

      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Delete item
export const deleteItem = createAsyncThunk(
  'list/deleteItem',
  async (itemId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await listService.deleteItem(itemId, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()

      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Edit item
export const editItem = createAsyncThunk(
  'list/editItem',
  async (item, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await listService.editItem(item._id, { name: item.name }, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()

      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const listSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {
    reset: state => initialState
  },
  extraReducers: builder => {
    builder
      .addCase(addItem.pending, state => {
        state.isLoading = true
      })
      .addCase(addItem.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.items.push(action.payload)
      })
      .addCase(addItem.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getItems.pending, state => {
        state.isLoading = true
      })
      .addCase(getItems.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.items = action.payload
      })
      .addCase(getItems.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteItem.pending, state => {
        state.isLoading = true
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.items = state.items.filter(item => item._id !== action.payload.id)
      })
      .addCase(deleteItem.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(editItem.pending, state => {
        state.isLoading = true
      })
      .addCase(editItem.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.items = state.items.map(item =>
          item._id === action.payload._id ? action.payload : item
        )
      })
      .addCase(editItem.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  }
})

export const { reset } = listSlice.actions
export default listSlice.reducer
