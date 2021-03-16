import React from 'react';
import {createMuiTheme, makeStyles} from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`
const TitleWrapper = styled.div`

`
const BottomWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 100%;
`
const MuiTheme = createMuiTheme({
    typography: {
        allVariants: {
            color: 'White'
        }
    }
});
const useStyles = makeStyles({
    root: {
        minWidth: 275,
        minHeight: 180,
        margin: 12,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});
/**
 * CardInfo props
 * - topText
 * - midText
 * - bottomText
 */

export default function RedCardInfo(props) {
    const classes = useStyles();


    return (
        <Card className={classes.root} style={{backgroundColor: "#ff1b1c"}}>
            <CardContent>
                <Wrapper>
                    <ThemeProvider theme={MuiTheme}>
                        <TitleWrapper>
                            <Typography variant="h5" gutterBottom>
                                {props.topText}
                            </Typography>
                        </TitleWrapper>
                        <BottomWrapper>
                            <Typography variant="h3">
                                {props.midText}
                            </Typography>
                            <Typography variant="subtitle2" component="p">
                                {props.bottomText}
                            </Typography>
                        </BottomWrapper>
                    </ThemeProvider>
                </Wrapper>
            </CardContent>
        </Card>
    );
}
