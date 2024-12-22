import { TRandomStringType } from '../types';

export function getRandomString(count = 10, type: TRandomStringType = 'alphanumeric'): string {
    const characters = {
        alphabetic: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
        numeric: '0123456789',
    };
    let result = '';
    let substring = '';

    switch (type) {
        case 'alphabetic':
            substring = characters.alphabetic;
            break;
        case 'numeric':
            substring = characters.numeric;
            break;
        case 'alphanumeric':
            substring = characters.alphabetic + characters.numeric;
            break;
        default:
            throw new Error(`Undefined random string type ${type}`);
    }

    for (let i = 0; i < count; i++) {
        result += substring.charAt(Math.floor(Math.random() * substring.length));
    }

    return result;
}
