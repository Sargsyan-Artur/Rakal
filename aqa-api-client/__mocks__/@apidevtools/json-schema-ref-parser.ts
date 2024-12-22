const $RefParser = jest.fn().mockReturnValue({
    dereference: jest.fn().mockImplementation(_schema => _schema),
});

export default $RefParser;
