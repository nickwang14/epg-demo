### NickWang14 Electronic Program Guide

[Project Github](https://github.com/nickwang14/epg-demo)

## 🚀 Run this project:

This project is set up with [concurrently](https://www.npmjs.com/package/concurrently).

Simple run `npm i && npm run start` to launch the app and mock server

## 🚧 Challenges:

Time-zone issues were interesting, defaulted to UTC to save trouble
Scroll on mount issues without using class component
Filling in and cleaning EPG data. Lots of unexpected turns with data organization
Images hosted on cloudberry were broken

## Design Example:

We have included some mockup designs to act as a guide. You can find them in the `./mockups` folder.

Example EPG design:

![alt text](https://raw.githubusercontent.com/NoriginMedia/candidate-tester/master/mockups/EPG_small.png "Logo Title Text 1")

NOTE: Additional screens are optional and only if you really want to impress us with your skillz (Yes.. with a Z) should you add them to your app.

---

## Mock-API:

There was a basic mock api provided by Norigin Media:

This is packaged as a standard Node NPM module. To install simply run: `-> npm install` from the project root directory.
Of course Node.JS should be installed beforehand. For Native Developers not familar with NPM here is the [NPM Documentation](https://docs.npmjs.com/getting-started/installing-node)

To run the update & run mock-api server execute the command below:

```
-> npm run start
```

You should see the server start on port 1337.

```
Mock service running at http://localhost:1337
```

You can now request data from the mock-api:
`Try It: http://localhost:1337/epg`

For additional information you can find the package and the documentation here: [Norigin Mock-API](https://github.com/NoriginMedia/mock-api/tree/cloudberry)

---
