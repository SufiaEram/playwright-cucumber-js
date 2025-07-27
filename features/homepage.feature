Feature: homepage

 Scenario: User can search on ajbell
    Given the user navigates to "https://www.ajbell.co.uk/"
    When the user types "investment" in the search box
    Then the user should see search results


 Scenario: User can search on ajbell
    Given the user navigates to "https://www.ajbell.co.uk/"
    When the user hovers over "investing" 
    Then return all the options from "our" in a list