import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import TextField from "@material-ui/core/TextField";
import RedCardInfo from "../DashboardData/InfoCards/RedCardInfo"
import BlueCardInfo from "../DashboardData/InfoCards/BlueCardInfo";
import OrangeCardInfo from "../DashboardData/InfoCards/OrangeCardInfo"
import GreenCardInfo from "../DashboardData/InfoCards/GreenCardInfo"
import YellowCardInfo from "../DashboardData/InfoCards/YellowCardInfo"
import styled from "styled-components";
import Chart from "./Chart"
import {TableGridVendas} from "../TableGrid/TableGridVendas";
import {TableGridEstoque} from "../TableGrid/TableGridEstoque";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-wrap: wrap;
`
const WrapperCard = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`
const ChartWrapper = styled.div`
  width: 270px;
  margin: 12px;
`
const GridWrapper = styled.div`
  width: 80vw;
  margin: 12px;
`


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
        minHeight: "100%",
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
        minWidth: "fit-content",
    },
}));
/**
 * Props AbasDadosDashboard
*redCardTopText
*redCardMidText
*redCardBottomText
*blueCardTopText
*blueCardMidText
*blueCardBottomText
*yellowCardTopText
*yellowCardMidText
*yellowCardBottomText
*orangeCardTopText
*orangeCardMidText
*orangeCardBottomText
*greenCardTopText
*greenCardMidText
*greenCardBottomText
*greenCardBottomText
*dataVendas
*rowsDataVendas
 */
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
                <Tab label="Fluxo de caixa" {...a11yProps(0)} />
                <Tab label="Vendas" {...a11yProps(1)} />
                <Tab label="Estoque" {...a11yProps(2)} />
                <Tab label="Devoluções" {...a11yProps(3)} />
                <Tab label="Clientes" {...a11yProps(5)} />
            </Tabs>
            <TabPanel value={value} index={0}>
                <Wrapper>
                    <WrapperCard>
                        <RedCardInfo
                            topText={props.redCardTopText}
                            midText={props.redCardMidText}
                            bottomText={props.redCardBottomText}
                        />
                        <GreenCardInfo
                            topText={props.redCardTopText}
                            midText={props.redCardMidText}
                            bottomText={props.redCardBottomText}
                        />
                        <OrangeCardInfo
                            topText={props.redCardTopText}
                            midText={props.redCardMidText}
                            bottomText={props.redCardBottomText}
                        />
                        <YellowCardInfo
                            topText={props.redCardTopText}
                            midText={props.redCardMidText}
                            bottomText={props.redCardBottomText}
                        />
                        <BlueCardInfo
                            topText={props.redCardTopText}
                            midText={props.redCardMidText}
                            bottomText={props.redCardBottomText}
                        />
                    </WrapperCard>
                    <ChartWrapper>
                        <Chart
                            data={props.dataVendas}
                        />
                    </ChartWrapper>
                </Wrapper>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <GridWrapper>
                    <TableGridVendas
                        rows={props.rowsDataVendas}
                    />
                </GridWrapper>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <GridWrapper>
                    <TableGridEstoque
                        rows={props.rowsDataEstoque}
                    />
                </GridWrapper>
            </TabPanel>
            <TabPanel value={value} index={3}>
                <TextField
                    value={"teste"}
                />
            </TabPanel>
            <TabPanel value={value} index={4}>
                <TextField
                    value={"teste"}
                />
            </TabPanel>
        </div>
    );
}


