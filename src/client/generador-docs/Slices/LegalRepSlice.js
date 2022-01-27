import { createSlice } from '@reduxjs/toolkit';


const LegalRepsSlice = createSlice({
  name: 'legalReps',
  initialState: [  ],
  reducers: {
    legalRepAdded: (state, action) => {
      state.push(action.payload);
    },
    legalRepDeleted: (state, action) => {
      return state.filter((legalRep) => legalRep.id !== action.payload);
    },
    legalRepUpdated: (state, action) => {
      const { id, legalRepName, legalRepIdentifier, legalRepEmail, legalRepAddress, legalRepNationality } = action.payload;
      const legalRep = state.find((legalRep) => legalRep.id === id);
      if (legalRep) {
        legalRep.legalRepName = legalRepName;
        legalRep.legalRepIdentifier = legalRepIdentifier;
        legalRep.legalRepEmail = legalRepEmail;
        legalRep.legalRepAddress = legalRepAddress;
        legalRep.legalRepNationality = legalRepNationality;
      }
    },
    legalRepClear: (state) => {
      // returning because we are saving a new empty array
      return (state = []);
    },
  },
});


export const {
  legalRepAdded,
  legalRepDeleted,
  legalRepUpdated,
  legalRepCompleted,
  legalRepClear,
} = LegalRepsSlice.actions;

export const LegalRepsReducer = LegalRepsSlice.reducer;
