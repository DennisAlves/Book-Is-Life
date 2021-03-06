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

export default function DadosTelefone(props) {
    const classes = useStyles();

    return (
        <Card className={classes.root} style={{ margin: 4 }}>
            <CardContent>
                <Typography className={classes.title} color="textPrimary" gutterBottom>
                    Telefone
                </Typography>
                <Breadcrumbs separator={""}>
                    <Typography variant="body2" color="textPrimary" component="div" align="left">
                        Tipo de Telefone:
                    </Typography>
                    <Typography variant="body2" color="inherit" component="div" align="left">
                        {props.tipoTelefone}
                    </Typography>
                </Breadcrumbs>

                <Breadcrumbs separator={""}>
                    <Typography variant="body2" color="textPrimary" component="div" align="left">
                        numero:
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="div" align="left">
                        {props.numero}
                    </Typography>
                </Breadcrumbs>


            </CardContent>
            <CardActions style={{justifyContent: 'center'}}>
                <Button size="small" variant="outlined" color="secondary" fullWidth={true}>Editar</Button>
                <Button size="small" variant="outlined" color="secondary" fullWidth={true}>Excluir</Button>
            </CardActions>
        </Card>
    );
}
