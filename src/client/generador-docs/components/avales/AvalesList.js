import { makeStyles, List } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import AvalItem from "./AvalItem";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import AvalInput from "./AvalInput";
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

export default function AvalesList() {
  const classes = useStyles();
  const avales = useSelector((state) => state.AvalesReducer);

  return (
    <div className={classes.rootDiv}>
        <div>
          <Grid container spacing={3}>
          <Grid item xs={8}>
          <AvalInput></AvalInput>
        </Grid>
        <Grid item xs={4}>
        <List>
        <Typography variant="h6">Avales</Typography>
          <Paper elevation={3} style={{maxHeight: 400, overflow: 'auto', minHeight: 200}}>
          {avales.map((aval, i) => (
            <AvalItem key={i} aval={aval} />
          ))}
          </Paper>
        </List>
        </Grid>
        </Grid>
        </div>
    </div>
  );
}
