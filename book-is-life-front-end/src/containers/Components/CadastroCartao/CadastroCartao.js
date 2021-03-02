import React from 'react';
import * as CCS from "../../Components/CadastroCartao/CadastroCartaoStyles";
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import InputMask from "react-input-mask";


export default function CrediCardDataFields(props) {


    if (props.currentStep !== 4) {
        return null
    }
    return (
        <CCS.CreditCardWrapper>
            <Cards
                locale={{valid: "Valido até"}}
                placeholders={{name: "Nome"}}
                cvc={props.cvc}
                expiry={props.expiry}
                focused={props.focused}
                name={props.name}
                number={props.number}
                callback={props.handleCallback}
            />
            <CCS.CreditCardFieldsWrapper>

                <CCS.CreditCardLineWrapper>
                    <InputMask
                        mask={"9999.9999.9999.9999"}
                        onKeyUp={props.handleInputChange}
                        onFocus={props.handleInputFocus}
                    >
                        <input
                            type="tel"
                            name="number"
                            placeholder="Numero do Cartão *"
                            required
                        />

                    </InputMask>

                    {!props.cardNumberValidation && props.number !== ""?
                        <CCS.CreditCardErrorMsg>
                            Numero Inválido
                        </CCS.CreditCardErrorMsg>
                        :
                        ""
                    }

                </CCS.CreditCardLineWrapper>


                <CCS.CreditCardLineWrapper>
                    <input
                        type="text"
                        name="name"
                        placeholder="Nome *"
                        onKeyUp={props.handleInputChange}
                        onFocus={props.handleInputFocus}
                        required
                    />
                    {!props.cardNameValidation && props.name !== ""?
                        <CCS.CreditCardErrorMsg>
                            Nome Inválido
                        </CCS.CreditCardErrorMsg>
                        :
                        ""
                    }
                </CCS.CreditCardLineWrapper>


                <CCS.CreditCardLineWrapper>
                    <InputMask
                        mask={"99/99"}
                        onKeyUp={props.handleInputChange}
                        onFocus={props.handleInputFocus}
                    >
                        <input
                            type="tel"
                            name="expiry"
                            placeholder="MM/AA *"
                            onKeyUp={props.handleInputChange}
                            onFocus={props.handleInputFocus}
                            required
                        />
                    </InputMask>
                </CCS.CreditCardLineWrapper>


                <CCS.CreditCardLineWrapper>
                    <InputMask
                        mask={"999"}
                        onKeyUp={props.handleInputChange}
                        onFocus={props.handleInputFocus}
                    >
                        <input
                            type="tel"
                            name="cvc"
                            placeholder="CVC *"
                            onKeyUp={props.handleInputChange}
                            onFocus={props.handleInputFocus}
                            required
                        />
                    </InputMask>
                </CCS.CreditCardLineWrapper>

            </CCS.CreditCardFieldsWrapper>
        </CCS.CreditCardWrapper>
    )
}