import { Button, TextField } from '@material-ui/core';
import { makeStyles, withStyles } from "@material-ui/core/styles";
import React, { useState } from 'react';
import axios from "axios";
import { useSelector } from "react-redux";
import Grid from '@material-ui/core/Grid';
import Rut from '../components/Rut';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import LegalRepsList from "../components/legalReps/LegalRepsList";
import AvalesList from "../components/avales/AvalesList";
import { BASE_URL, API_TOKEN } from '../functions/variables';
import UrlModal from './UrlModal';


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


 function CompanyInput(props) {
  const [companyName, setCompanyName] = useState('');
  const [companyIdentifier, setCompanyIdentifier] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [rutValido, setRutValido] = useState(false);
  const [showUrl, setShowUrl] = useState(false);
  const [documentLink, setDocumentLink] = useState("");
  const [waitting, setWaitting] = useState(false);

  const legalReps = useSelector((state) => state.LegalRepsReducer);
  const avales = useSelector((state) => state.AvalesReducer);

  const classesButton = useStylesButton();


  const checkData = () => {
    if (companyName != ''
        && companyAddress != ''
        && rutValido
        && legalReps.length > 0
        && avales.length > 0){
          return true
    }
    return false
  }


  const handleSubmit = async () => {
    if (checkData()){
      setWaitting(true);
     let response = await axios.post(BASE_URL, {
        companyName: companyName,
        companyIdentifier: companyIdentifier,
        companyAddress: companyAddress,
        legalReps: legalReps,
        avales: avales,
        token: API_TOKEN
      });
      console.log("La response es: ", response);
      setDocumentLink(response.data.documentUrl);
      setWaitting(false);
      setShowUrl(true);
    }
  }


  return (
      <div>
        <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="companyName"
            name="companyName"
            label="Razón Social Empresa"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            fullWidth
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
        <Rut value={companyIdentifier} onChange={(e) => setCompanyIdentifier(e.target.value)} onValid={setRutValido} >
          <TextField
            required
            error={Boolean(companyIdentifier == '' ? false : !rutValido)}
            helperText="Rut Inválido"
            id="companyIdentifier"
            name="rut"
            label="RUT Empresa"
            value={companyIdentifier}
            onChange={(e) => setCompanyIdentifier(e.target.value)}
            fullWidth
            variant="outlined"
          />
          </Rut>
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="companyAddress"
            name="companyAddress"
            label="Dirección Empresa"
            value={companyAddress}
            onChange={(e) => setCompanyAddress(e.target.value)}
            fullWidth
            variant="outlined"
          />
        </Grid>
      </Grid>
    </React.Fragment>
    <Paper elevation={3} >
          <LegalRepsList />
        </Paper>
        <br></br>
        <br></br>
        <Divider variant="middle" />
        <br></br>
        <br></br>
        <Paper elevation={3} >
          <AvalesList />
        </Paper>
        <div className={classesButton.buttons}>
          { !waitting? 
            (<Button
            variant="contained"
            color="primary"
            disabled={!checkData()}
            className={classesButton.button}
            onClick={() => handleSubmit()}
            >
            Generar Contrato Unificado
            </Button>)
          :  (<Button
            variant="outlined"
            disabled
          >
            Generando Documento...
          </Button>)}
            
        </div>
        <UrlModal isOpen={showUrl}
                  link={documentLink}
        />
      </div>
  );
}

export default withStyles (styles) (CompanyInput)