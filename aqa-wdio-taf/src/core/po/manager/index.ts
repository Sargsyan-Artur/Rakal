import { TPage, TPages } from '../../../types';
import { ESelector } from './enum';

export class PoManager {
    constructor(private readonly pages: TPages) {}

    public init(): Readonly<TPages> {
        for (const page in this.pages) {
            this.dereference(this.pages[page]!);
        }
        return this.pages;
    }

    private dereference(page: TPage): void {
        if (page.extends) {
            page.url = page.extends.url + page.url; // todo add verification for slashes

            if (page.extends.selector.length > 0 && page.selector.length > 0) {
                page.selector = page.extends.selector + ESelector.delimiter + page.selector;
            }

            if (page.selector.length === 0 && page.extends.selector.length > 0) {
                page.selector = page.extends.selector;
            }

            page.children = {
                ...page.extends.children,
                ...page.children,
            };

            this.dereference(page.extends);
        }
    }
}
