@memory
Feature: Check Memory steps

  Background:
    Given I am on 'https://jqueryui.com/' url
    Then I should be on 'Base' page

  Scenario: 1. Verify that text from element is saved
    When I remember the text of 'Base page > SideBar > 2nd Widgets > Title' as 'widgetTitle'
    Then The 'Base page > SideBar > 2nd Widgets > Title' element text should be '#$widgetTitle'
    And  The 'Base page > SideBar > 2nd Widgets > Title' element text should be 'Widgets'

    When I type 'AQA Test' in 'Base page > Menu > Search > placeholder' field
    And  I remember the value of 'Base page > Menu > Search > placeholder' as 'searchValue'
    Then The value of 'Base page > Menu > Search > placeholder' should be '#$searchValue'
    And  The value of 'Base page > Menu > Search > placeholder' should be 'AQA Test'

  Scenario: 2. Verify that CSS property and attributes are saved
    When I remember the 'font-size' CSS property value of 'Base page > SideBar > 4rd Widgets > Title' as 'fontValue'
    Then The 'font-size' CSS property of 'Base page > SideBar > 4rd Widgets > Title' element should be '#$fontValue'
    And  The 'font-size' CSS property of 'Base page > SideBar > 4rd Widgets > Title' element should be '20px'

    When I remember the 'placeholder' attribute of 'Base page > Menu > Search > placeholder' as 'searchPlaceholder'
    Then The 'placeholder' attribute text of 'Base page > Menu > Search > placeholder' element should be '#$searchPlaceholder'
    And  The 'placeholder' attribute text of 'Base page > Menu > Search > placeholder' element should be 'Search'

  Scenario: 3. Verify that number of elements, order are saved
    When I remember the number of 'Base page > SideBar > Widgets' as 'widgetsNumber'
    Then The count of 'Base page > SideBar > Widgets' should be equal '4'
    And The count of 'Base page > SideBar > Widgets' should be equal '#$widgetsNumber'

    When I remember the order of 'Base page > SideBar > Widgets' as '#$widgetsOrder'
    Then I delete 'widgetsNumber' from memory

  Scenario: 4. Verify that url is saved
    When I remember the page URL as 'pageUrl'
    And  I am on '#$pageUrl' url
    And  I open page by '#$pageUrl' url in new tab
    And  I switch window to '#$pageUrl'
