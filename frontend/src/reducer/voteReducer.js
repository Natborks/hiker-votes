import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const votesSlice = createSlice({
  name: "hike-votes",
  initialState,
  reducers: {
    vote(state, action) {
      const voteId = action.payload;
      const voteOption = state.options.find((option) => option.id == voteId);

      const updatedOption = { ...voteOption, count: (voteOption.count += 1) };
      state.options.map((option) =>
        option.id == voteOption.id ? updatedOption : option
      );
    },
    setHike(_, action) {
      return action.payload;
    },
  },
});

export const { vote, setHike } = votesSlice.actions;
export default votesSlice.reducer;
