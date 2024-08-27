---
sidebar_position: 59
---

# DevOps

## Build automation

### NPM gradle plugin

#### Dependencies management

## Version control

#### DVCS workflow

#### Conventional commits

We use [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) to ensure that the commit messages are consistent and informative.

#### Semantic versioning and release

We use [Semantic Versioning](https://semver.org/) to version the software. 
The version number is computed automatically by the CI/CD pipeline. In particular we use 
the [Semantic Release](https://github.com/semantic-release/semantic-release) plugin to automate the release process. The
plugin looks at the (conventional) commit messages and determines the next version of the software based on the changes introduced in the codebase.
It also generates a changelog and creates a new release on GitHub.


## Quality Assurance

## Continuous Integration and Delivery

In order to ensure that whenever some changes are pushed to the repository the project is in a stable state, and possibly release a new version
of the software, we designed a CI/CD pipeline that runs on each push to the repository. To achive this goal we make use of GitHub Actions.

### The CI/CD pipeline

Here's the list of jobs that constitute the [CI pipeline](https://github.com/revue-org/revue/blob/main/.github/workflows/CI-CD.yml):

- `build`: This job is responsible for building the project. After that it runs the automated tests. 
This job runs on: `Linux`, `Windows` and `macOS`.
- `style`: This job is responsible for analyzing the code style and formatting making use of linters and formatters.
- `build_website`: Generates the documentation website. It serves as a way to ensure that on the next release the 
website can be correctly generate without errors. To avoid building the website more than once (in case of a release), 
the website artifact is uploaded and stored available for any future needs.
- `compute_next_version`: This job is responsible for computing the next version of the project. It will be used later in release jobs.
- `release`: Looks at commits message and determines if a [release](https://github.com/revue-org/revue/releases) should be triggered and in case tags the actual state of the repository with the new version number.
- `deploy_website`: Downloads the previously built website artifact and deploys it to the [GitHub Pages](https://revue-org.github.io/revue/).
- `docker`: If a release is triggered, builds the Docker image for all microservices and pushes them to the [Docker Hub](https://hub.docker.com/u/letsdothisshared).

## License
