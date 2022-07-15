
# UI Testing with Cucumber Java

> This Test Suite illustrates how to test a website User Interface using the [**Cucumber-JVM**](https://cucumber.io/docs/installation/java/) browser automation framework.
> 
> Shortcut to Cucumber feature file:
> * [SauceDemoShopping.feature](./src/test/resources/SauceDemoShopping.feature)
> 
> Shortcut to Step Definitions file:
> * [DemoDefinitions.java](./src/test/java/stepdefs/DemoDefinitions.java)
> 
> Shortcut to Java test files:
> * [AbstractPage.java](./src/test/java/pageobjects/AbstractPage.java)
> * [SauceDemoLoginPage.java](./src/test/java/pageobjects/SauceDemoLoginPage.java)
> * [SauceDemoProductsPage.java](./src/test/java/pageobjects/SauceDemoProductsPage.java)
> * [SauceDemoCartPage.java](./src/test/java/pageobjects/SauceDemoCartPage.java)
> * [SauceDemoCheckoutPage.java](./src/test/java/pageobjects/SauceDemoCheckoutPage.java)
> 
> _For the **Selenium Java** version of these tests, click_ [_here_](../selenium-java). <br> _For the **Cypress** version of these tests, click_ [_here_](../cypress-node). 

## Table of Contents
* [General Info](#general-information)
* [Technologies Used](#technologies-used)
* [Features](#features)
* [Challenges](#challenges)
* [Screenshots](#screenshots)
* [Setup](#setup)
* [Usage](#usage)


## General Information
- Service Under Test: [Sauce Labs' Demo Site](https://www.saucedemo.com/)
  - Sauce Labs is an automated testing platform company
  - This is their demo site for automated testing
  - It is a based on a fictional online shop
- Why use this particular demo website?
  - It's publicly available
  - Provided for free by a reputable company
  - Intentionally geared towards automated tests
  - Simple yet typical e-commerce workflows
  - Stable & Static  _(i.e. element ids are not prone to changes and breakage)_
  - Longevity _(i.e. site is expected to remain online indefinitely)_


## Technologies Used
- macOS
- IntelliJ IDEA
- Java
- Cucumber JVM: Java
- Cucumber JVM: JUnit
- Selenium WebDriver for Java
- ChromeDriver
- JUnit 5
- WebDriverManager
- Maven 


## Features
- Page Object Model implementation
- Test Execution order solved
    -  `@TestMethodOrder` or `@Order` no longer needed _(as originally used [here](../selenium-java))_
    - Cucumber automatically handles the execution sequence via the feature file
- Use of Cucumber Hooks (e.g. `@Before`, etc.)
- Use of Regular Expressions (**regex**)
- Use of JUnit Assertions (e.g. `.assertEquals`, etc.)
- Masked login credentials (via `config.properties`)
- Built on top of the original [Selenium Java](../selenium-java) implementation


## Challenges
- Annotations confusion _(Which one to use? Cucumber's or JUnit's?)_
    - Beware of auto-importing classes as you code
        - Use this: `import  io.cucumber.java.BeforeAll;`
        - **NOT** this: `import  org.junit.jupiter.api.BeforeAll;`
- Securing login credentials
    - Though publicly available on the saucedemo site, it is still good practice not to have it viewable in source control.
    - Number of options considered but settled on the use of `config.properties` for ease and simplicity of implementation.
- Browser/driver incompatibility during test runs
    - Resolved by importing `WebDriverManager`


## Screenshots
![Test Results](./screenshot20220623_cucumber-java.png)


## Setup
1. Clone repository
2. Install IntelliJ IDEA
3. Allow Maven to build dependencies off the `pom.xml`


## Usage
1. Enter login credentials in the `config.properties`  file
    ```
   UI_USER=your_ui_username_here
   UI_PASS=your_ui_password_here
   ```
2. Remove the `.example` suffix
3. Run `SauceDemoShopping.feature` inside IntelliJ
