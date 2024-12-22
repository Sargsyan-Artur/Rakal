import { TLocator } from '../../../types';
import { EElementType } from '../../wdio/interaction/enum';
import { Element, Page } from '../../wdio';
import { getLocatorByQuery } from '../parser';

export class PoHandler {
    private constructor(private readonly locator: TLocator) {}

    public get element(): Element {
        return new Element(this.locator, EElementType.element);
    }

    public get page(): Page {
        return new Page(this.locator);
    }

    public static init(query: string): PoHandler {
        const locator = getLocatorByQuery(query);
        return new PoHandler(locator);
    }
}
