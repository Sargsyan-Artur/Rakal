/// <reference types="@wdio/cucumber-framework" />

declare module '@wdio/cucumber-framework' {
    export const countMatchingDefinition: (type: 'Given' | 'When' | 'Then', step: string) => number;
    export const getMatchingDefinition: (type: 'Given' | 'When' | 'Then', step: string) => StepFunction;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type StepFunction = (...args: any[]) => any | Promise<any>;

interface SourceLocation {
    line: number;
    uri: string;
}

interface ScenarioResult {
    duration: number;
    status: Status;
}

enum Status {
    AMBIGUOUS = 'ambiguous',
    FAILED = 'failed',
    PASSED = 'passed',
    PENDING = 'pending',
    SKIPPED = 'skipped',
    UNDEFINED = 'undefined',
}

interface CallbackStepDefinition {
    // eslint-disable-next-line @typescript-eslint/method-signature-style, @typescript-eslint/no-explicit-any
    pending(): PromiseLike<any>;

    // eslint-disable-next-line @typescript-eslint/method-signature-style, @typescript-eslint/no-explicit-any
    (error?: any, pending?: string): void;
}

interface HookScenarioResult {
    sourceLocation: SourceLocation;
    result: ScenarioResult;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    pickle: any;
}

type HookCode = (scenario: HookScenarioResult, callback?: CallbackStepDefinition) => void;

export const steps: {
    Given: { pattern: RegExp; fn: StepFunction }[];
    When: { pattern: RegExp; fn: StepFunction }[];
    Then: { pattern: RegExp; fn: StepFunction }[];
} = {
    Given: [],
    When: [],
    Then: [],
};

export const hooks: {
    Before: HookCode[];
    After: HookCode[];
} = {
    Before: [],
    After: [],
};

export const clearDefinitions = (): void => {
    steps.Given = [];
    steps.When = [];
    steps.Then = [];
};

export const countMatchingDefinition = (type: 'Given' | 'When' | 'Then', step: string): number => {
    let n = 0;
    for (const stepDef of steps[type]) {
        if (stepDef.pattern.test(step)) {
            // eslint-disable-next-line no-plusplus
            n++;
        }
    }
    return n;
};
export const getMatchingDefinition = (type: 'Given' | 'When' | 'Then', step: string): StepFunction => {
    for (const stepDef of steps[type]) {
        if (stepDef.pattern.test(step)) {
            return stepDef.fn;
        }
    }
    throw new Error(`There is no match for '${step}' step`);
};

export const Given = jest.fn().mockImplementation((pattern: RegExp, fn: StepFunction): void => {
    steps.Given.push({ pattern, fn });
});
export const When = jest.fn().mockImplementation((pattern: RegExp, fn: StepFunction): void => {
    steps.When.push({ pattern, fn });
});
export const Then = jest.fn().mockImplementation((pattern: RegExp, fn: StepFunction): void => {
    steps.Then.push({ pattern, fn });
});
export const Before = jest.fn().mockImplementation((fn: HookCode): void => {
    hooks.Before.push(fn);
});
export const After = jest.fn().mockImplementation((fn: HookCode): void => {
    hooks.After.push(fn);
});
