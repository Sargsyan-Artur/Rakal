export interface IPositiveTest<P> {
    readonly positive: P;
}

export interface INegativeTest {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    readonly negative: any;
}

export type TTestType<T> = IPositiveTest<T> | INegativeTest;

type TExpectedResponse<U> = {
    readonly body?: U;
    readonly statusCode?: number;
    readonly message?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    readonly [key: string]: any;
};

type TTestCaseBase<T, U = unknown> = {
    readonly tcId: number;
    readonly tcDesc: string;
    readonly headers?: Record<string, string>;
    readonly request: T;
    readonly response: TExpectedResponse<U>;
};

export type TTestCase<T, K extends 'positive' | 'negative' = 'positive', U = unknown> = K extends 'positive'
    ? TTestCaseBase<IPositiveTest<T>, U>
    : TTestCaseBase<INegativeTest>;
