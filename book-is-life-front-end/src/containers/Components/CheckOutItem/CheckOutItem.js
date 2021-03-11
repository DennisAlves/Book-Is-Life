import React from 'react';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import * as COS from "./CheckOutItemStyle"
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


export default function CheckOutItem(props) {
    const classes = useStyles();

    const [qtde, setQtde] = React.useState('');

    const handleChange = (event) => {
        setQtde(event.target.value);
    };

    let qtdeItem = props.qtdeItem;

    const menuItem = () => {
        let arr = [];

        for (let i = 1; i <= qtdeItem; i++) {
            arr.push(<MenuItem style={{fontSize: 15}} key={i} value={i}> {i} </MenuItem>)
        }
        return arr;
    }
    return (

            <COS.CheckOutItemWrapper>
                <CardMedia
                    style={{objectFit: 'contain', height: 160, width: 100, marginRight:15}}
                    component="img"
                    alt={props.alt}
                    image={props.image}
                />

                    <COS.CheckOutItemMidWrapper>
                        <COS.CheckOutItemTopWrapper>
                            <Typography gutterBottom variant="body2" component="p">
                                {props.titulo}
                            </Typography>
                            <COS.CheckOutItemPrice>
                                <Typography gutterBottom variant="body2" component="p">
                                    R$ {props.valor}
                                </Typography>
                            </COS.CheckOutItemPrice>
                        </COS.CheckOutItemTopWrapper>
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
                            >
                                {menuItem()}
                            </Select>
                        </FormControl>
                        <COS.CheckOutItemOptionsWrapper>
                            <Typography variant="caption" component="p">
                                Excluir
                            </Typography>
                            <Divider orientation="vertical"  variant="middle" flexItem/>
                            <Typography variant="caption" component="p">
                                Salvar para mais tarde
                            </Typography>
                        </COS.CheckOutItemOptionsWrapper>
                    </COS.CheckOutItemMidWrapper>
            </COS.CheckOutItemWrapper>
    );
}
