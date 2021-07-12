import {
  createSlice,
  createSelector,
  createAsyncThunk,
  createEntityAdapter
} from '@reduxjs/toolkit'

import Api from '../api/client'
import { cleanAndSortChannels } from '../util'

const programsAdapter = createEntityAdapter()

const initialState = programsAdapter.getInitialState({
  loading: false
})

export const fetchPrograms = createAsyncThunk('programs/fetchPrograms', async () => await Api.getPrograms())

const programSlice = createSlice({
  name: 'programs',
  initialState,
  reducers: {
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPrograms.pending, (state) => {
        state.loading = true
      })

      .addCase(fetchPrograms.fulfilled, (state, action) => {
        console.log("FetchPrograms was Successful")
        const sorted = cleanAndSortChannels(action.payload.channels)
        programsAdapter.setAll(state, sorted)

        state.loading = false
      })
      
      .addCase(fetchPrograms.rejected, (state, action) => {
        console.log("FetchPrograms was Rejected")
        console.log(action)
        state.loading = false

        return action.payload
      })
  }
})

export default programSlice.reducer

export const {
  selectAll: selectPrograms,
  selectById: selectProgramById
} = programsAdapter.getSelectors(state => state.programs)

export const selectProgramId = createSelector(
  selectPrograms,
  programs => programs.map(program => program.id)
)
