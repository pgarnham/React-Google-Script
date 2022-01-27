import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function UrlCard(props) {
  const classes = useStyles();

  const openUrlInNewPage = () => {
      console.log("Abriendo la pestaña nueva!")
    window.open(props.link, "_blank");
}
 

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
        {props.documentName} listo!
        </Typography>
        <Typography variant="h5" component="h2">
          {props.title}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Los documentos ya han sido generados
        </Typography>
        <Typography variant="body2" component="p">
            {props.comment}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small"
                target="_blank"
                onClick={() => openUrlInNewPage()}
        >
            Descargar {props.documentName}
        </Button>
      </CardActions>
    </Card>
  );
}