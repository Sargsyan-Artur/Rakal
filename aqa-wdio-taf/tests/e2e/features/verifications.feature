@verifications
Feature: Check verification steps

  Scenario: 1. Visibility steps should work correctly
    Given I am on 'https://jqueryui.com/' url
    Then I should be on 'Base' page

    And The 'Base page > SideBar > 2nd Widgets > Title' element text should be 'Widgets'
    And The 'background' CSS property of 'Base page > SideBar > 4rd Widgets > Title' element should not be 'background'
    And The 'class' attribute text of 'Base page > SideBar > 2nd Widgets > Title' element should be 'widget-title'

    And The count of 'Base page > Menu > Items' should be equal '8'
    And The count of 'Base page > Menu > Items' should not be '10'
    And The count of 'Base page > Menu > Items' should be more than '6'
    And The count of 'Base page > Menu > Items' should be less than '20'

    And The 'Base page > Menu > 1st Items' element text should be 'Demos'
    And The 'Base page > Menu > 1st Items' element text should not be 'Demos!'
    And The 'Base page > Menu > 3rd Items' element text should contain 'API'

    And The count of 'Base page > Menu > 9th Items' should be in range '[0, 1]'
    And The count of 'Base page > Menu > Items' should be in range '(5, 8]'

    And The 'Base page > Menu > 1st Items' element text should matches '^\w+$/gmi'
    And The 'Base page > Menu > 1st Items' element text should matches '\w+'
    And The 'Base page > Menu > 1st Items' element text should not matches '\d+'

    When I type '12345' in 'Base page > Menu > Search > placeholder' field
    And The value of 'Base page > Menu > Search > placeholder' should matches '\d{5}'
    Then The all texts of 'Base page > Menu > Items' should not contain '[]'
    And  The all texts of 'Base page > SideBar > 1st Widgets' should contain 'a'
    And  The all texts of 'Base page > SideBar > 1st Widgets' should matches '\w+'
    And  The all texts of 'Base page > SideBar > 1st Widgets' should not matches '\d+'
