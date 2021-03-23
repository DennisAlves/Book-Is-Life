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

export default function DadosCliente(props) {
    const classes = useStyles();

    return (
        <Card className={classes.root} style={{ margin: 4 }}>
            <CardContent>
                <Typography className={classes.title} color="textPrimary" gutterBottom>
                    Dados Do Cliente
                </Typography>
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
                        Email:
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="div" align="left">
                        {props.email}
                    </Typography>
                </Breadcrumbs>

                <Breadcrumbs separator={""}>
                    <Typography variant="body2" color="textPrimary" component="div" align="left">
                        Data De Nascimento:
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="div" align="left">
                        {props.dtNascimento}
                    </Typography>
                </Breadcrumbs>

                <Breadcrumbs separator={""}>
                    <Typography variant="body2" color="textPrimary" component="div" align="left">
                        Genero:
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="div" align="left">
                        {props.genero}
                    </Typography>
                </Breadcrumbs>

            </CardContent>
            <CardActions style={{justifyContent: 'center'}}>
                <Button size="small" variant="outlined" color="secondary" fullWidth={true}>Editar</Button>
            </CardActions>
        </Card>
    );
}
