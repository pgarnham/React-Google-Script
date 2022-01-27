import React, { useState, useEffect } from 'react';
import MUIDataTable from "mui-datatables";
import TextField from '@material-ui/core/TextField';
import FormControl from "@material-ui/core/FormControl";
import server from '../../utils/server';

const { serverFunctions } = server;



const Table = () => {
  const [responsive, setResponsive] = useState("scroll");
  const [tableBodyHeight, setTableBodyHeight] = useState("100%");
  const [tableBodyMaxHeight, setTableBodyMaxHeight] = useState("");
  const [tableData, setTableData] = useState([]);
  const [tableHeaders, setTableHeaders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');


  useEffect(() => {
    // Call a server global function here and handle the response with .then() and .catch()
    serverFunctions
      .getSheetHeader('Datos')
      .then(setTableHeaders)
      .catch(alert);
  }, []);

  useEffect(() => {
    // Call a server global function here and handle the response with .then() and .catch()
    serverFunctions
      .getSheetRows('Datos')
      .then(setTableData)
      .catch(alert);
  }, []);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const options = {
    filter: true,
    filterType: "dropdown",
    responsive,
    tableBodyHeight,
    tableBodyMaxHeight,
    rowsPerPage: 100,
    searchText: searchTerm
  };

  const dataOld = [
    ["Gabby George", "Business Analyst", "Minneapolis"],
    [
      "Aiden Lloyd",
      "Business Consultant for an International Company and CEO of Tony's Burger Palace",
      "Dallas"
    ],
    ["Jaden Collins", "Attorney", "Santa Ana"],
    ["Franky Rees", "Business Analyst", "St. Petersburg"],
    ["Aaren Rose", null, "Toledo"],
    ["Johnny Jones", "Business Analyst", "St. Petersburg"],
    ["Jimmy Johns", "Business Analyst", "Baltimore"],
    ["Jack Jackson", "Business Analyst", "El Paso"],
    ["Joe Jones", "Computer Programmer", "El Paso"],
    ["Jacky Jackson", "Business Consultant", "Baltimore"],
    ["Jo Jo", "Software Developer", "Washington DC"],
    ["Donna Marie", "Business Manager", "Annapolis"]
  ];

  return (
    <React.Fragment>
      <FormControl>
      <TextField id="outlined-basic" label="Busca por cualquier campo" variant="outlined" value={searchTerm} onChange={handleChange} />
      </FormControl>
      <MUIDataTable
        title={"ACME Employee list"}
        data={tableData}
        columns={tableHeaders}
        options={options}
      />
    </React.Fragment>
  );
}

export default Table;
