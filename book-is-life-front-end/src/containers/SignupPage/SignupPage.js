import React, {Component} from "react";
import * as SPS from "./SignupPageStyles";
import {IconButton, InputAdornment, TextField} from "@material-ui/core";
import {connect} from "react-redux";
import {push} from "connected-react-router";
import {routes} from '../Router';
import Paper from '@material-ui/core/Paper';
import Button from "@material-ui/core/Button";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';


class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            signupUsername: "",
            passwordCheck: "",
            phone: "",
            showPassword: false,
            logradouro: "",
        };
    }

    handleFieldChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleMouseDownPassword = () => {
        if (!this.state.showPassword) {
            this.setState({showPassword: true});
        } else {
            this.setState({showPassword: false});
        }
    };


    render() {
        const {
            email,
            password,
            signupUsername,
            passwordCheck,
            showPassword,
            logradouro,
            cep,
            endereco,
            bairro,
            numero,
            complemento,

        } = this.state;
        const logradouroList = [
            "Aeroporto",
            "Alameda",
            "Área",
            "Avenida",
            "Campo",
            "Chácara",
            "Colônia",
            "Condomínio",
            "Conjunto",
            "Distrito",
            "Esplanada",
            "Estação",
            "Estrada",
            "Favela",
            "Feira",
            "Jardim",
            "Ladeira",
            "Lago",
            "Lagoa",
            "Largo",
            "Loteamento",
            "Morro",
            "Núcleo",
            "Parque",
            "Passarela",
            "Pátio",
            "Praça",
            "Quadra",
            "Recanto",
            "Residencial",
            "Rodovia",
            "Rua",
            "Setor",
            "Sítio",
            "Travessa",
            "Trecho",
            "Trevo",
            "Vale",
            "Vereda",
            "Via",
            "Viaduto",
            "Viela",
            "Vila"
        ];

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
                            inputProps={{
                                pattern: "[a-zA-Z.]{6,16}",
                                title: "O Nome precisa ter entre 6 e 16 caracteres alfanumericos."
                            }}
                            onChange={this.handleFieldChange}
                            name="signupUsername"
                            type="username"
                            label="Nome"
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
                            name="password"
                            label="Password"
                            required
                            value={password}
                            type={showPassword ? "text" : "password"}
                            onChange={this.handleFieldChange}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onMouseDown={this.handleMouseDownPassword}
                                            onMouseUp={this.handleMouseDownPassword}
                                        >
                                            {showPassword ? <Visibility/> : <VisibilityOff/>}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                                pattern: "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$",
                                title: "A senha precisa ter entre 6 e 16 caracteres alfanumericos.",
                                autoComplete: 'new-password',
                            }}

                        />

                        <TextField
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onMouseDown={this.handleMouseDownPassword}
                                            onMouseUp={this.handleMouseDownPassword}
                                        >
                                            {showPassword ? <Visibility/> : <VisibilityOff/>}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                                pattern: "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$",
                                title: "A senha precisa ter entre 6 e 16 caracteres alfanumericos.",
                                autoComplete: 'new-password',
                            }}
                            onChange={this.handleFieldChange}
                            name="passwordCheck"
                            type={showPassword ? "text" : "password"}
                            label="Password check"
                            required
                            error={this.state.password !== this.state.passwordCheck}
                            helperText={this.state.password !== this.state.passwordCheck ? "senhas divergentes" : ""}
                            value={passwordCheck}
                        />
                        <PhoneInput
                            inputProps={{
                                name: 'phone',
                                required: true,
                                autoFocus: false
                            }}
                            isValid={(value,) => {
                                if (value.length !== 13) {
                                    return 'numero invalido';
                                } else if (value.length !== 13) {
                                    return false;
                                } else {
                                    return true;
                                }
                            }}
                            country={'br'}
                            value={this.state.phone}
                            onChange={phone => this.setState({phone})}
                        />
                        <FormControl style={{minWidth: 120}}>
                            <InputLabel>Logradouro</InputLabel>
                            <Select
                                name="logradouro"
                                value={logradouro}
                                onChange={this.handleFieldChange}
                            >
                                {logradouroList.map(item => {
                                    return (
                                        <MenuItem value={item}>
                                            <li>{item}</li>
                                        </MenuItem>
                                    );
                                })}

                            </Select>
                        </FormControl>

                        <TextField
                            onChange={this.handleFieldChange}
                            name="cep"
                            type="text"
                            label="Cep"
                            required
                            value={cep}
                        />

                        <TextField
                            onChange={this.handleFieldChange}
                            name="endereco"
                            type="text"
                            label="Endereço"
                            required
                            value={endereco}
                        />

                        <TextField
                            onChange={this.handleFieldChange}
                            name="bairro"
                            type="text"
                            label="Bairro"
                            required
                            value={bairro}
                        />

                        <TextField
                            onChange={this.handleFieldChange}
                            name="numero"
                            type="number"
                            label="Numero"
                            required
                            value={numero}
                        />

                        <TextField
                            onChange={this.handleFieldChange}
                            name="complemento"
                            type="text"
                            label="Complemento"
                            required
                            value={complemento}
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
