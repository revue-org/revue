"use strict";(self.webpackChunksite=self.webpackChunksite||[]).push([[6087],{9591:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>l,contentTitle:()=>o,default:()=>h,frontMatter:()=>r,metadata:()=>a,toc:()=>c});var t=s(4848),i=s(8453);const r={sidebar_position:50},o="DevOps",a={id:"report/devops",title:"DevOps",description:"Build automation",source:"@site/docs/report/devops.md",sourceDirName:"report",slug:"/report/devops",permalink:"/revue/docs/report/devops",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:50,frontMatter:{sidebar_position:50},sidebar:"tutorialSidebar",previous:{title:"Web of Things",permalink:"/revue/docs/report/implementation/web-of-thing"},next:{title:"Deployment",permalink:"/revue/docs/category/deployment"}},l={},c=[{value:"Build automation",id:"build-automation",level:2},{value:"NPM gradle plugin",id:"npm-gradle-plugin",level:3},{value:"Dependencies management",id:"dependencies-management",level:3},{value:"Version control",id:"version-control",level:2},{value:"DVCS workflow",id:"dvcs-workflow",level:3},{value:"Conventional commits",id:"conventional-commits",level:3},{value:"Semantic versioning and release",id:"semantic-versioning-and-release",level:3},{value:"Quality Assurance",id:"quality-assurance",level:2},{value:"Continuous Integration and Delivery",id:"continuous-integration-and-delivery",level:2},{value:"The CI/CD pipeline",id:"the-cicd-pipeline",level:3},{value:"Mergify",id:"mergify",level:4},{value:"License",id:"license",level:2}];function d(e){const n={a:"a",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",h4:"h4",header:"header",li:"li",mermaid:"mermaid",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,i.R)(),...e.components},{Summary:s}=n;return s||function(e,n){throw new Error("Expected "+(n?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Summary",!0),(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.header,{children:(0,t.jsx)(n.h1,{id:"devops",children:"DevOps"})}),"\n",(0,t.jsx)(n.h2,{id:"build-automation",children:"Build automation"}),"\n",(0,t.jsx)(n.h3,{id:"npm-gradle-plugin",children:"NPM gradle plugin"}),"\n",(0,t.jsxs)(n.p,{children:["We use this gradle ",(0,t.jsx)(n.a,{href:"https://github.com/kelvindev15/npm-gradle-plugin",children:"plugin"})," as an empowerment of the ",(0,t.jsx)(n.em,{children:"Node package\nmanager"}),".\nThis enabled us to manage npm projects via Gradle and thus leveraging some of this latter build tool features.\nThe plugin is configured\nvia its ",(0,t.jsx)(n.code,{children:"packageJson"})," extension in which you can specify some of the most common ",(0,t.jsx)(n.em,{children:"package.json"})," properties that include\n",(0,t.jsx)(n.strong,{children:"dependencies"}),", ",(0,t.jsx)(n.strong,{children:"devDependencies"})," and ",(0,t.jsx)(n.strong,{children:"scripts"}),"."]}),"\n",(0,t.jsx)(s,{title:"Example of usage",children:(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-kotlin",children:'packageJson {\n\n    packageJson {\n        author = "Developer"\n        name = "test-package"\n        version = "1.0.0"\n        description = "This is just a test package"\n        main = "index.js"\n        license = "MIT"\n        scripts {\n            script("script1" runs "echo script1")\n            script("script2" runs "echo script2")\n            script("dependantScript" runs "echo dependantScript" dependingOn listOf(npmScript("script2")))\n        }\n        dependencies {\n            "express" version "^4.17.1"\n        }\n        devDependencies {\n            "nodemon" version "^2.0.7"\n        }\n        repository = "git" to "https://github.com/kelvindev15/npm-gradle-plugin"\n        homepage = "page.github.io"\n    }\n}\n'})})}),"\n",(0,t.jsxs)(n.p,{children:["The plugin provides some tasks to work with npm.\nFor each declared ",(0,t.jsx)(n.em,{children:"script"})," a correspondent ",(0,t.jsx)(n.code,{children:"npmScript"})," is created.\nIt gives the possibility to declare dependencies among scripts and tasks.\nIt also gives the possibility to declare script ",(0,t.jsx)(n.strong,{children:"inputs"})," and\n",(0,t.jsx)(n.strong,{children:"outputs"})," for task execution optimization.\nAll the above are features that are available in Gradle and not npm."]}),"\n",(0,t.jsx)(n.p,{children:"The previous example will generate the following task graph:"}),"\n",(0,t.jsx)(n.mermaid,{value:"flowchart TD\n    B[generatePackageLock] --\x3e A[generatePackageJson]\n    C[npmInstall] --\x3e A\n    D[npmScript1] & E[npmScript2] --\x3e C\n    F[npmDependantScript] --\x3e E"}),"\n",(0,t.jsx)(n.h3,{id:"dependencies-management",children:"Dependencies management"}),"\n",(0,t.jsxs)(n.p,{children:["We used ",(0,t.jsx)(n.a,{href:"https://docs.renovatebot.com/",children:"Renovate"})," to keep all dependencies automatically up to date.\nSince for most of the subprojects we are using the ",(0,t.jsx)(n.code,{children:"npm-gradle-plugin"})," we had to define a custom manager:"]}),"\n",(0,t.jsx)(s,{title:"Renovate custom manager",children:(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-json",children:'{\n  "customManagers": [\n    {\n      "datasourceTemplate": "npm",\n      "customType": "regex",\n      "fileMatch": [\n        "(^|\\\\/).*\\\\.gradle\\\\.kts$"\n      ],\n      "matchStrings": [\n        "(?:\\"(?<packageName>[^\\\\s\\"]+)\\"\\\\s*version\\\\s*\\"(?<currentValue>.+)\\")",\n        "(?:\\"(?<packageName>[^\\\\s\\"]+)\\"\\\\s*[.]\\\\s*version\\\\s*\\\\(\\\\s*\\"(?<currentValue>.+)\\"\\\\s*\\\\))"\n      ]\n    }\n  ]\n}\n'})})}),"\n",(0,t.jsxs)(n.p,{children:["In this way we instructed Renovate to look for ",(0,t.jsx)(n.strong,{children:"npm"})," dependencies in the ",(0,t.jsx)(n.code,{children:"gradle.kts"})," files and update them\naccordingly."]}),"\n",(0,t.jsx)(n.h2,{id:"version-control",children:"Version control"}),"\n",(0,t.jsx)(n.h3,{id:"dvcs-workflow",children:"DVCS workflow"}),"\n",(0,t.jsxs)(n.p,{children:["We chose to maintain a single stable branch, the ",(0,t.jsx)(n.code,{children:"main"})," branch. It contains the working code.\nChanges are made in dedicated branches (",(0,t.jsx)(n.em,{children:"feature/name"}),", ",(0,t.jsx)(n.em,{children:"fix/name"}),", ",(0,t.jsx)(n.em,{children:"chore/what"}),", etc.) and then merged into the ",(0,t.jsx)(n.code,{children:"main"}),"\nbranch via pull requests. The pull requests are reviewed and approved by at least one other developer before being\nmerged. Releases are made on the ",(0,t.jsx)(n.code,{children:"main"})," branch."]}),"\n",(0,t.jsx)(n.h3,{id:"conventional-commits",children:"Conventional commits"}),"\n",(0,t.jsxs)(n.p,{children:["We use ",(0,t.jsx)(n.a,{href:"https://www.conventionalcommits.org/en/v1.0.0/",children:"Conventional Commits"})," to ensure that the commit messages are\nconsistent and informative."]}),"\n",(0,t.jsx)(n.h3,{id:"semantic-versioning-and-release",children:"Semantic versioning and release"}),"\n",(0,t.jsxs)(n.p,{children:["We use ",(0,t.jsx)(n.a,{href:"https://semver.org/",children:"Semantic Versioning"})," to version the software.\nThe version number is computed automatically by the CI/CD pipeline.\nIn particular, we use\nthe ",(0,t.jsx)(n.a,{href:"https://github.com/semantic-release/semantic-release",children:"Semantic Release"})," plugin to automate the release process. The\nplugin looks at the (conventional) commit messages and determines the next version of the software based on the changes\nintroduced in the codebase.\nIt also generates a changelog and creates a new release on GitHub."]}),"\n",(0,t.jsx)(n.h2,{id:"quality-assurance",children:"Quality Assurance"}),"\n",(0,t.jsx)(n.p,{children:"The following tools are run over the codebase on every CI workflow:"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.a,{href:"https://prettier.io/",children:(0,t.jsx)(n.strong,{children:"Prettier"})}),": a code formatter with support for many languages."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.a,{href:"https://eslint.org/",children:(0,t.jsx)(n.strong,{children:"ESLint"})}),": a static code analysis tool for identifying problematic patterns found in\nJavaScript code."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.a,{href:"https://www.codefactor.io/",children:(0,t.jsx)(n.strong,{children:"Codefactor"})}),": a tool that automatically reviews code style, security, duplication,\ncomplexity, and coverage on every pull request."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.a,{href:"https://www.sonarsource.com/products/sonarcloud/",children:(0,t.jsx)(n.strong,{children:"SonarCloud"})}),": a cloud-based code quality and security service\nthat finds bugs and vulnerabilities in your code."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.a,{href:"https://www.codacy.com/",children:(0,t.jsx)(n.strong,{children:"Codacy"})}),": an automated code review tool that helps developers to save time in code\nreviews and to tackle technical debt efficiently."]}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"continuous-integration-and-delivery",children:"Continuous Integration and Delivery"}),"\n",(0,t.jsx)(n.p,{children:"To ensure that whenever some changes are pushed to the repository the project is in a stable state, and\npossibly release a new version of the software, we designed a CI/CD pipeline that runs on each push to the repository.\nTo achieve this goal, we make use of GitHub Actions."}),"\n",(0,t.jsx)(n.h3,{id:"the-cicd-pipeline",children:"The CI/CD pipeline"}),"\n",(0,t.jsxs)(n.p,{children:["Here's the list of jobs that constitute\nthe ",(0,t.jsx)(n.a,{href:"https://github.com/revue-org/revue/blob/main/.github/workflows/CI-CD.yml",children:"CI/CD pipeline"}),":"]}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"build"}),": This job is responsible for building the project. After that, it runs the automated tests.\nThis job runs on: ",(0,t.jsx)(n.code,{children:"Linux"}),", ",(0,t.jsx)(n.code,{children:"Windows"})," and ",(0,t.jsx)(n.code,{children:"macOS"}),"."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"style"}),": This job is responsible for analyzing the code style and formatting making use of linters and formatters."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"build_website"}),": Generates the documentation website. It serves as a way to ensure that on the next release the\nwebsite can be correctly generated without errors. To avoid building the website more than once (in case of a release),\nthe website artifact is uploaded and stored available for any future needs."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"compute_next_version"}),": This job is responsible for computing the next version of the project. It will be used later\nin release jobs."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"release"}),": Looks at commits messages and determines if a ",(0,t.jsx)(n.a,{href:"https://github.com/revue-org/revue/releases",children:"release"})," should\nbe triggered and in case tags the actual state of the repository with the new version number."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"deploy_website"}),": Downloads the previously built website artifact and deploys it to\nthe ",(0,t.jsx)(n.a,{href:"https://revue-org.github.io/revue/",children:"GitHub Pages"}),"."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"docker"}),": If a release is triggered, builds the Docker image for all microservices and pushes them to\nthe ",(0,t.jsx)(n.a,{href:"https://hub.docker.com/u/letsdothisshared",children:"Docker Hub"}),"."]}),"\n"]}),"\n",(0,t.jsx)(n.mermaid,{value:"flowchart LR\n    A[build-matrix] & B[style] & C[build-website] -- \u2705--\x3e F[Compute-next-version] --\x3e G[release]\n    G --\x3e H[deploy-website]\n    G --\x3e I[docker-matrix]\n    H & I -- \u2705 --\x3e J[success]\n    A & B & C & G -- \u2705 --\x3e J"}),"\n",(0,t.jsx)(n.h4,{id:"mergify",children:"Mergify"}),"\n",(0,t.jsxs)(n.p,{children:["We use ",(0,t.jsx)(n.a,{href:"https://mergify.io/",children:"Mergify"})," to automatically merge pull requests when all the checks are passed.\nWe also exploit the following features:"]}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Merge queue"}),": Mergify will stack new PRs in a queue and merge them all if all status checks pass."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Branch protection"}),": Mergify provides a GitHub status check that will fail if any of the defined rules and conditions are\nnot met."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Automatic rebasing"}),": Mergify will automatically rebase the pull requests when the base branch is updated."]}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"license",children:"License"}),"\n",(0,t.jsxs)(n.p,{children:["The project is licensed under the ",(0,t.jsx)(n.a,{href:"https://mit-license.org/",children:"MIT License"})," because of its permissive nature and the fact\nthat it is compatible with most open source licenses."]})]})}function h(e={}){const{wrapper:n}={...(0,i.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(d,{...e})}):d(e)}},8453:(e,n,s)=>{s.d(n,{R:()=>o,x:()=>a});var t=s(6540);const i={},r=t.createContext(i);function o(e){const n=t.useContext(r);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:o(e.components),t.createElement(r.Provider,{value:n},e.children)}}}]);