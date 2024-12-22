import lodash from 'lodash';

import { BaseExpects } from './base.expects';
import { EElementType } from '../interaction/enum';
import { Element } from '../interaction';
import { TElement, TLocator, TRangeOptions, TSortingOrder, TSortingType, TTextCondition, TValueCondition } from '../../../types';
import { TIMEOUT } from '../../../helpers';

export class ElementExpects extends BaseExpects {
    constructor(private readonly element: Element, locator: TLocator, type: EElementType) {
        super(locator, type);
    }

    public async toBeDisplayed(options?: ExpectWebdriverIO.CommandOptions): Promise<TElement> {
        const exp = await this.elementExpect();
        return exp.toBeDisplayed(options);
    }

    public async toBeClickable(options?: ExpectWebdriverIO.CommandOptions): Promise<TElement> {
        const exp = await this.elementExpect();
        return exp.toBeClickable(options);
    }

    public async toExist(options?: ExpectWebdriverIO.CommandOptions): Promise<TElement> {
        const exp = await this.elementExpect();
        return exp.toExist(options);
    }

    public async toBeFocused(options?: ExpectWebdriverIO.CommandOptions): Promise<TElement> {
        const exp = await this.elementExpect();
        return exp.toBeFocused(options);
    }

    public async toBeDisabled(options?: ExpectWebdriverIO.CommandOptions): Promise<TElement> {
        const exp = await this.elementExpect();
        return exp.toBeDisabled(options);
    }

    public async toBeEnabled(options?: ExpectWebdriverIO.CommandOptions): Promise<TElement> {
        const exp = await this.elementExpect();
        return exp.toBeEnabled(options);
    }

    public async toBeSelected(options?: ExpectWebdriverIO.CommandOptions): Promise<TElement> {
        const exp = await this.elementExpect();
        return exp.toBeSelected(options);
    }

    public async toBeDisplayedInViewport(options?: ExpectWebdriverIO.CommandOptions): Promise<TElement> {
        const exp = await this.elementExpect();
        return exp.toBeDisplayedInViewport(options);
    }

    public async toBeElementsArrayOfSize(
        size: number | ExpectWebdriverIO.NumberOptions,
        options?: ExpectWebdriverIO.NumberOptions,
    ): Promise<TElement> {
        const exp = await this.elementExpect();
        return exp.toBeElementsArrayOfSize(size, options);
    }

    public async textToBe(expectedText: string, condition: TTextCondition): Promise<true | void | TElement> {
        switch (condition) {
            case 'be':
                // eslint-disable-next-line no-case-declarations
                const exp = await this.elementExpect();
                return exp.toHaveText(expectedText);
            case 'contain':
                return this.chaiWait(async () => {
                    const actualTexts = await this.element.getText();
                    return this.chaiExpect(actualTexts).to.includes(expectedText);
                });
            case 'matches':
                return this.chaiWait(async () => {
                    const actualTexts = await this.element.getText();
                    return this.chaiExpect(actualTexts).to.matches(this.regExpBuilder(expectedText));
                });
            default:
                throw new Error(`There is no condition type with ${condition} name.`);
        }
    }

    public async CSSPropertyToBe(property: string, expectedText: string, condition: TTextCondition): Promise<Chai.Assertion> {
        const { value: actualPropertyValue } = await this.element.getCSSPropertyValue(property);

        switch (condition) {
            case 'be':
                return this.chaiExpect(actualPropertyValue).to.equal(expectedText);
            case 'contain':
                return this.chaiExpect(actualPropertyValue).to.include(expectedText);
            default:
                throw new Error(`There is no condition type with ${condition} name.`);
        }
    }

    public async attributeToHaveText(attributeName: string, expectedText: string, condition: TTextCondition): Promise<Chai.Assertion> {
        const actualText = await this.element.getAttributeText(attributeName);

        switch (condition) {
            case 'be':
                return this.chaiExpect(actualText).to.equal(expectedText);
            case 'contain':
                return this.chaiExpect(actualText).to.include(expectedText);
            default:
                throw new Error(`There is no condition type with ${condition} name.`);
        }
    }

    public async toBeInRange(range: TRangeOptions): Promise<Chai.Assertion> {
        const actualTexts = await this.element.getText();
        let actualText: string;
        if (Array.isArray(actualTexts)) {
            actualText = actualTexts[0]!;
            this.logger.warn(`[toBeInRange] Used first element from collection to verify that element's text is in range`);
        } else {
            actualText = actualTexts;
        }

        return this.checkRange(range, actualText);
    }

    public async toHaveLengthInRange(range: TRangeOptions): Promise<Chai.Assertion> {
        let elementsLength = 0;
        try {
            const elements = await this.element.wdioElement();
            elementsLength = Array.isArray(elements) ? elements.length : 1;
        } catch {
            //
        }

        return this.checkRange(range, elementsLength);
    }

    public async contentLengthToBe(params: { characters: number; type?: 'text' | 'value' }): Promise<Chai.Assertion> {
        const content =
            (params.type && params.type === 'text') || !params.hasOwnProperty('type')
                ? await this.element.getText()
                : await this.element.getValue();
        return this.chaiExpect(content).to.have.lengthOf(params.characters);
    }

