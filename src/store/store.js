import { configureStore } from '@reduxjs/toolkit'
import programsReducer from './programSlice'

const store = configureStore({
  reducer: {
    programs: programsReducer
  }
})

export default store
