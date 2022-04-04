### **GOOF API**
Goof is a delivery service that handles it's users delivery to their door step by acting as a bridge between users and vendors.

 ### DB Schema [Proposed Schema still -> subject to change]:
 Below you would find the link to the database schema. 

 Note: Some operations are not performed on the database but redis hence, they would not be in the schema

 [DB_SCHEMA](https://dbdiagram.io/d/62148066485e433543f462a8)
 [DOCS](https://documenter.getpostman.com/view/16498899/UVysyw6U)

### Services:
 - ## Email
    Note: 
      - You should create an account for both cases (mailtrap and sendgrid) and add the configuration to the config/ development & config/production files respectively.
      - Don't forget to set your environment variables (check example.sh for sample guide).

    - For development, mailtrap (fake smtp server) is used to avoid cluttering your email [MailTrap](https://mailtrap.io)
    - For production, not sure yet


### Note: To run test:

Assumption is made that all dependencies have been installed

1. Go into config/database.js and setup test db configurations.
2. set NODE_ENV=test
3. create db: run `npm run create-db:test`
4. create migrations: run `npm run setup:test`
5. create seed data on test db: run `npm run seed`.
6. test: run `npm run test`
7. After All test drop the db: run `npm run drop-db:test`

### General setup:
 Look into the example.sh file and setup all necessary environment variables

### TODO:
1. create docker compose file to startup the system (because of redis and all ...)
2. create a seperate docker compose file & dockerfile for testing purposes
 