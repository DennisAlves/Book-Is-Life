import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },

});


export default function BookSimple(props) {
    const classes = useStyles();
    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    style={{ objectFit: 'contain' ,marginTop: 10 }}
                    component="img"
                    alt={props.alt}
                    height="240"
                    image={props.image}
                    title={props.title}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {props.bookTitle}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {props.shortResume}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions style={{justifyContent: 'center'}}>

                <Button size="small" color="primary">
                    Colocar no Carrinho
                </Button>
            </CardActions>
        </Card>
    );
}