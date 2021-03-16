export default function CardValidation( name, number, expiry, cvc ) {

    return !!(
        name &&
        number &&
        expiry &&
        cvc
        );
}


