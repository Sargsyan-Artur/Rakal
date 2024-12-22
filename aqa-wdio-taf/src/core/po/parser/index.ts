import Logger from '@wdio/logger';

import { TCollectionByIndex, TCollectionByText, TComponent, TLocator, TPage, TPages, TSelector } from '../../../types';
import { PoManager } from '../manager';
import { REG_EXP } from './regexp';
import { ESelector } from '../manager/enum';
import { EQuery } from './enum';

let allPo: TPages;

const logger = Logger('PO Parser');

export function initPo(pages: TPages): void {
    const poManager = new PoManager(pages);
    allPo = poManager.init();
}

export function getLocatorByQuery(query: string): Readonly<TLocator> {
    logger.debug('query:', query);

    if (!query) {
        throw new Error(`The passed 'query' is empty. Please provide the page name at least.`);
    }

    const queryItems = query.split(EQuery.oneArrow).map(q => q.trim());

    if (!REG_EXP.page.test(queryItems[0]!)) {
        throw new Error(`The format of page name isn't correct. Current: '${queryItems[0]!}'. Expected: '${queryItems[0]!} page'`);
    }

    const pageName = queryItems[0]!.match(REG_EXP.page)![1]!;

    if (!allPo.hasOwnProperty(pageName)) {
        throw new Error(`There is no page with '${pageName}' name.`);
    }

    const page: TPage = allPo[pageName]!;
    const element: TLocator['element'] = [...page.selector.split(ESelector.delimiter)];

    let nestedPo: TPage['children'] | null;
    let isFound = false;

    for (let i = 1; i < queryItems.length; i++) {
        const iterationItem = queryItems[i]!;

        let queryItem!: string;
        let index: number | undefined;
        let text: string | undefined;

        if (REG_EXP.withText.test(iterationItem)) {
            // todo use memory + cover by unit tests
            const mathRes = iterationItem.match(REG_EXP.withText)!;
            queryItem = mathRes[1]!.trim();
            text = mathRes[2]!.trim();
        } else if (REG_EXP.elIndex.test(iterationItem)) {
            const mathRes = iterationItem.match(REG_EXP.elIndex)!;
            // NOTE: '-1' is mandatory because arrays begin with 0 index
            index = typeof mathRes[1] !== 'undefined' ? +mathRes[1] - 1 : undefined;
            queryItem = mathRes[2]!.trim();
        } else if (REG_EXP.textSelector.test(iterationItem) || REG_EXP.textCollection.test(iterationItem)) {
            // todo use memory + cover by unit tests
            if (REG_EXP.textSelector.test(iterationItem)) {
                const mathRes = iterationItem.match(REG_EXP.textSelector)!;
                element.push(mathRes[1]!.trim());
            } else {
                const mathRes = iterationItem.match(REG_EXP.textCollection)!;

                if (typeof mathRes[1] !== 'undefined') {
                    element.push({
                        selector: mathRes[2]!.trim(),
                        isCollection: true,
                        index: +mathRes[1] - 1,
                    });
                } else {
                    element.push({
                        selector: mathRes[2]!.trim(),
                        isCollection: true,
                    });
                }
            }
            continue;
        } else {
            throw new Error(
                `The passed query item doesn't meet the requirements. Current queryItem: '${iterationItem}'. Examples: @rak-aqa/wdio-taf/README.md`,
            );
        }

        const children: TPage['children'] = nestedPo ?? page.children;

        if (isFound || !children) {
            break;
        }

        if (!children.hasOwnProperty(queryItem) && queryItems.length > 1) {
            throw new Error(
                `There is no match for the passed '${queryItem}' query item in PO. If an index passed, it should contain: st | nd | rd | th (e.g.: 1st Items). Full query: '${query}'`,
            );
        }

        for (const chKey in children) {
            if (chKey === queryItem) {
                const currentPo: TComponent | TSelector = children[chKey]!;

                if (typeof currentPo === 'object' && 'isCollection' in currentPo && currentPo.isCollection !== true) {
                    throw new Error(`The 'isCollection' prop can have only 'true' value. Current queryItem: '${queryItem}'`);
                }

                if (
                    typeof currentPo === 'object' &&
                    !('isCollection' in currentPo) &&
                    (text || 'text' in currentPo || typeof index === 'number' || 'index' in currentPo)
                ) {
                    throw new Error(
                        `The 'text' and 'index' properties can be used only with 'isCollection: true'. Current queryItem: '${queryItem}'`,
                    );
                }

                // if there are NO nested children
                if (typeof currentPo === 'string' || !('children' in currentPo)) {
                    let childSelector = currentPo as TSelector;

                    if (typeof index === 'number') {
                        if (
                            typeof (childSelector as TCollectionByIndex).index !== 'undefined' &&
                            index !== (childSelector as TCollectionByIndex).index
                        ) {
                            logger.warn(
                                `[1] Index for ${JSON.stringify(
                                    childSelector as TCollectionByIndex,
                                )} collection will be overwritten by ${index} index from query.`,
                            );
                        }
                        childSelector = {
                            ...(childSelector as TCollectionByIndex),
                            index,
                        };
                    } else if (text) {
                        childSelector = {
                            ...(childSelector as TCollectionByText),
                            text,
                        };
                    }

                    element.push(childSelector);
                    isFound = true;
                    break; // here we finish the search of locators in PO
                }

                const chCollection = currentPo as TCollectionByIndex;
                let chSelector: TSelector;

                // if there are nested children
                if (typeof chCollection.isCollection === 'undefined') {
                    chSelector = chCollection.selector;
                } else {
                    chSelector = {
                        selector: chCollection.selector,
                        isCollection: chCollection.isCollection,
                    };

                    if (typeof chCollection.index !== 'undefined' || typeof index !== 'undefined') {
                        if (typeof chCollection.index !== 'undefined' && typeof index !== 'undefined' && chCollection.index !== index) {
                            logger.warn(
                                `[2] Index for ${JSON.stringify(
                                    chCollection,
                                )} collection will be overwritten by ${index} index from query.`,
                            );
                        }
                        Object.assign(chSelector, {
                            index: index ?? chCollection.index,
                        });
                        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                    } else if (text || chCollection.text) {
                        Object.assign(chSelector, {
                            // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
                            text: text || chCollection.text,
                        });
                    }
                }

                element.push(chSelector);
                nestedPo = (currentPo as TComponent)!.children;
            }
        }
    }

    const locator: TLocator = {
        page: {
            url: page.url,
            element: [...page.selector.split(ESelector.delimiter)],
        },
        element,
    };

    // if the last query item wasn't found in PO
    if (locator.element.length - locator.page.element.length !== queryItems.length - 1) {
        throw new Error(
            `There is no match for last '${queryItems[queryItems.length - 1]!}' query item in PO. Locator: '${JSON.stringify(
                locator,
            )}'. Full query: '${query}'`,
        );
    }

    logger.debug('locator', locator);
    return locator;
}
