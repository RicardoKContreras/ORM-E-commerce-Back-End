# E-commerce Back End Starter Code

## User Story 
AS A manager at an internet retail company
I WANT a back end for my e-commerce website that uses the latest technologies
SO THAT my company can compete with other e-commerce companies


## Acceptance Criteria
GIVEN a functional Express.js API
WHEN I add my database name, MySQL username, and MySQL password to an environment variable file
THEN I am able to connect to a database using Sequelize
WHEN I enter schema and seed commands
THEN a development database is created and is seeded with test data
WHEN I enter the command to invoke the application
THEN my server is started and the Sequelize models are synced to the MySQL database
WHEN I open API GET routes in Insomnia for categories, products, or tags
THEN the data for each of these routes is displayed in a formatted JSON
WHEN I test API POST, PUT, and DELETE routes in Insomnia
THEN I am able to successfully create, update, and delete data in my database

## Notes
- Created the ecommerce_db `schema Database` 
- Created the models collumns for `Category, Product, ProductTag, Tag`
- Created associations for `Category, Product, Tag`
- Finished the api routes to include all the `GET, POST, PUT, and DELETE`
- Created a `.env` file to hide the environment variables of `DB_NAME, DB_USER, and DB_PW`
- Using the `dotenv package` to hide the MYSQL username, password, and database
- Using the `MySQL2` and `Sequelize` packages to connect `Express.js API to MYSQL database`
- Syncing the the `Sequelize models to the MySQL` database by the created code inside `server.js`
-run `npm run seed` in the terminal to seed the database
