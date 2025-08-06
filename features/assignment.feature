Feature: AJBell assignment 

Scenario: Starter Portfolio popup and asset allocation
 Given the user navigates to "https://www.ajbell.co.uk/investment/ideas/starter-portfolios"
 When I select "Adventurous Select"
 Then the popup should be displayed and the contents of the popup should be correct
 When I enter investment amount as "1000"
 Then verify the split in weight and amount in the table
 When I click the "Asset Allocation" tab
 Then the pie chart and Risk level rating should be displayed
 When I click the "Close" button in the popup 