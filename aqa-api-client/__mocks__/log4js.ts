export const logger = {
    warn: jest.fn(),
    info: jest.fn(),
    error: jest.fn(),
    debug: jest.fn(),
};

export function getLogger(_name: string): typeof logger {
    return logger;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function configure(_config: any): jest.Mock {
    return jest.fn();
}
