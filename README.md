# Serverless Architecture


Tech Stack: Google Cloud Functions, NodeJS, Serverless, Lerna, webpack, Typescript


* Issue: Bundle and deploy group of cloud functions (CF) as a service
Google Cloud SDK allows us to deploy one functions at a time. I want to bundle multiple CFs as a service for easy management.
* My Solution: Use Serverless (it's a framework):

* Issue: Internal-dependency management:
In Monorepo application, usually there will be common shared modules such as database access or logging. To identify the dependencies within the Monorepo for building and packaging is important.
* My Solution: Use Lerna

* Issue: Deploy Cloud Functions with Private Dependencies
Private Dependencies are the dependencies that are not/cannot be published to NPM registry, therefore when the CF is deployed, the npm install fails to download the dependencies.
* My Solution: Use Webpack as tarball files does not work properly with Learn to dependency discovery
