# Arena Talent 🚀

Repository for next major version of Arena.

### Dependencies

- [Node.js and npm](https://nodejs.org/en/) (Would recommend using [nvm](https://github.com/nvm-sh/nvm#installing-and-updating) to manage)
  - Node.JS = 21.6.1
  - npm = 9.6.7
- [aws-cli](https://aws.amazon.com/cli/) aws-cli necessary for a lot of local development functionality and permissions.

## Pre-Installation

1. In arena-ui create a .env and copy and paste this information into it https://docs.google.com/document/d/1HnEMFRJxI1yrlRu_z_idWWE4v-_lNZCjTUENI3rBddI/edit?usp=sharing
2. In arena-server create a .env and copy and paste this information into it https://docs.google.com/document/d/1A5Jaxts63NL232_m5-89cXcH4KTczk51fgOBfj57xDs/edit?usp=sharing

## Installation

```bash
git (https://github.com/ArenaTalent/arenaTalent)
cd arenaTalent
npm install or (npm install --legacy-peer-deps)
cd arena-ui
npm start
cd arena-server
npm start
```

##Branches

- Please make a branch for every new feature
- naming convention should be as follows 'feature-name'
- We will do first pull request together so let me know when you've completed your first ticket

## Troubleshooting

- If the app is throwing many errors during NPM install, please ensure that you are using NVM to version control the Node and NPM for the project.
  - Node.JS = 21.6.0
  - npm = 9.6.7
- If you are having issues with npm dependencies, try `npm install --legacy-peer-deps`
- If port 5000 is being blocked despite restart and you are using mac, it could be your AIRPLAY RECEIVER. Apple has decided to use Node's most common port for it.
- Reach out to Olivia on slack if none of the above work
