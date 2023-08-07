import { createSlice } from '@reduxjs/toolkit'



export const songSlice = createSlice(
  {
    name: 'songs',
    initialState: null, reducers: {
      setSong: (state, action) => {
        return action.payload
      }
    }
  }
)



export const { setSong } = songSlice.actions

export const songReducer = songSlice.reducer

