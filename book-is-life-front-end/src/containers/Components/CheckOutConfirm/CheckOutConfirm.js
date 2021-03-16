import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
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

export default function CheckOutConfirm(props) {
    const classes = useStyles();

    return (
        <Card className={classes.root} style={{margin: 4}}>
            <CardContent>
                <Typography className={classes.title} color="textPrimary" gutterBottom>
                    Sub Total({props.qtdeTotal} itens): R$ {parseFloat(props.valorTotal).toFixed(2)}
                </Typography>

            </CardContent>
            <CardActions style={{justifyContent: 'center'}}>
                <Button variant="contained" color="primary" size="small" onClick={props.salvar}>{props.buttomText}</Button>
            </CardActions>
        </Card>
    );
}
