import RandExp from 'randexp';

export function generateAlphabeticString(length = 10): string {
    return new RandExp(`[a-zA-Z]{${length}}`).gen();
}

export function generateNumericString(length = 10): string {
    return new RandExp(`[0-9]{${length}}`).gen();
}

export function generateAlphaNumericString(length = 10): string {
    if (length < 2) {
        throw new Error(`Alphanumeric string should have length more than 1`);
    }
    let generatedString = new RandExp(`[a-zA-Z0-9]{${length}}`).gen();
    if (/^[0-9]+$/y.test(generatedString)) {
        generatedString = generatedString.replace(generatedString.charAt(0), generateAlphabeticString(1));
    } else if (/^[a-zA-Z]+$/y.test(generatedString)) {
        generatedString = generatedString.replace(generatedString.charAt(0), generateNumericString(1));
    }
    return generatedString;
}
