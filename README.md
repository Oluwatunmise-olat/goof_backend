### **GOOF API**

#### Goof is a delivery service that handles it's users delivery to their door step by acting as a bridge between users and vendors.




### Note: To run test:
1. Go into config/database.js and setup test db configjurations (Note: You have to create the database yourself as sequelize doesn't handle this for you).
2. set NODE_ENV=test
3. Run files in seeder directory on test db (npx sequelize-cli db:seed:all).
4. Before starting test make sure to drop all migartions to have a fresh setup.