    public async valueToBe(expectedValue: string, condition: TValueCondition): Promise<Chai.Assertion> {
        const actualValue = await this.element.getValue();

        switch (condition) {
            case 'be':
                return this.chaiExpect(actualValue).to.equal(expectedValue);
            case 'contain':
                return this.chaiExpect(actualValue).to.include(expectedValue);
            case 'matches':
                return this.chaiExpect(actualValue).to.matches(this.regExpBuilder(expectedValue));
            default:
                throw new Error(`There is no condition type with ${condition} name.`);
        }
    }

    public async allTextsToBe(expectedText: string, condition: TTextCondition): Promise<Chai.Assertion> {
        const actualTexts = await this.element.getText();
        const assertFunctions = new Map<TTextCondition, (v: string) => boolean>([
            ['be', v => v === expectedText],
            ['contain', v => v.includes(expectedText)],
            ['matches', v => this.regExpBuilder(expectedText).test(v)],
        ]);
        let assertionResult: boolean;
        if (assertFunctions.has(condition) && Array.isArray(actualTexts)) {
            assertionResult = actualTexts.every(assertFunctions.get(condition)!);
        } else if (assertFunctions.has(condition) && typeof actualTexts === 'string') {
            this.logger.warn(`[allTextsToBe] Found an only one element`);
            assertionResult = [actualTexts].every(assertFunctions.get(condition)!);
        } else {
            throw new Error(`There is no condition type with ${condition} name.`);
        }
        return this.chaiExpect(assertionResult).to.be.equal(
            !this._not,
            `Expect each item of [${actualTexts}] array to${this._not ? ' not ' : ''} ${condition} ${expectedText} value`,
        );
    }

    public async sortedBy(order: TSortingOrder, type?: TSortingType): Promise<Chai.Assertion> {
        const actualTexts = await this.element.getText();
        let transformedArr: (string | number | null)[] = [...actualTexts];

        if (type) {
            switch (type) {
                case 'numbers':
                    transformedArr = transformedArr.map(text => parseFloat(text as string));
                    break;
                default:
                    transformedArr = transformedArr.map(text => (text as string).trim());
                    break;
            }
        }
        // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
        transformedArr = transformedArr.map(item => item || null);
        const expectedTexts = JSON.stringify(lodash.orderBy(transformedArr, undefined, [order]));
        return this.chaiExpect(JSON.stringify(transformedArr)).to.equal(expectedTexts);
    }

    private async elementExpect(): Promise<ExpectWebdriverIO.Matchers<TElement, TElement>> {
        const el = await this.locatorHandler.getElement();

        if (this._not) {
            this._not = false;
            return expect(el).not;
        }
        return expect(el);
    }

    private checkRange(range: TRangeOptions, value: string | number): Chai.Assertion {
        const brackets = `${range.charAt(0)}${range.charAt(range.length - 1)}`;
        const [first, second] = range.match(/\d+\.?(\d+)?/g)!;

        switch (brackets) {
            case '[]':
                return this.chaiExpect(value).to.be.within(+first!, +second!, `Actual element value/length is not in range ${range}`);
            case '()':
                return this.chaiExpect(value)
                    .to.be.greaterThan(+first!, `Actual element value/length is not greater then ${+first!}`)
                    .and.to.be.lessThan(+second!, `Actual element value/length is not less then ${+second!}`);
            case '[)':
                return this.chaiExpect(value)
                    .to.be.greaterThanOrEqual(+first!, `Actual element value/length is not greater or equal then ${+first!}`)
                    .and.to.be.lessThan(+second!, `Actual element value/length is not less then ${+second!}`);
            case '(]':
                return this.chaiExpect(value)
                    .to.be.greaterThan(+first!, `Actual element value/length is not greater then ${+first!}`)
                    .and.to.be.lessThanOrEqual(+second!, `Actual element value/length is not less or equal then  ${+second!}`);
            default:
                throw new Error(`Case for brackets ${brackets} was not found`);
        }
    }

    private regExpBuilder(text: string): RegExp {
        if (/(\/[gmiuy]{1,5})$/g.test(text)) {
            const matchedResult = text.match(/(.+)\/([gmiuy]{1,5})$/);
            if (!matchedResult) {
                throw new Error(`Expected ${text} to match to the next regexp pattern - /(.+)\\/([gmiuy]{1,5})$/`);
            } else {
                const flags = [...new Set(matchedResult[2])].join('');
                return new RegExp(matchedResult[1]!, flags);
            }
        }
        return new RegExp(text);
    }

    private async chaiWait(assert: () => Promise<Chai.Assertion>): Promise<void> {
        const errorMap = new Map();
        const not = this._not;

        try {
            await this.element.wait.until(
                async () => {
                    try {
                        this._not = not;
                        await assert();
                        return true;
                    } catch (e) {
                        errorMap.set('###chaiWaitErrMsg', (e as Error).message);
                        return false;
                    }
                },
                {
                    timeout: TIMEOUT.m,
                    interval: TIMEOUT.xss,
                },
            );
        } catch (e) {
            throw new Error(errorMap.get('###chaiWaitErrMsg') as string);
        }
    }
}
