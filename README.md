# Authentication System

A robust and secure authentication system built with Node.js, Express, and PostgreSQL. This system handles user registration, login, updates, deletions, and user search functionality.

It is designed to be a solid foundation for any application requiring user authentication.

## Features

-   **User Registration**: Securely register new users with hashed passwords.
-   **User Login**: Authenticate users and issue JWT tokens.
-   **Profile Management**: Update user details.
-   **User Deletion**: Remove user accounts.
-   **User Search**: Find specific user details.
-   **Security**: Uses `bcrypt` for password hashing and `jsonwebtoken` (JWT) for secure transmission.

## Tech Stack

-   **Runtime**: [Node.js](https://nodejs.org/)
-   **Framework**: [Express.js](https://expressjs.com/)
-   **Database**: [PostgreSQL](https://www.postgresql.org/)
-   **Authentication**: JSON Web Token (JWT)
-   **Security**: Bcrypt (for password hashing)

## Prerequisites

Before running this project, ensure you have the following installed:

-   [Node.js](https://nodejs.org/) (v14 or higher recommended)
-   [PostgreSQL](https://www.postgresql.org/)
-   npm (Node Package Manager)

## Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/ProducerG-hub/authentication_system.git
    cd authentication-system
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Database Setup:**
    Create a PostgreSQL database and a `users` table. Run the following SQL commands in your PostgreSQL interface (e.g., pgAdmin or psql):

    ```sql
    CREATE DATABASE auth_db;
    
    -- Connect to the newly created database
    \c auth_db

    -- Create Roles table (referenced by users)
    CREATE TABLE roles (
        id SERIAL PRIMARY KEY,
        name VARCHAR(50) NOT NULL
    );

    -- Insert default roles
    INSERT INTO roles (name) VALUES ('user'), ('admin');

    -- Creating A foreign key for roles table in users table
    ALTER TABLE users
    ADD CONSTRAINT fk_role
    FOREIGN KEY (role_id) REFERENCES roles(id);

    -- Create Users table with role_id as a foreign key to roles table
    CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role_id INT DEFAULT 1 REFERENCES roles(id),
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    ```

4.  **Environment Configuration:**
    Create a `.env` file in the root directory and add the following variables:

    ```env
    PORT=3000
    
    # Database Configuration
    DB_USER=your_postgres_user
    DB_PASSWORD=your_postgres_password
    DB_HOST=localhost
    DB_PORT=5432
    DB_NAME=auth_db
    
    # Security Secrets
    JWT_SECRET=your_super_secret_jwt_key
    SALT_ROUNDS=10
    ```

5.  **Run the Application:**

    For development (with nodemon):
    ```bash
    npm run dev
    ```

    For production:
    ```bash
    npm start
    ```

## API Endpoints

The base URL for all authentication routes is: `http://localhost:3000/api/auth`

### 1. Register User
-   **URL:** `/register`
-   **Method:** `POST`
-   **Body:**
    ```json
    {
        "name": "David Francis",
        "email": "davidfrancis@gmail.com",
        "password": "securepassword123"
    }
    ```

### 2. Login User
-   **URL:** `/login`
-   **Method:** `POST`
-   **Body:**
    ```json
    {
        "email": "davidfrancis@gmail.com",
        "password": "securepassword123"
    }
    ```
-   **Response:** Returns a JWT token upon success.

### 3. Update User
-   **URL:** `/update/:id`
-   **Method:** `POST`
-   **Body:** (Fields to update)
    ```json
    {
        "name": "David Mwakajonga",
        "email": "mwakajongadavid@gmail.com"
    }
    ```

### 4. Delete User
-   **URL:** `/delete/:id`
-   **Method:** `POST`

### 5. Find User
-   **URL:** `/find/:id`
-   **Method:** `POST`

## Project Structure

```
├── controller/
│   └── logics.js       # Business logic for auth operations
├── database/
│   └── connect.js      # Database connection configuration
├── routes/
│   └── urls.js         # API Route definitions
├── index.js            # Entry point of the application
├── .env                # Environment variables (not included in repo)
├── package.json        # Dependencies and scripts
└── README.md           # Project documentation
```

## License

This project is licensed under the ISC License.

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request for any improvements or bug fixes.

## Contact
For any questions or issues, please open an issue on the GitHub repository or contact me at [gwamakamwakabuta@gmail.com].

## Acknowledgements
-   [Node.js](https://nodejs.org/)
-   [Express.js](https://expressjs.com/)
-   [PostgreSQL](https://www.postgresql.org/)
-   [bcrypt](https://www.npmjs.com/package/bcrypt)
-   [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
-   [dotenv](https://www.npmjs.com/package/dotenv)
-   [pg](https://www.npmjs.com/package/pg)
-   [nodemon](https://www.npmjs.com/package/nodemon)
-   [GitHub](https://github.com/)

## Author
-   **Gwamaka Mwakabuta** - [GitHub](https://ProducerG-hub.github.io/) - [Email](mailto:gwamakamwakabuta@gmail.com)
-   **Mlue_Tech** - Company in Tanzania
