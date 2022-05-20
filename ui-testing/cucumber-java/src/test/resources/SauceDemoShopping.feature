
Feature: Online Shopping Functionality via the Sauce Demo Website

  Login to the online shop, add/remove items and successfully checkout

  Background: Login successfully to the website

    Given I am on the login page of Sauce Demo
    When I enter credentials and hit login
    Then I should be taken to the products page

  Scenario: Shop Sauce Demo - Full Pass

    Given I add a Backpack to the cart
    And I add a Onesie to the cart
    When I click on the shopping cart icon
    Then I should be taken to the shopping cart page
    And I should be able to verify the presence of the Backpack in the cart
    And I should be able to verify the presence of the Onesie in the cart
    When I remove the Backpack from the cart
    Then I should be able to verify the absence of the Backpack in the cart
    When I click on the checkout button
    Then I am taken to the checkout page
    And I enter my information and click continue
    And I review and hit finish
    And I go back to home

  Scenario: Navigate to the shopping cart page

    Given I add a Backpack to the cart
    And I add a Onesie to the cart
    When I click on the shopping cart icon
    Then I should be taken to the shopping cart page

  Scenario: Verify item additions to the shopping cart

    Given I add a Backpack to the cart
    And I add a Onesie to the cart
    When I click on the shopping cart icon
    And I am taken to the shopping cart page
    Then I should be able to verify the presence of the Backpack in the cart
    And I should be able to verify the presence of the Onesie in the cart

  Scenario: Verify item removals from the shopping cart

    Given I add a Backpack to the cart
    And I add a Onesie to the cart
    When I click on the shopping cart icon
    And I am taken to the shopping cart page
    And I remove the Backpack from the cart
    Then I should be able to verify the absence of the Backpack in the cart

  Scenario: Complete the checkout process

    Given I add a Backpack to the cart
    And I add a Onesie to the cart
    And I click on the shopping cart icon
    And I am taken to the shopping cart page
    And I remove the Backpack from the cart
    When I click on the checkout button
    Then I am taken to the checkout page
    And I enter my information and click continue
    And I review and hit finish
    And I go back to home

