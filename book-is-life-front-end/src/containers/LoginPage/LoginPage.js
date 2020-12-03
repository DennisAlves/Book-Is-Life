import React, {Component} from "react";
import * as LPS from "./LoginPageStyles";
import TextField from "@material-ui/core/TextField";
import {connect} from "react-redux";
import {push} from "connected-react-router";
import {routes} from '../Router';
import Paper from '@material-ui/core/Paper';
import Button from "@material-ui/core/Button";
import {Typography} from '@material-ui/core';
import Link from '@material-ui/core/Link';


class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
        };
    }


    handleFieldChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };


    render() {
        const {email, password} = this.state;

        return (
            <>
                <LPS.MainDiv>
                    <Paper elevation={3}>
                        <LPS.CustomHeader>
                            <LPS.HomeLogo onClick={this.props.goToHomePage}><h3>aqui vai ficar o header</h3>
                            </LPS.HomeLogo>
                        </LPS.CustomHeader>
                    </Paper>

                    <LPS.LoginWrapper onSubmit={this.handleLogin}>
                        <h4>Já criou uma conta? Entre aqui!</h4>

                        <TextField
                            onChange={this.handleFieldChange}
                            name="email"
                            type="email"
                            label="E-mail"
                            required
                            value={email}
                        />

                        <TextField
                            onChange={this.handleFieldChange}
                            name="password"
                            type="password"
                            label="Password"
                            required
                            value={password}
                        />

                        <Button variant="contained" type="submit">Login</Button>

                        <LPS.SignupWrapper>
                            <Typography>
                                Não tem uma conta? Entre
                            </Typography>
                            <Typography style={{marginLeft:4}}>
                                <Link onClick={this.props.goToSignupPage}>
                                    Aqui
                                </Link>
                            </Typography>
                        </LPS.SignupWrapper>

                    </LPS.LoginWrapper>

                </LPS.MainDiv>
                <Paper elevation={3}>
                    <LPS.Footer>
                        <h3>aqui vai ficar o footer</h3>
                    </LPS.Footer>
                </Paper>
            </>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        goToHomePage: () => dispatch(push(routes.HomePage)),
        goToSignupPage: () => dispatch(push(routes.SignupPage)),
    }
}

export default connect(null, mapDispatchToProps)(LoginPage)
