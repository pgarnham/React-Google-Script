import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { legalRepDeleted, legalRepUpdated } from "../../Slices/LegalRepSlice";
import { avalAdded } from "../../Slices/AvalSlice";
import {
  ListItem,
  makeStyles
} from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles({
  item: {
    height: "30px",
    backgroundColor: "#fce4ec",
    border: "1px solid #aaaaaa",
    borderRadius: "20px",
    margin: "5px 5px"
  },root: {
    minWidth: 285,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  }
});

export default function LegalRepItem({ legalRep, i }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);
  const [legalRepName, setLegalRepName] = useState(legalRep.legalRepName);
  const [legalRepIdentifier, setLegalRepIdentifier] = useState(legalRep.legalRepIdentifier);
  const [legalRepEmail, setLegalRepEmail] = useState(legalRep.legalRepEmail);
  const [legalRepAddress, setLegalRepAddress] = useState(legalRep.legalRepAddress);
  const [legalRepNationality, setLegalRepNationality] = useState(legalRep.legalRepNationality);

  const handleUpdate = () => {
    dispatch(
      legalRepUpdated({
        id: legalRep.id,
        legalRepName,
        legalRepIdentifier,
        legalRepEmail,
        legalRepAddress,
        legalRepNationality
      })
    );

    if (edit) {
      setLegalRepName(legalRep.legalRepName)
      setLegalRepIdentifier(legalRep.legalRepIdentifier)
      setLegalRepEmail(legalRep.legalRepEmail)
      setLegalRepAddress(legalRep.legalRepAddress)
      setLegalRepNationality(legalRep.legalRepNationality)
    }
    setEdit(!edit);
  };

  const setAsAval = () => {
    const newAval = {
      id: Math.floor(Math.random() * 100000000),
      avalName: legalRepName,
      avalIdentifier: legalRepIdentifier,
      avalAddress: legalRepAddress
    };
    dispatch(avalAdded(newAval));
  }

  return (
    <ListItem >
      <Grid container>
      <Grid item >
            {edit ? (
              <Grid container>
                <Paper>
               <Container>
               <Grid container spacing={2}>
                <Grid item xs={12}>
                <TextField  label="Nombre"
                            placeholder={legalRepName} 
                            value={legalRepName} 
                            onChange={(e) => setLegalRepName(e.target.value)}
                            variant="outlined"
                />
                </Grid>
                <Grid item xs={12}>
                <TextField  label="Rut" 
                            placeholder={legalRepIdentifier} 
                            value={legalRepIdentifier} 
                            onChange={(e) => setLegalRepIdentifier(e.target.value)}
                            variant="outlined"
                />
                </Grid>
                <Grid item  xs={12}>
                <TextField  label="Correo" 
                            placeholder={legalRepEmail} 
                            value={legalRepEmail} 
                            onChange={(e) => setLegalRepEmail(e.target.value)}
                            variant="outlined"
                />
                </Grid>
                <Grid item  xs={12}>
                <TextField  label="Dirección" 
                            placeholder={legalRepAddress} 
                            value={legalRepAddress} 
                            onChange={(e) => setLegalRepAddress(e.target.value)}
                            variant="outlined"
                />
                </Grid>
                <Grid item  xs={12}>
                <TextField  label="Nacionalidad" 
                            placeholder={legalRepNationality} 
                            value={legalRepNationality} 
                            onChange={(e) => setLegalRepNationality(e.target.value)}
                            variant="outlined"
                />
                </Grid>
                </Grid>
                </Container>
                <Container>
                <IconButton aria-label="edit" 
                            className={classes.margin} 
                            onClick={() => handleUpdate()}
                >
                      <SaveIcon/>
                </IconButton>
                <IconButton aria-label="delete" 
                            className={classes.margin} 
                            onClick={() => dispatch(legalRepDeleted(legalRep.id))}
                >
                  <DeleteIcon />
                </IconButton>
                </Container>
                </Paper>
                </Grid>
            ) : (
              <Container>
                <Card className={classes.root}>
                  <CardContent>
                    <Typography className={classes.title}
                                color="textSecondary" gutterBottom
                    >
                    {legalRep.legalRepEmail}
                    </Typography>
                    <Typography variant="h6" 
                                component="h2"
                    >
                    {legalRep.legalRepName}
                    </Typography>
                    <Typography className={classes.pos}
                                color="textSecondary"
                    >
                    {legalRep.legalRepIdentifier} - (Nac. {legalRep.legalRepNationality})
                    </Typography>
                    <Typography variant="body2"
                                component="p"
                    >
                      {legalRep.legalRepAddress}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <IconButton aria-label="edit" 
                                className={classes.margin} 
                                onClick={() => handleUpdate()}
                    >
                      <EditIcon/>
                    </IconButton>
                    <IconButton aria-label="delete" 
                                className={classes.margin} 
                                onClick={() => dispatch(legalRepDeleted(legalRep.id))}
                    >
                      <DeleteIcon />
                    </IconButton>
                    <Button size="small" 
                            onClick={() => setAsAval()} 
                            color="default" 
                            variant="contained" 
                            startIcon={<PersonAddIcon />}
                    >
                      Usar como Aval
                    </Button>
                  </CardActions>
                </Card>
              </Container>
              
            )}        
      </Grid>
      </Grid>
    </ListItem>
  );
}
