Feature: Login using Registered Credentials to Obtain Authorization Token
  for help, see: https://www.watttime.org/api-documentation/#introduction

  Background:
    * url 'https://api2.watttime.org/v2'
    * def username = appId
    * def password = appSecret
    * def temp = username + ':' + password
    * def Base64 = Java.type('java.util.Base64')
    * def encoded = Base64.getEncoder().encodeToString(temp.toString().getBytes());

  Scenario: Login and Obtain Bearer Token for Subsequent Calls
    Given path 'login'
    And header Authorization = 'Basic ' + encoded
    When method get
    Then status 200
    * def token = response.token
    * configure headers = { Authorization: '#("Bearer " + token)' }
