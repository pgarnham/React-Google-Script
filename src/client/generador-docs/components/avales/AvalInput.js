import {  Button, TextField } from '@material-ui/core';
import { makeStyles, withStyles } from "@material-ui/core/styles";
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { avalAdded } from '../../Slices/AvalSlice';
import Grid from '@material-ui/core/Grid';
import Rut from '../Rut';


const useStylesButton = makeStyles((theme) => ({
    buttons: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
    button: {
      marginTop: theme.spacing(3),
      marginLeft: theme.spacing(1),
    },
  }));


const styles = {
  input1: {
    height: 5,
    width: 300,
    borderRadius: '15px',
  },
  input2: {
    height: 200,
    fontSize: "2em"
  }
};


 function AvalInput(props) {
  const classesButton = useStylesButton();
  const dispatch = useDispatch();
  const [avalName, setAvalName] = useState('');
  const [avalIdentifier, setAvalIdentifier] = useState('');
  const [avalAddress, setAvalAddress] = useState('');
  const [rutValido, setRutValido] = useState(false);


  const dataValidator = () => {
      if (avalName == '' ||
          avalIdentifier == '' ||
          avalAddress == ''){
              return true
          }
          return false
  }

  const handleAddSubmit = () => {
    if (dataValidator()) {
      alert('Tienes que agregar todos los datos\n del Aval');
    } else {
      const newAval = {
        id: Math.floor(Math.random() * 100000000),
        avalName: avalName,
        avalIdentifier: avalIdentifier,
        avalAddress: avalAddress
      };

      dispatch(avalAdded(newAval));

      setAvalName('');
      setAvalIdentifier('');
      setAvalAddress('');
    }
  };



  return (
      <div>
        <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="avalName"
            name="avalName"
            label="Nombre Aval"
            value={avalName}
            onChange={(e) => setAvalName(e.target.value)}
            fullWidth
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
        <Rut value={avalIdentifier} onChange={(e) => setAvalIdentifier(e.target.value)} onValid={setRutValido} >
          <TextField
            required
            error={Boolean(avalIdentifier == '' ? false : !rutValido)}
            helperText="Rut Inválido"
            id="avalIdentifier"
            name="rut"
            label="RUT Aval"
            value={avalIdentifier}
            onChange={(e) => setAvalIdentifier(e.target.value)}
            fullWidth
            variant="outlined"
          />
          </Rut>
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="avalAddress"
            name="avalAddress"
            label="Dirección Aval"
            value={avalAddress}
            onChange={(e) => setAvalAddress(e.target.value)}
            fullWidth
            variant="outlined"
          />
        </Grid>
        <div className={classesButton.buttons}>
            <Button
            variant="contained"
            color="primary"
            className={classesButton.button}
            onClick={() => handleAddSubmit()}
            >
            Agregar Aval
            </Button>
        </div>
      </Grid>
    </React.Fragment>
      </div>
  );
}

export default withStyles (styles) (AvalInput)