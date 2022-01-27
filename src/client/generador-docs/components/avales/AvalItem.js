import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { avalDeleted, avalUpdated } from "../../Slices/AvalSlice";
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
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';


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

export default function AvalItem({ aval, i }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);
  const [avalName, setAvalName] = useState(aval.avalName);
  const [avalIdentifier, setAvalIdentifier] = useState(aval.avalIdentifier);
  const [avalAddress, setAvalAddress] = useState(aval.avalAddress);

  const handleUpdate = () => {
    dispatch(
      avalUpdated({
        id: aval.id,
        avalName,
        avalIdentifier,
        avalAddress,
      })
    );

    if (edit) {
      setAvalName(aval.avalName)
      setAvalIdentifier(aval.avalIdentifier)
      setAvalAddress(aval.avalAddress)
    }
    setEdit(!edit);
  };

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
                            placeholder={avalName}
                            value={avalName} 
                            onChange={(e) => setAvalName(e.target.value)}
                            variant="outlined"
                />
                </Grid>
                <Grid item xs={12}>
                <TextField  label="Rut"
                            placeholder={avalIdentifier} 
                            value={avalIdentifier} 
                            onChange={(e) => setAvalIdentifier(e.target.value)} 
                            variant="outlined"
                />
                </Grid>
                <Grid item  xs={12}>
                <TextField  label="Dirección" 
                            placeholder={avalAddress} 
                            value={avalAddress} 
                            onChange={(e) => setAvalAddress(e.target.value)} 
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
                            onClick={() => dispatch(avalDeleted(aval.id))}
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
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                    </Typography>
                    <Typography variant="h6" component="h2">
                    {aval.avalName}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                    {aval.avalIdentifier}
                    </Typography>
                    <Typography variant="body2" component="p">
                      {aval.avalAddress}
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
                                onClick={() => dispatch(avalDeleted(aval.id))}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </CardActions>
                </Card>
              </Container>
              
            )}        
      </Grid>
      </Grid>
    </ListItem>
  );
}
