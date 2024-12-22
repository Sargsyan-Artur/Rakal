const DELIMITERS = {
    memory: '#$',
    constants: '#$$',
};

export const memory = {
    set: jest.fn(),
    delete: jest.fn(),
    clear: jest.fn(),
};

export const parse = (key: string): string => {
    if (key.startsWith(DELIMITERS.constants)) {
        return 'value from constants';
    }
    if (key.startsWith(DELIMITERS.memory)) {
        return 'value from memory';
    }

    return key;
};
