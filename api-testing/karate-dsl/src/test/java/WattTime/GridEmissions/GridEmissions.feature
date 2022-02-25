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
      | 45.520 | -73.575 | HQ               | 227| Hydro Quebec             |
      | 44.541 |-100.371 | SPP_SIOUX        | 274| SPP Sioux Falls          |
      | 40.414 |  -3.692 | ES               | 152| Spain                    |
      | 48.860 |   2.294 | FR               | 136| France                   |

  Scenario Outline: Determine Grid Region - Error Handling
    Given path 'ba-from-loc'
    And params { latitude: <lat>, longitude: <long> }
    When method get
    Then assert responseStatus == <HTTP Status>
    And match response.error == '<error text>'
    And match response.latitude == '<resplat>'
    And match response.longitude == '<resplong>'

    Examples:
      | lat    | long    | HTTP Status | error text            |   resplat  |  resplong  |
      |  0     |   0     |     404     | Coordinates not found |      0     |      0     |
      | 42.372 |  null   |     400     | Invalid coordinates   |   42.372   | #notpresent|
      |  null  | -72.519 |     400     | Invalid coordinates   | #notpresent|  -72.519   |
      |  ABC   | XYZ     |     400     | Invalid coordinates   |     ABC    |     XYZ    |

  Scenario Outline: Get Real-time Emissions Index - Happy Path/s
    Given path 'index'
    And params { ba: <ba_in>, latitude: <lat>, longitude: <long>, style: <style> }
    When method get
    Then status 200
    And match response.ba == '<ba_out>'
    And match response.freq == '#regex [0-9]{3}'
    And match response.percent == '#regex [0-9]{2}'

    Examples:
      |    ba_in    | lat    | long    |  style   |   ba_out  |
      | 'ISONE_WCMA'|  null  |   null  |   null   | ISONE_WCMA|
      | 'ISONE_WCMA'|  null  |   null  | 'percent'| ISONE_WCMA|
