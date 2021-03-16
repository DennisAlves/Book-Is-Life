import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import styled from "styled-components";


const AdressWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
`
const AdressButtonWrapper = styled.div`
  
`

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

export default function DadosEndereco(props) {
    const classes = useStyles();

    return (
        <Card className={classes.root} style={{margin: 4}}>
            <AdressWrapper>
                <CardContent>
                    <Typography className={classes.title} color="textPrimary" gutterBottom>
                        Endereco
                    </Typography>
                    <Breadcrumbs separator={""}>
                        <Typography variant="body2" color="textPrimary" component="div" align="left">
                            Descrição:
                        </Typography>
                        <Typography variant="body2" color="inherit" component="div" align="left">
                            {props.descricao}
                        </Typography>
                    </Breadcrumbs>

                    <Breadcrumbs separator={""}>
                        <Typography variant="body2" color="textPrimary" component="div" align="left">
                            Tipo De Endereço:
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="div" align="left">
                            {props.tipoEndereco}
                        </Typography>
                    </Breadcrumbs>

                    <Breadcrumbs separator={""}>
                        <Typography variant="body2" color="textPrimary" component="div" align="left">
                            Tipo De Residencia:
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="div" align="left">
                            {props.tipoResidencia}
                        </Typography>
                    </Breadcrumbs>

                    <Breadcrumbs separator={""}>
                        <Typography variant="body2" color="textPrimary" component="div" align="left">
                            Cep:
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="div" align="left">
                            {props.cep}
                        </Typography>
                    </Breadcrumbs>

                    <Breadcrumbs separator={""}>
                        <Typography variant="body2" color="textPrimary" component="div" align="left">
                            Logradouro:
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="div" align="left">
                            {props.logradouro}
                        </Typography>
                    </Breadcrumbs>

                    <Breadcrumbs separator={""}>
                        <Typography variant="body2" color="textPrimary" component="div" align="left">
                            Endereço:
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="div">
                            {props.endereco}
                        </Typography>

                        <Typography variant="body2" color="textPrimary" component="div" align="left">
                            Numero:
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="div" align="left">
                            {props.numero}
                        </Typography>
                    </Breadcrumbs>

                    <Breadcrumbs separator={""}>
                        <Typography variant="body2" color="textPrimary" component="div" align="left">
                            Bairro:
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="div" align="left">
                            {props.bairro}
                        </Typography>
                    </Breadcrumbs>

                    <Breadcrumbs separator={""}>
                        <Typography variant="body2" color="textPrimary" component="div" align="left">
                            Cidade:
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="div" align="left">
                            {props.cidade}
                        </Typography>
                    </Breadcrumbs>

                    <Breadcrumbs separator={""}>
                        <Typography variant="body2" color="textPrimary" component="div" align="left">
                            Uf:
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="div" align="left">
                            {props.uf}
                        </Typography>
                    </Breadcrumbs>
                </CardContent>
                <AdressButtonWrapper>
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
                </AdressButtonWrapper>
            </AdressWrapper>
        </Card>
    );
}
