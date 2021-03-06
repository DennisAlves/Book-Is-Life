import * as React from 'react';
import {connect} from "react-redux";
import {DataGrid, GridToolbarContainer, GridColumnsToolbarButton, GridFilterToolbarButton} from '@material-ui/data-grid';
import {Button} from "@material-ui/core";
import {setSelectedClienteIDAndPush} from "../../../Actions/index"


export function TableGridClientes(props) {

    function CustomToolbar() {
        return (
            <GridToolbarContainer>
                <GridColumnsToolbarButton />
                <GridFilterToolbarButton />
            </GridToolbarContainer>
        );
    }
    // noinspection JSAnnotator
    const columns = [
        {field: "",headerName:"",width: 120,
            renderCell: (params: CellParams) => {
                const onClick = () => {
                    // noinspection JSAnnotator
                    const api: GridApi = params.api;
                    const fields = api
                        .getAllColumns()
                        .map((c) => c.field);
                    const thisRow = {};
                    fields.forEach((f) => {
                        thisRow[f] = params.getValue(f);
                    });
                    props.goToClientePage({id:thisRow.id})
                };

                return <Button onClick={onClick}>Detalhes</Button>;
            }
        },
        {field: "id", headerName: "ID",width: 320,
        },
        {field: "dtCadastro",headerName: "Data de Cadastro",width: 170},
        {field: "nome", headerName: "Nome",width: 230},
        {field: "dtNascimento", headerName: "Data de Nascimento",width: 190},
        {field: "genero", headerName: "Genero",width: 230},
        {field: "email", headerName: "Email",width: 230},
        {field: "senha", headerName: "Senha",width: 230},
        {field: "tipoCliente", headerName: "Tipo de Cliente",width: 170},
        {field: "ativo", headerName: "Ativo",width: 100},
        {field: "qtdeEnderecos", headerName: "Quantidade de Endereços", type: 'number',width: 230},
        {field: "qtdeTelefone", headerName: "Quantidade de Telefones", type: 'number',width: 230},
        {field: "qtdeCartoes", headerName: "Quantidade de Cartões", type: 'number',width: 230},
        {field: "qtdeDocumentos", headerName: "Quantidade de Documentos", type: 'number',width: 230},

    ];

    return (
        <div style={{height: "100%", width: '100%'}}>
                <DataGrid
                    localeText={{
                        // Root
                        rootGridLabel: 'Grade',
                        noRowsLabel: 'Nenhuma linha',
                        errorOverlayDefaultLabel: 'Ocorreu um erro.',

                        // Density selector toolbar button text
                        toolbarDensity: 'Densidade',
                        toolbarDensityLabel: 'Densidade',
                        toolbarDensityCompact: 'Compacto',
                        toolbarDensityStandard: 'Padrão',
                        toolbarDensityComfortable: 'Confortável',

                        // Columns selector toolbar button text
                        toolbarColumns: 'Colunas',
                        toolbarColumnsLabel: 'Exibir seletor de colunas',

                        // Filters toolbar button text
                        toolbarFilters: 'Filtros',
                        toolbarFiltersLabel: 'Exibir filtros',
                        toolbarFiltersTooltipHide: 'Ocultar filtros',
                        toolbarFiltersTooltipShow: 'Exibir filtros',
                        toolbarFiltersTooltipActive: (count) =>
                            `${count} ${count !== 1 ? 'filtros' : 'filtro'} ${count !== 1 ? 'ativos' : 'ativo'}`,

                        // Columns panel text
                        columnsPanelTextFieldLabel: 'Localizar coluna',
                        columnsPanelTextFieldPlaceholder: 'Título da coluna',
                        columnsPanelDragIconLabel: 'Reordenar Coluna',
                        columnsPanelShowAllButton: 'Mostrar todas',
                        columnsPanelHideAllButton: 'Ocultar todas',

                        // Filter panel text
                        filterPanelAddFilter: 'Adicionar filtro',
                        filterPanelDeleteIconLabel: 'Excluir',
                        filterPanelOperators: 'Operadores',
                        filterPanelOperatorAnd: 'E',
                        filterPanelOperatorOr: 'Ou',
                        filterPanelColumns: 'Colunas',
                        filterPanelInputLabel: 'Valor',
                        filterPanelInputPlaceholder: 'Filtrar valor',

                        // Filter operators text
                        filterOperatorContains: 'contém',
                        filterOperatorEquals: 'é igual a',
                        filterOperatorStartsWith: 'começa com',
                        filterOperatorEndsWith: 'termina com',
                        filterOperatorIs: 'é',
                        filterOperatorNot: 'não é',
                        filterOperatorOnOrAfter: 'em ou após',
                        filterOperatorBefore: 'antes de',
                        filterOperatorOnOrBefore: 'em ou antes de',
                        filterOperatorAfter: 'após',

                        // Column menu text
                        columnMenuLabel: 'Menu',
                        columnMenuShowColumns: 'Exibir colunas',
                        columnMenuFilter: 'Filtrar',
                        columnMenuHideColumn: 'Ocultar',
                        columnMenuUnsort: 'Desfazer ordenação',
                        columnMenuSortAsc: 'Ordenar do menor para o maior',
                        columnMenuSortDesc: 'Ordenar do maior para o menor',

                        // Column header text
                        columnHeaderFiltersTooltipActive: (count) =>
                            `${count} ${count !== 1 ? 'filtros' : 'filtro'} ${count !== 1 ? 'ativos' : 'ativo'}`,
                        columnHeaderFiltersLabel: 'Exibir Filtros',
                        columnHeaderSortIconLabel: 'Ordenar',

                        // Rows selected footer text
                        footerRowSelected: (count) =>
                            count !== 1
                                ? `${count.toLocaleString()} linhas selecionadas`
                                : `${count.toLocaleString()} linha selecionada`,

                        // Total rows footer text
                        footerTotalRows: 'Total de linhas:',
                    }}
                    components={{Toolbar: CustomToolbar,}}
                    rows={props.rows} columns={columns} pageSize={8} />
        </div>
    );
}

function mapDispatchToProps(dispatch) {
    return {
        goToClientePage: (clienteID) => dispatch(setSelectedClienteIDAndPush(clienteID)),
    }
}

export default connect(null, mapDispatchToProps)(TableGridClientes)
