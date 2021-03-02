import React from "react";
import * as CDS from "../CadastroDocumento/CadastroDocumentoStyle";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {TextField} from "@material-ui/core";
import moment from "moment";


export default function DocumentoDataFields(props) {
    if (props.currentStep !== 2) {
        return null
    }
    const tipoDocumentoList = props.tipoDocumentoList

    return (
        <CDS.DocumentoWrapper>
            <CDS.DocumentoFieldsWrapper>
                <h5>Documento</h5>

                <FormControl style={{minWidth: 270}}>
                    <InputLabel>Documento</InputLabel>
                    <Select
                        name="tipoDocumento"
                        value={props.tipoDocumento}
                        onChange={props.handleFieldChange}
                        error={!props.tipoDocumento && props.tipoDocumento !== ""}
                    >
                        {tipoDocumentoList && tipoDocumentoList.map((item, index) => {
                            return (
                                <MenuItem key={index} value={item}>
                                    <div key={index}>{item}</div>
                                </MenuItem>
                            );
                        })}

                    </Select>
                </FormControl>
            <TextField style={{minWidth: 270}}
                       onChange={props.handleFieldChange}
                       name="codigo"
                       type="text"
                       label="Código"
                       required
                       value={props.codigo}
            />
            <TextField style={{minWidth: 270}}
                       onChange={props.handleFieldChange}
                       name="validade"
                       type="date"
                       label="validade"
                       value={props.validade}
                       required
                       error={props.validade !== "" && !moment().isSameOrAfter(props.validade)}
                       helperText={props.validade !== "" && !moment().isSameOrAfter(props.validade) ? "É nescessario uma data de validade valida." : ""}
                       InputLabelProps={{
                           shrink: true,
                       }}
                       InputProps={{inputProps: {max: moment().format('YYYY-MM-DD')}}}
            />
            </CDS.DocumentoFieldsWrapper>
        </CDS.DocumentoWrapper>
    )

}
