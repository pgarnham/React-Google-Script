import React from "react";
import { useSelector } from "react-redux";
import CompanyInput from "./components/CompanyInput";
import "./App.css";
import Paper from '@material-ui/core/Paper';

export default function App() {
  const state = useSelector((state) => state);
  console.log(state);

  return (
    <div>
      <div className="box">
        <Paper elevation={3} >
          <CompanyInput/>
        </Paper>
      </div>
    </div>
  );
}
