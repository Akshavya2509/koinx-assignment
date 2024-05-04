# koinx-blockchain-backend-assignment

**How to use locally?**

- Clone the repository

```
git clone https://github.com/Akshavya2509/koinx-blockchain-backend-assignment.git
```

- Install the packages using the package manager of your choice (eg: npm, pnpm, yarn)

```
<package_manager> install
```

- The env file is already included in the repository along with the env variables `API_KEY, DB_URL, PORT and ADDRESS`. The MongoDB instance has been deployed on Atlas. Incase you wish to use mongodb locally you can use the url `'mongodb://localhost:27017/'` instead of the one mentioned in the .env.

- To run the application use the command

```
nodemon src/app.js
```

**Folder Structure:**

```
└── 📁src
    └── app.js
    └── 📁controllers
        └── transactionController.js
    └── 📁cron
        └── checkEthereumPrice.js
    └── 📁database
        └── dbConnect.js
    └── 📁lib
        └── implementChecker.js
    └── 📁models
        └── ethereumPriceSchema.js
        └── TransactionSchema.js
    └── 📁routes
        └── transactionRoute.js
```

**Tasks:**

- To fetch the user transactions, use the following endpoint:

```
koinx-assignment-production.up.railway.app/user/getUserTransactions
```

Example usage:
![Task1](https://asset.cloudinary.com/ds5wmytro/6687fa5ab5b84d96b4ded0f470bc12ba "Example usage")

- A Cron job has been set up to fetch the data from the Gecko API at a 10-minutes interval. The cron job function can be found at `src/lib/implementChecker.js` and is called in app.js from `src/cron/checkEthereumPrice.js`.

- For fetching the current user balance and current price of ether, use the following endpoint:

```
koinx-assignment-production.up.railway.app/user/getUserBalance?address=0xce94e5621a5f7068253c42558c147480f38b5e0d
```

Example usage:
![Task3](https://asset.cloudinary.com/ds5wmytro/df0eeda7c2505c9db89e3930e08e11b0 "Example usage")

Replace `koinx-assignment-production.up.railway.app` with `http://localhost:3000` for local testing
