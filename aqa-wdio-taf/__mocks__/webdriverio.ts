const elemFn = {
    click: jest.fn(),
    getText: jest.fn(),
};

const elem = jest.fn().mockReturnValue({
    ...elemFn,
    $: jest.fn().mockReturnValue({
        ...elemFn,
        $: jest.fn().mockReturnValue({
            ...elemFn,
            $: jest.fn().mockReturnValue('$.$.$.$'),
            $$: jest.fn().mockReturnValue(['$.$.$.$$']),
        }),
        $$: jest.fn().mockReturnValue([
            {
                ...elemFn,
                $: jest.fn().mockReturnValue(undefined), // $.$.$$[0].$
                $$: jest.fn().mockReturnValue([]), // $.$.$$[0].$$
            },
        ]),
    }),
    $$: jest.fn().mockImplementation((selector: string) => {
        if (selector === 'first text/value selector') {
            return [
                {
                    value: 'first text/value example',
                    getText: jest.fn().mockReturnValue('first text example'),
                    getValue: jest.fn().mockReturnValue('first value example'),
                },
                {
                    value: 'second text/value example',
                    getText: jest.fn().mockReturnValue('second text example'),
                    getValue: jest.fn().mockReturnValue('second value example'),
                },
            ];
        }

        if (selector === 'collection > text') {
            return [
                {
                    $$: jest.fn().mockReturnValue([
                        {
                            value: '$.$$[0].$$ (collection > text)',
                            getText: jest.fn().mockReturnValue('$.$$[0].$$ (collection > text)'),
                        },
                    ]),
                },
            ];
        }

        if (selector === 'no results') {
            return [
                {
                    $$: jest.fn().mockReturnValue([]),
                },
            ];
        }

        return [
            {
                ...elemFn,
                $: jest.fn().mockReturnValue('$.$$[0].$'),
            },
            {
                $$: jest.fn().mockReturnValue([
                    {
                        ...elemFn,
                        $: jest.fn().mockReturnValue('$.$$[1].$$[0].$'),
                        $$: jest.fn().mockReturnValue(['$.$$[1].$$[0].$$']),
                    },
                ]),
            },
        ];
    }),
});

const elems = jest.fn().mockImplementation((selector: string) => {
    if (selector === 'row text selector') {
        return [
            {
                value: 'row text example',
                getText: jest.fn().mockReturnValue('row text example'),
            },
        ];
    }

    return [
        {
            $: jest.fn().mockReturnValue({
                ...elemFn,
                $: jest.fn().mockReturnValue({
                    ...elemFn,
                    $: jest.fn().mockReturnValue('$$[0].$.$.$'),
                }),
                $$: jest.fn().mockReturnValue([
                    {
                        ...elemFn,
                        $: jest.fn().mockReturnValue('$$[0].$.$$[0].$'),
                    },
                ]),
            }),
            $$: jest.fn().mockReturnValue([
                {
                    $: jest.fn().mockReturnValue({
                        ...elemFn,
                        $: jest.fn().mockReturnValue('$$[0].$$[0].$.$'),
                    }),
                },
                {
                    $$: jest.fn().mockReturnValue([
                        {
                            ...elemFn,
                            $: jest.fn().mockReturnValue('$$[0].$$[1].$$[0].$'),
                            $$: jest.fn().mockReturnValue(['$$[0].$$[1].$$[0].$$']),
                        },
                    ]),
                },
            ]),
        },
    ];
});

Object.assign(
    global,
    {
        browser: {
            pause: jest.fn(),
            keys: jest.fn(),
            url: jest.fn(),
            newWindow: jest.fn(),
            back: jest.fn(),
            forward: jest.fn(),
            refresh: jest.fn(),
            switchWindow: jest.fn(),
        },
    },
    {
        $: elem,
    },
    {
        $$: elems,
    },
);
