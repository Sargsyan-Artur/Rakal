@actions
Feature: Check actions steps

  Scenario: 1. Drag and Drop step should work correctly
    Given I am on 'https://jqueryui.com/' url
    Then I should be on 'Base' page
    Then The 'Base page > SideBar > 1st Widgets > Option' elements are sorted in asc order by letters
    When I click on 'Base page > SideBar > 1st Widgets > 2nd Option' element
    And I switch to 'Iframe' frame on the page
    And I drag and drop 'DemoFrame page > Droppable > DraggableElement' element to 'DemoFrame page > Droppable > DroppableElement' element
    And I drag and drop 'DemoFrame page > Droppable > DraggableElement' element to 'x:100' and 'y:100' coordinates

  Scenario: 2. Drag and Drop step for sortable elements should work correctly
    Given I am on 'https://jqueryui.com/' url
    Then I should be on 'Base' page
    When I click on 'Base page > SideBar > 1st Widgets > 5nd Option' element
    And I switch to 'Iframe' frame on the page
    And I drag and drop 'DemoFrame page > Sorting > 1st Options' element to 'x:100' and 'y:100' coordinates

  Scenario: 3. Keyboard steps should work correctly
    Given I am on 'https://jqueryui.com/' url
    Then I should be on 'Base' page
    When I type 'assdfdsadsada' in 'Base page > Menu > Search > placeholder' field
    And I clear value in 'Base page > Menu > Search > placeholder'
    And I type '123456' in 'Base page > Menu > Search > placeholder' field
    And I type random values in 'Base page > Menu > Search > placeholder' field
    And I click on browser back button
    And I click on browser forward button
