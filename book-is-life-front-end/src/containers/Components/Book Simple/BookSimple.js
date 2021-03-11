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
        maxWidth: 185,
        margin: 2,
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
                <CardContent style={{height: 125}}>
                    <Typography gutterBottom variant="body2" component="p" style={{ height: 66}}>
                        {props.bookTitle}
                    </Typography>
                    <Typography variant="body1" color="textSecondary" component="p">
                        {props.author}
                    </Typography>
                    <Typography variant="body2" color="textPrimary" component="p">
                        R$ {props.value}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions style={{justifyContent: 'center'}}>

                <Button size="small" color="primary" style={{fontSize: 10}}>
                    Colocar no Carrinho
                </Button>
            </CardActions>
        </Card>
    );
}
