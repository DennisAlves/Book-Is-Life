import moment from "moment";
import {v4 as uuidv4} from 'uuid';
import axios from "axios";
import {generateCVV, generateExpiryDate, generatePAN} from "./CreditCardGenerator"

moment.locale('pt-br');

export default async function ClienteDataGenerator(qtde) {
    const nameList = ['Luke Skywalker',
        'C-3PO',
        'R2-D2',
        'Darth Vader',
        'Leia Organa',
        'Owen Lars',
        'Beru Whitesun lars',
        'R5-D4',
        'Biggs Darklighter',
        'Obi-Wan Kenobi',
        'Anakin Skywalker',
        'Wilhuff Tarkin',
        'Chewbacca',
        'Han Solo',
        'Greedo',
        'Jabba Desilijic Tiure',
        'Wedge Antilles',
        'Jek Tono Porkins',
        'Yoda',
        'Palpatine',
        'Boba Fett',
        'IG-88',
        'Bossk',
        'Lando Calrissian',
        'Lobot',
        'Ackbar',
        'Mon Mothma',
        'Arvel Crynyd',
        'Wicket Systri Warrick',
        'Nien Nunb',
        'Qui-Gon Jinn',
        'Nute Gunray',
        'Finis Valorum',
        'Padmé Amidala',
        'Jar Jar Binks',
        'Roos Tarpals',
        'Rugor Nass',
        'Ric Olié',
        'Watto',
        'Sebulba',
        'Quarsh Panaka',
        'Shmi Skywalker',
        'Darth Maul',
        'Bib Fortuna',
        'Ayla Secura',
        'Ratts Tyerel',
        'Dud Bolt',
        'Gasgano',
        'Ben Quadinaros',
        'Mace Windu',
        'Ki-Adi-Mundi',
        'Kit Fisto',
        'Eeth Koth',
        'Adi Gallia',
        'Saesee Tiin',
        'Yarael Poof',
        'Plo Koon',
        'Mas Amedda',
        'Gregar Typho',
        'Cordé',
        'Cliegg Lars',
        'Poggle the Lesser',
        'Luminara Unduli',
        'Barriss Offee',
        'Dormé',
        'Dooku',
        'Bail Prestor Organa',
        'Jango Fett',
        'Zam Wesell',
        'Dexter Jettster',
        'Lama Su',
        'Taun We',
        'Jocasta Nu',
        'R4-P17',
        'Wat Tambor',
        'San Hill',
        'Shaak Ti',
        'Grievous',
        'Tarfful',
        'Raymus Antilles',
        'Sly Moore',
        'Tion Medon',]
    const cepList = [
        "65042-660",
        "45650-262",
        "04183-040",
        "18045-200",
        "13181-000",
        "03360-040",
        "70772-000",
        "71575-250",
        "70770-704",
        "72620-122",
        "65090-707",
        "65066-883",
        "79310-410",
        "29210-400",
        "29313-327",
        "62258-000",
        "60326-160",
        "39800-186",
        "30850-400",
        "86600-248",
        "83327-020",
        "24420-400",
        "23812-020",
        "25240-430",
        "69901-411",
        "69912-058",
        "44054-456",
        "41342-738",
        "41385-745",
    ]
    const emailList = [
        "@gmail.com",
        "@outlook.com",
        "@bol.com",
    ]
    const generoList = [
        "Feminino",
        "Masculino",
        "Não Declarado",
    ]
    const cardList = [
        "visa",
        "mastercard"

    ]
    const descricaoList = [
        "minha casa",
        "casa da mamai",
        "trabalho",
        "casa da amante",
        "oto praneta",
        "esconderijo",
    ]
    const tipoEnderecoList = ["cobranca", "entrega"]
    const tipoResidencia = [
        "Casa",
        "Apartamento",
        "Residencial",
    ]
    const tipoTelefone = [
        "Residencial",
        "Recado",
        "Celular",
    ]
    const tipoCliente = "usuario"
    const clienteList = []

    function randomDate() {
        // noinspection JSValidateTypes
        return moment(new Date(+(new Date()) - Math.floor(Math.random() * 10000000000)))
            .format('YYYY-MM-DD');
    }

    function randomFullDate() {
        // noinspection JSValidateTypes
        return moment(new Date(+(new Date()) - Math.floor(Math.random() * 10000000000))).format('MM-DD-YYYY, hh:mm:ss')
    }

    async function handleCepFillUp(cepUnformated) {
        const cep = cepUnformated.replace(/[-_]/g, "")

        if (cep.length === 8) {
            const request = await axios.get(`https://viacep.com.br/ws/${cep}/json/`, {
                headers: {
                    "Content-Type": "application/json",
                }

            })

            return ({
                tipoLogradouro: request.data.logradouro.substr(0, request.data.logradouro.indexOf(" ")),
                logradouro: request.data.logradouro.substr(request.data.logradouro.indexOf(" ") + 1),
                bairro: request.data.bairro,
                cidade: request.data.localidade,
                uf: request.data.uf,
                cep: cep,
            })

        }
    }

    async function generateEndereco() {
        let adressList = []
        let randomAdressCount = Math.floor(Math.random() * 3)

        for (let i = 0; i < tipoEnderecoList.length; i++) {
            const endereco = {
                descricao: "",
                tipoEndereco: {
                    nomeTipo: tipoEnderecoList[i]
                },
                tipoLogradouro: {
                    nomeTipo: ""
                },
                tipoResidencia: {
                    nomeTipo: ""
                },
                endereco: "",
                numero: "",
                bairro: "",
                cep: "",
                cidade: {
                    nome: "",
                    estado: {
                        uf: "",
                    }
                },
                complemento: "",
                ativo: 1
            }
            let cepData = await handleCepFillUp(cepList[Math.floor(Math.random() * cepList.length)])
            endereco.descricao = descricaoList[Math.floor(Math.random() * descricaoList.length)]
            endereco.tipoLogradouro.nomeTipo = cepData.tipoLogradouro
            endereco.tipoResidencia.nomeTipo = tipoResidencia[Math.floor(Math.random() * tipoResidencia.length)]
            endereco.endereco = cepData.logradouro
            endereco.numero = Math.floor(Math.random() * 1000)
            endereco.bairro = cepData.bairro
            endereco.cidade.nome = cepData.cidade
            endereco.cidade.estado.uf = cepData.uf
            endereco.cep = cepData.cep
            adressList.push(endereco)
        }
        for (let i = 0; i < randomAdressCount; i++) {
            const endereco = {
                descricao: "",
                tipoEndereco: {
                    nomeTipo: ""
                },
                tipoLogradouro: {
                    nomeTipo: ""
                },
                tipoResidencia: {
                    nomeTipo: ""
                },
                endereco: "",
                numero: "",
                bairro: "",
                cep: "",
                cidade: {
                    nome: "",
                    estado: {
                        uf: "",
                    }
                },
                complemento: "",
                ativo: 1
            }
            let cepData = await handleCepFillUp(cepList[Math.floor(Math.random() * cepList.length)])
            endereco.descricao = descricaoList[Math.floor(Math.random() * descricaoList.length)]
            endereco.tipoEndereco.nomeTipo = tipoEnderecoList[Math.floor(Math.random() * tipoEnderecoList.length)]
            endereco.tipoLogradouro.nomeTipo = cepData.tipoLogradouro
            endereco.tipoResidencia.nomeTipo = tipoResidencia[Math.floor(Math.random() * tipoResidencia.length)]
            endereco.endereco = cepData.logradouro
            endereco.numero = Math.floor(Math.random() * 1000)
            endereco.bairro = cepData.bairro
            endereco.cidade.nome = cepData.cidade
            endereco.cidade.estado.uf = cepData.uf
            endereco.cep = cepData.cep
            adressList.push(endereco)
        }
        return adressList
    }

    function generateDocumento() {
        function randomiza(numero) {
            let ranNum = Math.round(Math.random() * numero);
            return ranNum;
        }

        function mod(dividendo, divisor) {
            return Math.round(dividendo - (Math.floor(dividendo / divisor) * divisor));
        }

        function gerarCPF() {
            const comPontos = true;
            let n = 9;
            let n1 = randomiza(n);
            let n2 = randomiza(n);
            let n3 = randomiza(n);
            let n4 = randomiza(n);
            let n5 = randomiza(n);
            let n6 = randomiza(n);
            let n7 = randomiza(n);
            let n8 = randomiza(n);
            let n9 = randomiza(n);
            let d1 = n9 * 2 + n8 * 3 + n7 * 4 + n6 * 5 + n5 * 6 + n4 * 7 + n3 * 8 + n2 * 9 + n1 * 10;
            d1 = 11 - (mod(d1, 11));
            if (d1 >= 10) {
                d1 = 0;
            }
            let d2 = d1 * 2 + n9 * 3 + n8 * 4 + n7 * 5 + n6 * 6 + n5 * 7 + n4 * 8 + n3 * 9 + n2 * 10 + n1 * 11;
            d2 = 11 - (mod(d2, 11));
            if (d2 >= 10) {
                d2 = 0;
            }

            if (comPontos) {
                const cpf = '' + n1 + n2 + n3 + '.' + n4 + n5 + n6 + '.' + n7 + n8 + n9 + '-' + d1 + d2;
                return cpf
            } else {
                const cpf = '' + n1 + n2 + n3 + n4 + n5 + n6 + n7 + n8 + n9 + d1 + d2;
                return cpf
            }

        }

        function gerarRG() {

            let n = 9;
            let n1 = randomiza(n);
            let n2 = randomiza(n);
            let n3 = randomiza(n);
            let n4 = randomiza(n);
            let n5 = randomiza(n);
            let n6 = randomiza(n);
            let n7 = randomiza(n);
            let n8 = randomiza(n);
            let n9 = randomiza(n);
            let rg = "" + n9 + n8 + n7 + n6 + n5 + n4 + n3 + n2 + n1 + ""

            return rg
        }

        function gerarCNH() {
            let n = 9;
            let n1 = randomiza(n);
            let n2 = randomiza(n);
            let n3 = randomiza(n);
            let n4 = randomiza(n);
            let n5 = randomiza(n);
            let n6 = randomiza(n);
            let n7 = randomiza(n);
            let n8 = randomiza(n);
            let n9 = randomiza(n);
            let n10 = randomiza(n);
            let n11 = randomiza(n);
            let cnh = "" + n11 + n10 + n9 + n8 + n7 + n6 + n5 + n4 + n3 + n2 + n1 + ""

            return cnh
        }

        return [
            {
                codigo: gerarCPF(),
                validade: randomDate(),
                tipoDocumento: {
                    "nome": "CPF"
                },
                "ativo": 1
            },
            {
                codigo: gerarRG(),
                validade: randomDate(),
                tipoDocumento: {
                    "nome": "RG"
                },
                "ativo": 1
            },
            {
                codigo: gerarCNH(),
                validade: randomDate(),
                tipoDocumento: {
                    "nome": "CNH"
                },
                "ativo": 1
            },
        ]
    }

    function generatePassword() {
        let length = 8,
            charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
            pass = "";
        for (let i = 0, n = charset.length; i < length; ++i) {
            pass += charset.charAt(Math.floor(Math.random() * n));
        }
        return pass;
    }

    function generateCartao() {
        let randomCardCount = Math.floor(Math.random() * 3)
        let cartoes = []
        for (let i = 0; i <= randomCardCount; i++) {
            let bandeira = cardList[Math.floor(Math.random() * cardList.length)]
            let cartao = {
                numero: "",
                nome: "",
                validade: "",
                cvv: "",
                bandeira: {
                    nome: ""
                },
                ativo: 1
            }
            cartao.numero = generatePAN(bandeira)
            cartao.nome = nameList[Math.floor(Math.random() * nameList.length)]
            cartao.cvv = generateCVV(bandeira)
            cartao.validade = generateExpiryDate()
            cartao.bandeira.nome = bandeira
            cartoes.push(cartao)
        }
        return cartoes
    }

    function generateTelefone() {
        let randomTelefoneCount = Math.floor(Math.random() * 3)
        const telefoneList = []

        function randomiza(numero) {
            let ranNum = Math.round(Math.random() * numero);
            return ranNum;
        }

        for (let i = 0; i <= randomTelefoneCount; i++) {
            let telefone = {
                ddd: "",
                numero: "",
                tipoTelefone: {
                    nomeTipo: ""
                }
            }
            if (tipoTelefone[Math.floor(Math.random() * tipoTelefone.length)] === "Celular") {
                let n = 9;
                let n1 = randomiza(n);
                let n2 = randomiza(n);
                let n3 = randomiza(n);
                let n4 = randomiza(n);
                let n5 = randomiza(n);
                let n6 = randomiza(n);
                let n7 = randomiza(n);
                let n8 = randomiza(n);
                let n9 = 9;
                let numero = "" + n9 + n8 + n7 + n6 + n5 + n4 + n3 + n2 + n1 + ""

                let d1 = randomiza(n);
                let d2 = randomiza(n);
                let ddd = "" + d2 + d1 + ""

                telefone.ddd = ddd
                telefone.numero = numero
                telefone.tipoTelefone.nomeTipo = "Celular"
            } else {
                let n = 9;
                let n1 = randomiza(n);
                let n2 = randomiza(n);
                let n3 = randomiza(n);
                let n4 = randomiza(n);
                let n5 = randomiza(n);
                let n6 = randomiza(n);
                let n7 = randomiza(n);
                let n8 = randomiza(n);
                let numero = "" + n8 + n7 + n6 + n5 + n4 + n3 + n2 + n1 + ""

                let d1 = randomiza(n);
                let d2 = randomiza(n);
                let ddd = "" + d2 + d1 + ""
                telefone.ddd = ddd
                telefone.numero = numero
                telefone.tipoTelefone.nomeTipo = tipoTelefone[Math.floor(Math.random() * tipoTelefone.length - 1)]
            }
            telefoneList.push(telefone)
        }
        return telefoneList
    }

    async function generateClientList() {
        for (let i = 0; i < qtde; i++) {
            let cliente = {
                id: "",
                dtCadastro: "",
                nome: "",
                dtNascimento: "",
                documentos: [],
                genero: {
                    name: ""
                },
                senha: "",
                email: "",
                enderecos: [],
                cartoes: [],
                telefones: [],
                tipoCliente: tipoCliente,
                ativo: 1
            }
            cliente.id = uuidv4()
            cliente.dtCadastro = randomFullDate()
            cliente.nome = nameList[Math.floor(Math.random() * nameList.length)]
            cliente.dtNascimento = randomDate()
            cliente.genero.name = generoList[Math.floor(Math.random() * generoList.length)]
            cliente.senha = generatePassword()
            cliente.email = cliente.nome.replace(" ", ".") + emailList[Math.floor(Math.random() * emailList.length)]
            cliente.documentos = generateDocumento()
            cliente.enderecos = await generateEndereco()
            cliente.cartoes = generateCartao()
            cliente.telefones = generateTelefone()
            clienteList.push(cliente)
        }
        return clienteList
    }

    generateClientList().then(r => console.log(r))
}

