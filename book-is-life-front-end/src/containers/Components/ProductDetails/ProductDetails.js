import React from 'react';
import * as PD from "./ProductDetailsStyles"
import {makeStyles, withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MuiMenuItem from "@material-ui/core/MenuItem";


const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 140,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));
const MenuItem = withStyles({
    root: {
        justifyContent: "Center",
    }
})(MuiMenuItem);

/**
 *
 * @param props {image,titulo,autor,descricao,editora,lancamento,edicao,idioma
,tipoCapa,numeroPaginas,isbn10,isbn13,largura,altura,profundidade,peso,valor
,frete,qtdeItem,ativo}
 * @returns
 * @constructor
 */
export default function ProductDetails(props) {

    const classes = useStyles();

    const [qtde, setQtde] = React.useState(props.qtdeCarrinho ? props.qtdeCarrinho : "");

    const handleChange = (event) => {
        setQtde(event.target.value);
    };
    let qtdeItem = props.qtdeItem;
    const menuItem = () => {
        let arr = [];

        for (let i = 1; i <= qtdeItem; i++) {
            arr.push(<MenuItem key={i} value={i}> {i} </MenuItem>)
        }
        return arr;
    }
    return (
        <PD.ProductDetailsMainDiv>
            <PD.ProductDetailsImageDiv src={props.image}/>
            <PD.ProductDetails>
                <PD.ProductDetailsContentDiv>
                    <Typography variant="h3" color="textPrimary" gutterBottom>
                        {props.titulo}
                    </Typography>
                    <Typography variant="h6" color="textPrimary" gutterBottom>
                        Autor: {props.autor}
                    </Typography>

                    <Typography variant="subtitle1" color="textPrimary" style={{marginTop: 15}} align="left"
                                gutterBottom>
                        Descrição: {props.descricao}
                    </Typography>
                </PD.ProductDetailsContentDiv>

                <PD.ProductDetailsInfoDiv>
                    <Typography variant="subtitle1" color="textPrimary" align="left" gutterBottom>
                        Editora : {props.editora}
                    </Typography>
                    <Typography variant="subtitle1" color="textPrimary" align="left" gutterBottom>
                        Lançamento : {props.lancamento}
                    </Typography>
                    <Typography variant="subtitle1" color="textPrimary" align="left" gutterBottom>
                        Edição : {props.edicao}
                    </Typography>
                    <Typography variant="subtitle1" color="textPrimary" align="left" gutterBottom>
                        Idioma : {props.idioma}
                    </Typography>
                    <Typography variant="subtitle1" color="textPrimary" align="left" gutterBottom>
                        Capa {props.tipoCapa} : {props.numeroPaginas} páginas
                    </Typography>
                    <Typography variant="subtitle1" color="textPrimary" align="left" gutterBottom>
                        ISBN-10 : {props.isbn10}
                    </Typography>
                    <Typography variant="subtitle1" color="textPrimary" align="left" gutterBottom>
                        ISBN-13 : {props.isbn13}
                    </Typography>
                    <Typography variant="subtitle1" color="textPrimary" align="left" gutterBottom>
                        Dimensões : Largura: {props.largura} cm Altura: {props.altura} cm
                        Profundidade: {props.profundidade} cm
                    </Typography>
                    <Typography variant="subtitle1" color="textPrimary" align="left" gutterBottom>
                        Peso: {props.peso}Kg
                    </Typography>
                </PD.ProductDetailsInfoDiv>
            </PD.ProductDetails>

            <PD.ProductDetailsCardDiv>
                <Card>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>
                           Valor unitario: R${(props.valor).toFixed(2)}
                        </Typography>
                        <Typography variant="h5" component="h2">
                        </Typography>
                        <Typography color="textSecondary">
                            {props.ativo ?
                                "Em Estoque"
                                :
                                "Sem Estoque"
                            }

                        </Typography>
                        <Typography variant="subtitle1" color="textPrimary" gutterBottom>
                            Frete: R${props.frete}
                        </Typography>

                        {qtde > 0 ?
                            <Typography color="textSecondary" gutterBottom>
                                Total: R${((props.valor * qtde)+props.frete).toFixed(2)}
                            </Typography>
                            :
                            ""
                        }
                        <FormControl className={classes.formControl} variant="outlined">
                            <InputLabel>Quantidade</InputLabel>
                            <Select
                                disabled={!props.ativo}
                                value={qtde}
                                onChange={handleChange}
                                label="quantidade"
                            >
                                {menuItem()}

                            </Select>
                        </FormControl>

                    </CardContent>
                    <CardActions align="center">
                        <Button disabled={!props.ativo} size="small">Adicionar ao Carrinho</Button>
                    </CardActions>
                </Card>
            </PD.ProductDetailsCardDiv>

        </PD.ProductDetailsMainDiv>
    );
}
