import React from 'react';
import CompanyInput from '../../generador-docs/components/CompanyInput';
import { Paper } from '@material-ui/core'
import { Provider } from "react-redux";
import { store } from "../../generador-docs/Slices/store";


const SheetEditor = () => {
  
  

  return (
    <Provider store={store}>
      <div className="box">
        <Paper elevation={3} >
          <CompanyInput/>
        </Paper>
      </div>
    </Provider>
  );
};

export default SheetEditor;
