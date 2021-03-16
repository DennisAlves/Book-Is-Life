import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';


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

export default function DadosCartao(props) {
    const classes = useStyles();

    return (
        <Card className={classes.root} style={{margin: 4}}>
            <CardContent>
                <Typography className={classes.title} color="textPrimary" gutterBottom>
                    Cartao
                </Typography>

                <Breadcrumbs separator={""}>
                    <Typography variant="body2" color="textPrimary" component="div" align="left">
                        Numero:
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="div" align="left">
                        {props.numero}
                    </Typography>
                </Breadcrumbs>

                <Breadcrumbs separator={""}>
                    <Typography variant="body2" color="textPrimary" component="div" align="left">
                        Nome:
                    </Typography>
                    <Typography variant="body2" color="inherit" component="div" align="left">
                        {props.nome}
                    </Typography>
                </Breadcrumbs>

                <Breadcrumbs separator={""}>
                    <Typography variant="body2" color="textPrimary" component="div" align="left">
                        Validade:
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="div" align="left">
                        {props.validade}
                    </Typography>
                    <Typography variant="body2" color="textPrimary" component="div" align="left">
                        Cvv:
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="div" align="left">
                        {props.cvv}
                    </Typography>
                </Breadcrumbs>

                <Breadcrumbs separator={""}>
                    <Typography variant="body2" color="textPrimary" component="div" align="left">
                        Bandeira:
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="div" align="left">
                        {props.bandeira}
                    </Typography>
                </Breadcrumbs>
            </CardContent>
            {props.botaoEnviar
                ?
                <CardActions style={{justifyContent: 'center', paddingBottom: 0}}>
                    <Button variant="outlined" color="primary" size="small" fullWidth={true}>Envie para esse
                        endereço</Button>
                </CardActions>
                :
                <></>
            }
            <CardActions style={{justifyContent: 'center'}}>
                <Button size="small" variant="outlined" color="secondary" fullWidth={true}>Editar</Button>
                <Button size="small" variant="outlined" color="secondary" fullWidth={true}>Excluir</Button>
            </CardActions>
        </Card>
    );
}
