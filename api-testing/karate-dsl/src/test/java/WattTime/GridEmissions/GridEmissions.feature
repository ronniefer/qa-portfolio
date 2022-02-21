Feature: Watt Time Grid Emissions API
  for help, see: https://www.watttime.org/api-documentation/#introduction

  Background:
    * url 'https://api2.watttime.org/v2'
    * callonce read('BearerToken.feature')

  Scenario Outline: Determine Grid Region - Happy Path/s
    Given path 'ba-from-loc'
    And params { latitude: <lat>, longitude: <long> }
    When method get
    Then status 200
    And match response.abbrev == '<abbrev>'
    And match response.id == <id>
    And match response.name.trim() == '<name>'

    Examples:
      | lat    | long    | abbrev           | id | name                     |
      | 30.230 | -97.731 | ERCOT_AUSTIN     | 255| ERCOT Austin             |
      | 35.294 |-120.652 | CAISO_NORTH      | 231| California ISO Northern  |
      | 35.772 | -78.616 | CPLE             | 197| Duke Energy Progress East|
      | 39.752 | -86.080 | MISO_INDIANAPOLIS| 252| MISO Indianapolis        |
