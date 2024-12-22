import { TChildren, TComponent } from '../../../../../src/types';

const rowElements: TChildren = {
    Name: 'div:nth-child(1)',
    'SKU Number': 'div:nth-child(2)',
    'Commodity Type': 'div:nth-child(3)',
    Status: 'div:nth-child(4)',
    Description: 'div:nth-child(5)',
};

export const productsComponent: TComponent = {
    selector: 'app-catalogue',
    children: {
        Pagination: 'app-list-paging .ng-star-inserted',
        'Import Product Button': '.context-menu-host',
        'Search By Name Input': '[placeholder="Search by name"]',
        Filter: {
            selector: 'app-catalogue-list-filter',
            children: {
                'Search input': '[placeholder="Search by name"]',
                'Commodity Type Dropdown': '[placeholder="Commodity type"]',
                'Status Dropdown': '[placeholder="Status"]',
            },
        },
        Table: {
            selector: 'app-catalogue-list-grid',
            children: {
                'Header Row': {
                    selector: 'nb-list-item:not(.catalog-row.ng-star-inserted) .product-wrapper',
                    children: rowElements,
                },
                'Body Rows': {
                    selector: 'nb-list-item.ng-star-inserted .product-wrapper',
                    isCollection: true,
                    children: rowElements,
                },
                'Footer Rows': {
                    selector: 'footer rows selector',
                    isCollection: true,
                    children: {
                        'Some elements': {
                            selector: 'some elements selector',
                            isCollection: true,
                            index: 3,
                            children: {
                                Names: {
                                    selector: 'names selector',
                                    isCollection: true,
                                    text: 'Text from names in Some elements',
                                },
                            },
                        },
                        'Text elements': {
                            selector: 'selector for text elems',
                            isCollection: true,
                            text: 'Text 1',
                            children: {
                                First: 'first selector',
                                Second: {
                                    selector: 'second selector',
                                },
                            },
                        },
                    },
                },
                ...rowElements, // for textSelector and textCollection
            },
        },
        Element: {
            isCollection: true,
            selector: 'span',
            index: 3,
            children: {
                Nested: {
                    isCollection: true,
                    selector: 'a',
                    index: 5,
                },
            },
        },
    },
};
