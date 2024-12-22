export const logger = {
    warn: jest.fn(),
    info: jest.fn(),
    error: jest.fn(),
    debug: jest.fn(),
};

export default function Logger(_name: string): typeof logger {
    return logger;
}
