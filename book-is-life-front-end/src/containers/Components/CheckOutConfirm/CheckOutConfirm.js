import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import * as CCS from "./CheckOutConfirmStyles"


const useStyles = makeStyles({
    root: {
        minWidth: 350,
    },
    title:{
        marginRight:10,
    },
    pos: {
        marginBottom: 12,
    },
});

/**
 *
 * @param props{itemDescription,frete,qtdeTotal,valorTotal,disableButtom,salvar,
 * buttomText}
 * @returns
 * @constructor
 */

export default function CheckOutConfirm(props) {
    const classes = useStyles();

    return (
        <Card className={classes.root} style={{margin: 4}}>
            <CardContent>
                {props.itemDescription ?
                    props.itemDescription.map((item, index) => {
                        return (
                            <CCS.DescriptionWrapper key={Math.random() * (index + 1)}>
                                <Typography key={Math.random() * (index + 1)}
                                            variant="caption"
                                            className={classes.title}
                                            color="textPrimary" >
                                    {item.titulo}
                                </Typography>
                                <Typography key={Math.random() * (index + 1)}
                                            variant="caption"
                                            className={classes.title}
                                            color="textPrimary"
                                            gutterBottom>
                                    Quantidade: {item.qtde}
                                </Typography>
                            </CCS.DescriptionWrapper>
                        )
                    })
                    :
                    <></>
                }
                {props.frete ?
                    <Typography  color="textPrimary" gutterBottom>
                        Frete: R$ {parseFloat(props.frete).toFixed(2)}
                    </Typography>
                    :
                    <></>
                }
                <Typography  color="textPrimary" gutterBottom>
                    Sub Total({props.qtdeTotal} itens): R$ {parseFloat(props.valorTotal).toFixed(2)}
                </Typography>
                {props.frete ?
                    <Typography  color="textPrimary" gutterBottom>
                        Total: R${(props.valorTotal + props.frete).toFixed(2)}
                    </Typography>
                    :
                    <Typography color="textPrimary" gutterBottom>
                        Total: R${(props.valorTotal).toFixed(2)}
                    </Typography>
                }


            </CardContent>

            <CardActions style={{justifyContent: 'center'}}>
                <Button disabled={props.disableButtom} variant="contained" color="primary" size="small"
                        onClick={props.salvar}>{props.buttomText}</Button>
            </CardActions>
        </Card>
    );
}
