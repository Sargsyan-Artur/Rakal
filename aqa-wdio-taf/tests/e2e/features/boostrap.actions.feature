@bootstrap
Feature: Check steps on Bootstrap page

  Scenario: 1. Verification and action steps should work correctly
    Given I am on 'https://mdbootstrap.com/docs/standard/plugins/drag-and-drop/' url
    And The 'BootstrapBase page > Content > Sorting > Title' element text should be 'Sortable basic example'
    And The 'font-size' CSS property of 'BootstrapBase page > Content > Sorting > Title' element should not be 'background'
    And The 'class' attribute text of 'BootstrapBase page > Content > Sorting > Description' element should be 'mb-4'
    When I scroll to the 'BootstrapBase page > Content > Sorting > SortableList' element
    And I drag and drop 'BootstrapBase page > Content > Sorting > SortableList > 5st Items' element to 'BootstrapBase page > Content > Sorting > SortableList > 1st Items' element
    And I scroll to the 'BootstrapBase page > Content > MultipleTables' element
    And I drag and drop 'BootstrapBase page > Content > MultipleTables > ToDoItems > 3st Items' element to 'BootstrapBase page > Content > MultipleTables > DoneItems > 4st Items' element

  Scenario: 2. Verification steps should work correctly
    Given I am on 'https://mdbootstrap.com/' url
    Then I should be on 'BootstrapBase' page
    When I click on 'BootstrapBase page > Header > BurgerButton' element
    And I should wait for 'BootstrapBase page > SideNav > Items' element be displayed
    Then The count of 'BootstrapBase page > SideNav > Items' should be equal '15'

  Scenario: 3. Verify type random string step
    Given I am on 'https://mdbootstrap.com/' url
    When I type random '25' alphabetic values in 'BootstrapBase page > Header > SearchInput' field
    And I clear value in 'BootstrapBase page > Header > SearchInput'

    And I type random '25' numeric values in 'BootstrapBase page > Header > SearchInput' field
    And I clear value in 'BootstrapBase page > Header > SearchInput'

    And I type random '25' values in 'BootstrapBase page > Header > SearchInput' field
    And I clear value in 'BootstrapBase page > Header > SearchInput'

    And I type random numeric values in 'BootstrapBase page > Header > SearchInput' field
    And I clear value in 'BootstrapBase page > Header > SearchInput'
