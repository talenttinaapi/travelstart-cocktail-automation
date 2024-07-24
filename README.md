# travelstart-cocktail-automation:API Testing

## Overview

This repository contains test cases for the [Cocktail DB API](https://www.thecocktaildb.com/api.php), a public database of cocktails and drinks from around the world. The goal of this project is to validate the functional requirements of the API and perform additional non-functional tests.

Also in icluded in this repository are suggested non-functional tests and the relevant frameworks to test them

## Functional Requirements

The following test cases cover the API's functional requirements:

### 1. Search Ingredients By Name

- **Endpoint:** `https://www.thecocktaildb.com/api/json/v1/1/search.php?i={ingredient}`
- **Requirements:**
  - **Alcoholic Ingredients:**
    - `Alcohol` should be "Yes"
    - `ABV` should not be null
  - **Non-Alcoholic Ingredients:**
    - `Alcohol` should be null
    - `ABV` should be null
- **Test Cases:**
  1. Search for a valid alcoholic ingredient (e.g., vodka)
  2. Search for a valid non-alcoholic ingredient (e.g., lime)
  3. Search for an invalid ingredient (e.g., nonexistentingredient)

### 2. Search Cocktails By Name

- **Endpoint:** `https://www.thecocktaildb.com/api/json/v1/1/search.php?s={cocktail}`
- **Requirements:**
  - If the cocktail does not exist, `drinks` should be null.
  - The search should be case-insensitive.
  - The API response must contain the following fields:
    - `drinks` (array)
    - `strDrink` (string/null)
    - `strTags` (string/null)
    - `strCategory` (string/null)
    - `strAlcoholic` (string/null)
    - `strGlass` (string/null)
    - `strInstructions` (string/null)
    - Additional fields as specified
- **Test Cases:**
  1. Search for a valid cocktail (e.g., margarita)
  2. Search for a cocktail that doesn't exist (e.g., nonexistentcocktail)
  3. Search for a cocktail name in different case (e.g., MARGARITA)
  4. Search for an empty cocktail name
  5. Search for ingredients with special characters in the name

## Non-Functional Tests

1. Performance Test

Test: Measure the response time for searching ingredients and cocktails.

2  Security Test

Test: Verify that the API endpoints are secure and not vulnerable to common attacks like SQL injection, XSS, etc.

## Suggested Framework

Non-Functional Test Automation:
Performance Testing: K6
Security Testing: OWASP ZAP

## Setup

### Prerequisites

- [Node.js](https://nodejs.org/) (version 16 or later)
- [npm](https://www.npmjs.com/) (included with Node.js)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/talenttinaapi/travelstart-cocktail-automation.git

   cd travelstart-cocktail-automation   
   ```

## Install Dependencies

```bash
  npm install axios mocha@^9 chai
  ```

## Dependencies

  ```Node.js: A JavaScript runtime required to run the tests and scripts.
        npm: Node package manager, included with Node.js, used to manage project dependencies.
        axios: HTTP client for making API requests.
        mocha: Testing framework for running test cases.
        chai: Assertion library used with Mocha for assertions.
    ```

## Project Structure

travelstart-cocktail-automation/
│
├── node_modules/ # Node.js modules
├── test.mjs # Test cases for Cocktail DB API
├── package.json # Project dependencies and scripts
└── README.md # Project documentation

## Running the Tests

- Ensure Mocha Supports ES Modules

- Update the package.json to support ES6 modules
```json 
{
  "type": "module",
  "scripts": {
    "test": "mocha"
  }
}
```

- Execute the test using npm

```bash
npm test
```

## Performance Testing

- Install k6

 ```bash
 brew install k6
 ```

- Create Test Script:

```js
import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  duration: '30s',
  vus: 10,
};

export default function () {
  let res = http.get('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita');
  check(res, { 'status was 200': (r) => r.status == 200 });
  sleep(1);
}
```

- Run test

```bash
k6 run script.js
```

## Security Testing

Install Install OWASP ZAP
Run Active Scan: Use OWASP ZAP to scan the API endpoints for vulnerabilities.
