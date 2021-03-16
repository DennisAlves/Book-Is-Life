import React from 'react';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import * as CIS from "./CartItemStyle"
import MuiMenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({

    formControl: {
        marginTop: theme.spacing(1),
        minWidth: 70,
    },
    selectEmpty: {
        marginTop: theme.spacing(1),
    },
}));
const MenuItem = withStyles({
    root: {
        justifyContent: "Center",
    }
})(MuiMenuItem);


export default function CartItem(props) {
    const classes = useStyles();

    const [qtde, setQtde] = React.useState(props.qtde);

    React.useEffect(() => {
        if (props.onChange) {
            props.onChange(qtde)
        }
    }, )
    const handleChange = (event) => {
        setQtde(event.target.value)
    }

    let qtdeEstoque = props.qtdeEstoque;

    const menuItem = () => {
        let arr = [];

        for (let i = 1; i <= qtdeEstoque; i++) {
            arr.push(<MenuItem style={{fontSize: 15}} key={i} value={i}> {i} </MenuItem>)
        }
        return arr;
    }
    return (

        <CIS.CartItemWrapper>
            <CardMedia
                style={{objectFit: 'contain', height: 160, width: 100, marginRight: 15}}
                component="img"
                alt={props.alt}
                image={props.image}
            />

            <CIS.CartItemMidWrapper>
                <CIS.CartItemTopWrapper>
                    <Typography gutterBottom variant="body2" component="p">
                        {props.titulo}
                    </Typography>
                    <CIS.CartItemPrice>
                        <Typography gutterBottom variant="body2" component="p">
                            R$ {props.valor}
                        </Typography>
                    </CIS.CartItemPrice>
                </CIS.CartItemTopWrapper>
                <Typography variant="caption" component="p">
                    {props.disponibilidade}
                </Typography>
                <Typography variant="caption" component="p">
                    {props.tipoCapa}
                </Typography>
                <FormControl className={classes.formControl} size="small">
                    <InputLabel>Qtde</InputLabel>
                    <Select
                        value={qtde}
                        onChange={handleChange}
                        autoWidth
                    >
                        {menuItem()}
                    </Select>
                </FormControl>
                <CIS.CartItemOptionsWrapper>
                    <Typography variant="caption" component="p">
                        Excluir
                    </Typography>
                    <Divider orientation="vertical" variant="middle" flexItem/>
                    <Typography variant="caption" component="p">
                        Salvar para mais tarde
                    </Typography>
                </CIS.CartItemOptionsWrapper>
            </CIS.CartItemMidWrapper>
        </CIS.CartItemWrapper>
    );
}
