const ajv = jest.fn().mockReturnValue({
    compile: jest.fn().mockReturnValue((body: { valid: boolean }) => body.valid),
});

export default ajv;
