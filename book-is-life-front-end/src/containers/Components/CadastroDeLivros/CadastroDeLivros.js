import React from "react";
import * as CDS from "../CadastroDeLivros/cadastroDeLivrosStyles";
import {TextField} from "@material-ui/core";
import moment from 'moment'
import 'moment/locale/fr';
import Button from '@material-ui/core/Button';
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    input: {
        display: 'none',
    },
}));

export default function AddBookFields(props) {
    const classes = useStyles();
    moment.locale('pt-br');

    return (
        <CDS.AddBookWrapper>
            <CDS.AddBookFieldsWrapper>

                <TextField
                    onChange={props.handleFieldChange}
                    name="titulo"
                    type="text"
                    label="Titulo"
                    required
                    value={props.titulo.replace(/\d+/g, "")}
                    error={!/^([a-zA-Z][\W ]{3,})$/.test(props.titulo) && props.titulo !== ""}
                    helperText={!/^([a-zA-Z][\W ]{3,})$/.test(props.titulo) && props.titulo !== "" ? "o titulo deve ter pelo menos 4 letras." : ""}
                />

                <TextField
                    onChange={props.handleFieldChange}
                    name="autor"
                    type="text"
                    label="Autor"
                    required
                    value={props.autor}
                    error={!/^([a-zA-Z][/\W+/g]{3,})$/.test(props.autor) && props.autor !== ""}
                    helperText={!/^([a-zA-Z][\w ]{3,})$/.test(props.autor) && props.autor !== "" ? "o autor deve ter pelo menos 4 letras." : ""}
                />


                <TextField style={{minWidth: 270}}
                           onChange={props.handleFieldChange}
                           name="lancamento"
                           type="date"
                           label="Data de lançamento"
                           value={props.lancamento}
                           required
                           error={props.lancamento !== "" && !moment().isSameOrAfter(props.lancamento)}
                           helperText={props.lancamento !== "" && !moment().isSameOrAfter(props.lancamento) ? "É nescessario uma data de lançamento valida." : ""}
                           InputLabelProps={{
                               shrink: true,
                           }}
                           InputProps={{inputProps: {max: moment().format('YYYY-MM-DD')}}}
                />
                <TextField
                    onChange={props.handleFieldChange}
                    name="edicao"
                    type="number"
                    label="Edição"
                    required
                    value={props.edicao}
                    error={props.edicao <= 0 && props.edicao !== ""}
                    helperText={props.edicao <= 0 && props.edicao !== "" ? "a edição deve ser maior que zero." : ""}
                />
                <TextField
                    onChange={props.handleFieldChange}
                    name="idioma"
                    type="text"
                    label="Idioma"
                    required
                    value={props.idioma}
                    error={!/^([a-zA-Z][\w ]{3,})$/.test(props.idioma) && props.idioma !== ""}
                    helperText={!/^([a-zA-Z][\w ]{3,})$/.test(props.idioma) && props.idioma !== "" ? "o idioma deve ter pelo menos 4 letras." : ""}
                />

                <TextField
                    onChange={props.handleFieldChange}
                    name="tipoCapa"
                    type="text"
                    label="Tipo de Capa"
                    required
                    value={props.tipoCapa}
                    error={!/^([a-zA-Z][\w ]{3,})$/.test(props.tipoCapa) && props.tipoCapa !== ""}
                    helperText={!/^([a-zA-Z][\w ]{3,})$/.test(props.tipoCapa) && props.tipoCapa !== "" ? "o tipo de capa deve ter pelo menos 4 letras." : ""}
                />
                <TextField
                    onChange={props.handleFieldChange}
                    name="numeroPaginas"
                    type="number"
                    label="Numero de Paginas"
                    required
                    value={props.numeroPaginas}
                    error={props.numeroPaginas <= 0 && props.numeroPaginas !== ""}
                    helperText={props.numeroPaginas <= 0 && props.numeroPaginas !== "" ? "o numero de paginas deve ser maior que zero." : ""}
                />
            </CDS.AddBookFieldsWrapper>
            <CDS.AddBookFieldsWrapper>
                <TextField
                    onChange={props.handleFieldChange}
                    name="isbn10"
                    type="text"
                    label="ISBN10"
                    required
                    value={props.isbn10}
                    //error={!/^([a-zA-Z][\w ]{3,})$/.test(props.isbn10) && props.isbn10 !== ""}
                    //helperText={!/^([a-zA-Z][\w ]{3,})$/.test(props.isbn10) && props.isbn10 !== "" ? "o isbn10 de capa deve ter pelo menos 4 letras." : ""}
                />
                <TextField
                    onChange={props.handleFieldChange}
                    name="isbn13"
                    type="text"
                    label="ISBN13"
                    required
                    value={props.isbn13}
                    //error={!/^([a-zA-Z][\w ]{3,})$/.test(props.tipoCapa) && props.tipoCapa !== ""}
                    //helperText={!/^([a-zA-Z][\w ]{3,})$/.test(props.tipoCapa) && props.tipoCapa !== "" ? "o tipo de capa deve ter pelo menos 4 letras." : ""}
                />
                <TextField
                    onChange={props.handleFieldChange}
                    name="largura"
                    type="number"
                    label="Largura"
                    required
                    value={props.largura}
                    error={props.largura <= 0 && props.largura !== ""}
                    helperText={props.largura <= 0 && props.largura !== "" ? "a lagura deve ser maior que zero." : ""}
                />
                <TextField
                    onChange={props.handleFieldChange}
                    name="altura"
                    type="number"
                    label="Altura"
                    required
                    value={props.altura}
                    error={props.altura <= 0 && props.altura !== ""}
                    helperText={props.altura <= 0 && props.altura !== "" ? "a altura deve ser maior que zero." : ""}
                />
                <TextField
                    onChange={props.handleFieldChange}
                    name="profundidade"
                    type="number"
                    label="Profundidade"
                    required
                    value={props.profundidade}
                    error={props.profundidade <= 0 && props.profundidade !== ""}
                    helperText={props.profundidade <= 0 && props.profundidade !== "" ? "a profundidade deve ser maior que zero." : ""}
                />
                <TextField
                    onChange={props.handleFieldChange}
                    name="peso"
                    type="number"
                    label="Peso"
                    required
                    value={props.peso}
                    error={props.peso <= 0 && props.peso !== ""}
                    helperText={props.peso <= 0 && props.peso !== "" ? "a profundidade deve ser maior que zero." : ""}
                />
                <TextField
                    onChange={props.handleFieldChange}
                    name="valor"
                    type="number"
                    label="Valor"
                    required
                    value={props.valor}
                    error={props.valor <= 0 && props.valor !== ""}
                    helperText={props.valor <= 0 && props.valor !== "" ? "o valor deve ser maior que zero." : ""}
                />
                <TextField
                    onChange={props.handleFieldChange}
                    name="qtde"
                    type="number"
                    label="Quantidade"
                    required
                    value={props.qtde}
                    error={props.qtde <= 0 && props.qtde !== ""}
                    helperText={props.qtde <= 0 && props.qtde !== "" ? "o valor deve ser maior que zero." : ""}
                />
            </CDS.AddBookFieldsWrapper>
            <CDS.AddBookFieldsWrapper>
                <TextField
                    style={{minWidth: 270}}
                    onChange={props.handleFieldChange}
                    name="sinopse"
                    type="text"
                    label="Sinopse"
                    multiline
                    rowsMax={6}
                    required
                    value={props.sinopse}
                    error={!/^([a-zA-Z][\w ]{3,})$/.test(props.sinopse) && props.sinopse !== ""}
                    helperText={!/^([a-zA-Z][\w ]{3,})$/.test(props.sinopse) && props.sinopse !== "" ? "a sinopse deve ter pelo menos 4 letras." : ""}
                />
                <CDS.AddBookButtonWrapper className={classes.root}>
                    <Button variant="contained" color="primary" component="span" onClick={props.salvar}>Salvar</Button>
                </CDS.AddBookButtonWrapper>

            </CDS.AddBookFieldsWrapper>
        </CDS.AddBookWrapper>
    )

}
