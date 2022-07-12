# API Testing with Karate DSL

> This Test Suite illustrates how to test API endpoints using the [**Karate**](https://github.com/karatelabs/karate) test automation framework.
> 
> Shortcut to feature files:
> * [BearerToken.feature](./src/test/java/WattTime/GridEmissions/BearerToken.feature)
> * [GridEmissions.feature](./src/test/java/WattTime/GridEmissions/GridEmissions.feature)
> 
> _For the **SuperTest** (i.e. JavaScript) version of these tests, click_ [_here_](../supertest-node). 

## Table of Contents
* [General Info](#general-information)
* [Technologies Used](#technologies-used)
* [Features](#features)
* [Challenges](#challenges)
* [Screenshots](#screenshots)
* [Setup](#setup)
* [Usage](#usage)


## General Information
- Service Under Test: [WattTime API](https://www.watttime.org/api-documentation/#introduction)
  - WattTime provides emissions reduction technology through monitoring.
  - They provide marginal emissions rate data via their API.
  - Confused? Don't be. At the end of the day, it's an API...
  - ...you send it a request and it generates a response.
- Why use this particular API?
  - It's publicly available
  - Self-registration is quick & easy
  - Requires Authentication & Authorization (a common API use-case)
  - Well documented
  - Stable


## Technologies Used
- macOS
- IntelliJ IDEA
  - Cucumber for Java Plugin
  - Gherkin Plugin 
- karate-junit5
- Maven


## Features
- Basic Authentication using Base64 encoding
- Reusable Bearer Token (via `callonce`)
- Self-documenting Gherkin syntax
- Organized Scenario Outline examples
- Secured secret credentials (via `karate-config.js`)


## Challenges
- Handling problematic response payloads (e.g. trailing spaces)
- Fitting tests into the Scenario Outline format (DRY vs DAMP)


## Screenshots
![Test Results](./screenshot20220623_karate-dsl.png)


## Setup
1. Clone repository
2. Install IntelliJ IDEA and required plugins
3. Self register for [WattTime API access](https://www.watttime.org/api-documentation/#register-new-user)


## Usage
1. Enter registered credentials in the `karate-config.js.example`  file
    ```
    appId: 'your_api_username_here',
    appSecret: 'your_api_password_here'
    ```
2. Remove the `.example` suffix
3. Run `GridEmissions.feature` inside IntelliJ
