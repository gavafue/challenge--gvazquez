
# Project Description


This project has been created by [Gabriel Vázquez](https://github.com/gavafue) for the Lexart Labs technical challenge. The project uses Next.js as framework and MongoDB as database. In addition, it has been deployed in Vercel.

The objective of the project is to create a product search engine that connects to the Mercado Libre and Buscapé (web scrap) websites. The user will be able to select the product category (Mobile, Refrigerator, TV) and the website (Mercado Libre or Buscapé) through drop-down menus. It will also be possible to search for products through a free text field.

After performing the search, a list of products will be displayed on the screen with their photo, description, category, price and website where the information was obtained. The search results will be stored in the database. If the same search is performed again, the results stored in the database will be displayed without having to perform a new search.

The solution will be hosted by Vercel, check here: https://challenge-gvazquez.vercel.app/

# Software Engineering
The project is divided into components that follow the single responsibility principle. In addition, an organized and easy-to-follow folder structure has been implemented.

Git has been used for version control and a production branch has been set up to host the stable version of the project.
# How to execute the project
1. Clone the repository on your local machine.
2. Install the dependencies using the `npm install` command.
3.  Set the environment variables in a `.env` file.
4.  Execute the `npm run dev` command to run the project in development mode.
5.  Execute the `npm run build` command to compile the project into a production-optimized version.
6.  Run the `npm start` command to start the production server.

# Technologies used

 - Next.js
 - MongoDB
 - Vercel
 - Ant Design
 - Axios
