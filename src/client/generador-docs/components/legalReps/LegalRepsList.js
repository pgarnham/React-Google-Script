import { makeStyles, List } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import LegalRepItem from "./LegalRepItem";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import LegalRepInput from "./LegalRepInput";
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles({
  rootDiv: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginLeft: "10px",
    marginRight: "10px"
  },
  p: {
    fontSize: "30px",
    fontweight: "bolder"
  }
});

export default function LegalRepsList() {
  const classes = useStyles();
  const legalReps = useSelector((state) => state.LegalRepsReducer);

  return (
    <div className={classes.rootDiv}>
        <div>
          <Grid container spacing={3}>
          <Grid item xs={8}>
          <LegalRepInput></LegalRepInput>
        </Grid>
        <Grid item xs={4}>
        <List>
        <Typography variant="h6">Representantes Legales</Typography>
          <Paper elevation={3} style={{maxHeight: 400, overflow: 'auto', minHeight: 200}}>
          {legalReps.map((legalRep, i) => (
            <LegalRepItem key={i} legalRep={legalRep} />
          ))}
          </Paper>
        </List>
        </Grid>
        </Grid>
        </div>
    </div>
  );
}
