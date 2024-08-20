# Self-assessment / Validation

In order to ensure a high-quality product, we have implemented a series of tests that cover different aspects of the system. The tests have been divided into three main categories: code quality, architectural testing, and API testing.

## Code Quality

Two main tools have been used to ensure the quality of the code produced:
**Prettier** is a code formatter that supports many languages. It enforces a consistent style by parsing code and re-writing it according to the configuration rules. 
**ESLint** is a tool that statically analyses code to find suboptimal patterns and errors.

Both tools have been integrated into the Continuous Integration pipeline to keep the high-quality code production.

## Architectural Testing

To ensure that layers’ dependencies are respected, Dependency Cruiser framework has been exploited.
Essentially, the configured rules check that:
- The Domain layer does not access to any other layer.
- The Application layer can access only the Domain layer.
- Presentation layer can access only Domain and Application layers.

`let e = 3`
5.3 API Testing
API testing has been performed using Vitest framework.
To be able to execute the tests, the database has been mocked using MongoDB Mem-
ory Server.
In Listing 6 is reported a simplified example of an API test.