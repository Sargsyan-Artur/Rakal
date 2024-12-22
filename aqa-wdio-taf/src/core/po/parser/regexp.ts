export const REG_EXP = {
    page: /^(\w+)(?:\spage)$/,
    elIndex: /^(?:(\d+)?(?:st|nd|rd|th)\s)?([a-zA-Z\s_]+)$/,
    textSelector: /^\(textSelector:\s((\.?#?\w+)?\*?=.+)\)$/,
    textCollection: /^\(textCollection:\s(?:(\d+)?(?:st|nd|rd|th)\s)?((\.?#?\w+)?\*?=.+)\)$/,
    withText: /^([a-zA-Z\s_]+)\s\(withText:(.+)\)$/,
};
