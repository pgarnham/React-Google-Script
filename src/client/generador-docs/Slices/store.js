import { configureStore } from '@reduxjs/toolkit';
import { LegalRepsReducer } from './LegalRepSlice'
import { AvalesReducer } from './AvalSlice';

export const store = configureStore({
  reducer: {
    LegalRepsReducer: LegalRepsReducer,
    AvalesReducer: AvalesReducer
  },
});
