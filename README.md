1. HomeVista

HomeVista is a real estate web application built using the MERN stack (MongoDB, Express, React, Node.js). It provides a seamless user experience for property listings, searching, and filtering based on user preferences.


2. Features

Property Listings: Browse and view detailed information about available properties.
Search and Filter: Search properties by location, price, property type, and more.
User Authentication: Secure login and signup functionality.
Admin Dashboard: Manage property listings and users.
Responsive Design: Optimized for both desktop and mobile devices.
Interactive UI: Built with React and styled for a modern look.


3. Tech Stack

Frontend: React
Backend: Node.js, Express
Database: MongoDB
Authentication: JSON Web Tokens (JWT)

4. Installation
Follow these steps to set up the project locally:

4.1 Prerequisites
    Node.js and npm installed
    MongoDB server running locally or a cloud MongoDB instance

4.2 Steps
   4.2.1 Clone the repository
        git clone https://github.com/Vrind-Shah/HomeVista.git
        cd HomeVista

5.3 Install dependencies
    5.3.1 Backend:
          cd server
          npm install

    5.3.2 Frontend:
         cd client
         npm install

5.4 Set up environment variables
    Create a .env file in the backend directory with the following:

    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret

5.5 Run the application
    5.5.1 Backend:
          cd server
          npm start

    5.5.2 Frontend:
          cd client
          npm run dev
          
5.6 Access the application Open http://localhost:3000 in your browser.

6. Folder Structure

HomeVista/
│
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── server.js
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   └── App.tsx
│   └── public/
│
└── README.md

Contributing
Contributions are welcome! Follow these steps to contribute:

Fork the repository.
Create a new branch: git checkout -b feature-name.
Make your changes and commit: git commit -m "Add feature name".
Push to your branch: git push origin feature-name.
Submit a pull request.
