import { createSlice } from '@reduxjs/toolkit';


const AvalesSlice = createSlice({
    name: 'avales',
    initialState: [  ],
    reducers: {
      avalAdded: (state, action) => {
        state.push(action.payload);
      },
      avalDeleted: (state, action) => {
        return state.filter((aval) => aval.id !== action.payload);
      },
      avalUpdated: (state, action) => {
        const { id, avalName, avalIdentifier, avalAddress} = action.payload;
        const aval = state.find((aval) => aval.id === id);
        if (aval) {
          aval.avalName = avalName;
          aval.avalIdentifier = avalIdentifier;
          aval.avalAddress = avalAddress;
        }
      },
      avalClear: (state) => {
        // returning because we are saving a new empty array
        return (state = []);
      },
    },
  });


export const {
    avalAdded,
    avalDeleted,
    avalUpdated,
    avalCompleted,
    avalClear,
} = AvalesSlice.actions;
  

export const AvalesReducer = AvalesSlice.reducer;