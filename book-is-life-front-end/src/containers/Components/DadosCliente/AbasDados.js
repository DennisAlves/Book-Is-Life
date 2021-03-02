import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import DadosCliente from "./DadosCliente";
import DadosEndereco from "./DadosEndereco";
import DadosTelefone from "./DadosTelefone";
import DadosDocumento from "./DadosDocumento";
import DadosCartao from "./DadosCartao";


function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box m={1} display="flex" flexDirection="row">
                    {children}
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        height: "100%",
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
    },
}));

export default function AbasDados(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    return (
        <div className={classes.root}>
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                className={classes.tabs}
            >
                <Tab label="Dados Cliente" {...a11yProps(0)} />
                <Tab label="Endereços" {...a11yProps(1)} />
                <Tab label="Telefones" {...a11yProps(2)} />
                <Tab label="Documentos" {...a11yProps(3)} />
                <Tab label="Cartões" {...a11yProps(5)} />
            </Tabs>
            <TabPanel value={value} index={0}>
                <DadosCliente
                    nome={props.clienteNome}
                    email={props.clienteEmail}
                    dtNascimento={props.clienteDtNascimento}
                    genero={props.clienteGenero}
                    editarFunction={props.editar}
                />
            </TabPanel>
            <TabPanel value={value} index={1}>
                {props.data.enderecos && props.data.enderecos.map((clienteData, index) =>
                    <DadosEndereco key={index}
                                   descricao={clienteData.descricao}
                                   tipoEndereco={clienteData.tipoEndereco.nomeTipo}
                                   tipoResidencia={clienteData.tipoResidencia.nomeTipo}
                                   cep={clienteData.cep}
                                   logradouro={clienteData.tipoLogradouro.nomeTipo}
                                   endereco={clienteData.endereco}
                                   numero={clienteData.numero}
                                   bairro={clienteData.bairro}
                                   cidade={clienteData.cidade.nome}
                                   uf={clienteData.cidade.estado.uf}
                    />)}

            </TabPanel>
            <TabPanel value={value} index={2}>
                {props.clienteDataTelefone && props.clienteDataTelefone.map((clienteData, index) =>
                    <DadosTelefone key={index}
                                   tipoTelefone={clienteData.tipoTelefone.nomeTipo}
                                   numero={"(" + clienteData.ddd + ")" + clienteData.numero}
                    />)}
            </TabPanel>
            <TabPanel value={value} index={3}>
                {props.clienteDataDocumento && props.clienteDataDocumento.map((clienteData, index) =>
                    <DadosDocumento key={index}
                        tipoDocumento={clienteData.tipoDocumento.nome}
                        codigo={clienteData.codigo}
                        validade={clienteData.validade}
                    />)}

            </TabPanel>
            <TabPanel value={value} index={4}>
                {props.clienteDataCartao && props.clienteDataCartao.map((clienteData, index) =>
                    <DadosCartao key={index}
                                 numero={clienteData.numero}
                                 nome={clienteData.nome}
                                 validade={clienteData.validade}
                                 cvv={clienteData.cvv}
                                 bandeira={clienteData.bandeira.nome}

                    />)}
            </TabPanel>
        </div>
    );
}


