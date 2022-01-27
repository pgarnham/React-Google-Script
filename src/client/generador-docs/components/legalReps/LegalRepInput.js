import {  Button, TextField } from '@material-ui/core';
import { makeStyles, withStyles } from "@material-ui/core/styles";
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { legalRepAdded } from '../../Slices/LegalRepSlice';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
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


 function LegalRepInput(props) {
  const classesButton = useStylesButton();
  const dispatch = useDispatch();

  const [legalRepName, setLegalRepName] = useState('');
  const [legalRepIdentifier, setLegalRepIdentifier] = useState('');
  const [legalRepEmail, setLegalRepEmail] = useState('');
  const [legalRepAddress, setLegalRepAddress] = useState('');
  const [legalRepNationality, setLegalRepNationality] = useState('Chilena');
  const [checked, setChecked] = useState(true);
  const [rutValido, setRutValido] = useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
    if (event.target.checked){
        setLegalRepNationality('Chilena');
    }
    else{
        setLegalRepNationality('');
    }
  };


  const dataValidator = () => {
      if (legalRepName == '' ||
          legalRepIdentifier == '' ||
          legalRepEmail == '' ||
          legalRepAddress == '' ||
          legalRepNationality == ''){
              return true
          }
          return false
  }

  const handleAddSubmit = () => {
    if (dataValidator()) {
      alert('Tienes que agregar todos los datos\n del Representante Legal');
    } else {
      const newLegalRep = {
        id: Math.floor(Math.random() * 100000000),
        legalRepName: legalRepName,
        legalRepIdentifier: legalRepIdentifier,
        legalRepEmail: legalRepEmail,
        legalRepAddress: legalRepAddress,
        legalRepNationality: legalRepNationality
      };

      dispatch(legalRepAdded(newLegalRep));

      setLegalRepName('');
      setLegalRepIdentifier('');
      setLegalRepEmail('');
      setLegalRepAddress('');
      setLegalRepNationality('Chilena');
      setChecked(true);
    }
  };



  return (
      <div>
        <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="legalRepName"
            name="legalRepName"
            label="Nombre Representante Legal"
            value={legalRepName}
            onChange={(e) => setLegalRepName(e.target.value)}
            fullWidth
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
        <Rut value={legalRepIdentifier} onChange={(e) => setLegalRepIdentifier(e.target.value)} onValid={setRutValido} >
          <TextField
            required
            error={Boolean(legalRepIdentifier == '' ? false : !rutValido)}
            helperText="Rut Inválido"
            id="legalRepIdentifier"
            name="rut"
            label="RUT Representante Legal"
            value={legalRepIdentifier}
            onChange={(e) => setLegalRepIdentifier(e.target.value)}
            fullWidth
            variant="outlined"
          />
          </Rut>
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="legalRepEmail"
            name="legalRepEmail"
            label="Correo Representante Legal"
            value={legalRepEmail}
            onChange={(e) => setLegalRepEmail(e.target.value)}
            fullWidth
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="legalRepAddress"
            name="legalRepAddress"
            label="Dirección Representante Legal"
            value={legalRepAddress}
            onChange={(e) => setLegalRepAddress(e.target.value)}
            fullWidth
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
            <Container>
          <FormControlLabel
            control={
                <Checkbox checked={checked}
                    onChange={handleChange} 
                    color="primary"
                    name="chilean"
                    />}
            label="Chileno"
          />
          {checked? (<Container/>) : (<TextField
            id="legalRepNationality"
            name="legalRepNationality"
            label="Nacionalidad Representante Legal"
            value={legalRepNationality}
            onChange={(e) => setLegalRepNationality(e.target.value)}
            fullWidth
            variant="outlined"
          />)} 
          </Container>
        </Grid>
        <div className={classesButton.buttons}>
            <Button
            variant="contained"
            color="primary"
            className={classesButton.button}
            onClick={() => handleAddSubmit()}
            >
            Agregar Representante
            </Button>
        </div>
      </Grid>
    </React.Fragment>
      </div>
  );
}

export default withStyles (styles) (LegalRepInput)