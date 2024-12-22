export type TStringSelector = Readonly<string>;

export type TNestedSelector = Readonly<{
    readonly selector: TStringSelector;
    readonly isCollection?: never;
    readonly index?: never;
    readonly text?: never;
}>;

export type TCollectionByIndex = Readonly<{
    readonly selector: TStringSelector;
    readonly isCollection: true;
    readonly index?: number;
    readonly text?: never;
}>;

export type TCollectionByText = Readonly<{
    readonly selector: TStringSelector;
    readonly isCollection: true;
    readonly text?: string;
    readonly index?: never;
}>;

export type TSelector = Readonly<TStringSelector | TNestedSelector | TCollectionByIndex | TCollectionByText>;

export type TChildren = Readonly<{
    readonly [key in string]: Readonly<TComponent | TSelector>;
}>;

export type TComponent = Readonly<{ children?: TChildren } & TSelector>;

export type TPage = {
    readonly name: string;
    url: string;
    selector: TStringSelector;
    readonly extends?: TPage;
    children?: TChildren;
};

export type TPages = Readonly<{
    readonly [key in TPage['name']]: TPage;
}>;

export type TLocator = Readonly<{
    readonly page: {
        readonly url: TPage['url'];
        readonly element: TPage['selector'][];
    };
    readonly element: TSelector[];
}>;

export type TElement = Readonly<WebdriverIO.Element | WebdriverIO.ElementArray>;
