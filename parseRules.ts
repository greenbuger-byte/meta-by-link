const attr = (element: HTMLElement, attribute: string) => element.getAttribute(attribute);
const elementByContent = (element: HTMLElement) => attr(element, 'content');
const elementByText = (element:  HTMLOptionElement): string => element.text;
export type ParseRulesMeta = 'title';
type ParseRulesSearch = Array<[string, (element: HTMLElement) => string | null]>;
const parseRules: { title: ParseRulesSearch} = {
    title: [
        ['meta[property="og:title"]', elementByContent],
        ['meta[name="twitter:title"]', elementByContent],
        ['meta[property="twitter:title"]', elementByContent],
        ['title', (element) => elementByText(element as HTMLOptionElement)],
    ]
};
export default parseRules;