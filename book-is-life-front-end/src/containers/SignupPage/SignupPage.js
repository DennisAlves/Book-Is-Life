import React, {Component} from "react";
import * as SPS from "./SignupPageStyles";
import TextField from "@material-ui/core/TextField";
import {connect} from "react-redux";
import {push} from "connected-react-router";
import {routes} from '../Router';
import Paper from '@material-ui/core/Paper';
import Button from "@material-ui/core/Button";

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            signupUsername:"",
            passwordCheck:"",
        };
    }


    handleFieldChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };


    render() {
        const {email, password, signupUsername,passwordCheck} = this.state;

        return (
            <>
                <SPS.MainDiv>
                    <Paper elevation={3}>
                        <SPS.CustomHeader>
                            <SPS.HomeLogo onClick={this.props.goToHomePage}><h3>aqui vai ficar o header</h3>
                            </SPS.HomeLogo>
                        </SPS.CustomHeader>
                    </Paper>

                    <SPS.SignupWrapper onSubmit={this.handleLogin}>
                        <h4>Dados para cadastro</h4>

                        <TextField
                            inputProps={{ pattern: "[a-zA-Z.]{6,16}", title:"O Username precisa ter entre 6 e 16 caracteres alfanumericos." }}
                            onChange={this.handleFieldChange}
                            name="signupUsername"
                            type="username"
                            label="Username"
                            value={signupUsername}
                            required
                        />

                        <TextField
                            onChange={this.handleFieldChange}
                            name="email"
                            type="email"
                            label="E-mail"
                            required
                            value={email}
                        />

                        <TextField
                            inputProps={{
                                pattern: "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$",
                                title: "A senha precisa ter entre 6 e 16 caracteres alfanumericos."
                            }}
                            onChange={this.handleFieldChange}
                            name="password"
                            type="password"
                            label="Password"
                            required
                            value={password}
                        />


                        <Button variant="contained" type="submit">Salvar</Button>

                    </SPS.SignupWrapper>

                </SPS.MainDiv>
                <Paper elevation={3}>
                    <SPS.Footer>
                        <h3>aqui vai ficar o footer</h3>
                    </SPS.Footer>
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
