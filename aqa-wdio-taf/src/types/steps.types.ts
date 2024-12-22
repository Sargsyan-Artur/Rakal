export type TTextCondition = 'be' | 'not be' | 'contain' | 'not contain' | 'matches' | 'not matches';
export type TCountCondition = 'not be' | 'be equal' | 'be more than' | 'be less than';
export type TValueCondition = TTextCondition;

export type TElementStateCondition =
    | 'be displayed'
    | 'be clickable'
    | 'exist'
    | 'be focused'
    | 'be disabled'
    | 'be enabled'
    | 'be selected'
    | 'be displayed in viewport';

export type TBrowserNavigation = 'back' | 'forward' | 'refresh';

export type TCountRange = 'be in range';
export type TRangeOptions = `[${number}, ${number}]` | `[${number}, ${number})` | `(${number}, ${number}]` | `(${number}, ${number})`;

export type TSortingOrder = 'asc' | 'desc';
export type TSortingType = 'numbers' | 'letters';

export type TRandomStringType = 'alphabetic' | 'numeric' | 'alphanumeric';

export type TElementPosition = 'first' | 'last' | string;

export type TOs = 'windows' | 'macos';
