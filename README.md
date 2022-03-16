### **GOOF API**

#### Goof is a delivery service that handles it's users delivery to their door step by acting as a bridge between users and vendors.




### Note: To run test:

Assumption is made that all dependencies have been installed

1. Go into config/database.js and setup test db configurations.
2. set NODE_ENV=test
3. create db: run `npm run create-db:test`
4. create migrations: run `npm run setup:test`
5. create seed data on test db: run `npx sequelize-cli db:seed:all`.
6. After All test drop the db: run `npm run drop-db:test`