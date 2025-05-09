# Price List Management System

A full-stack web application for managing product price lists with multilingual support. This application allows users to create, view, edit, and delete products in a centralized dashboard.

## Features

- **User Authentication**: Secure login and signup functionality
- **Product Management**: Create, read, update, and delete product entries
- **Multilingual Support**: Switch between English and Spanish interfaces
- **Responsive Design**: Works on desktop and mobile devices
- **Data Persistence**: All data stored in PostgreSQL database

## Technology Stack

### Frontend

- **Framework**: React 19
- **Routing**: React Router v6
- **State Management**: React Context API
- **UI Animation**: Framer Motion
- **HTTP Client**: Axios
- **Build Tool**: Vite
- **Styling**: CSS with responsive design
- **Icons**: React Icons
- **Notifications**: React Toastify

### Backend

- **Runtime**: Node.js
- **Framework**: Express 5
- **Database**: PostgreSQL
- **Authentication**: JWT (JSON Web Tokens) with bcrypt for password hashing
- **API**: RESTful API architecture
- **Middleware**: CORS for cross-origin resource sharing

## Database Schema

### Users Table

- `id`: Primary key
- `username`: Unique username
- `password`: Hashed password
- `created_at`: Timestamp
- `updated_at`: Timestamp

### Products Table

- `id`: Primary key
- `article_number`: Unique product identifier
- `name`: Product name
- `in_price`: Purchase price
- `price`: Selling price
- `unit`: Unit of measurement
- `in_stock`: Quantity in stock
- `description`: Product description
- `created_at`: Timestamp
- `updated_at`: Timestamp

### Translations Table

- `id`: Primary key
- `language`: Language code (e.g., 'en', 'es')
- `key`: Translation key
- `value`: Translated text
- `created_at`: Timestamp
- `updated_at`: Timestamp

## Setup and Installation

### Prerequisites

- Node.js (v16 or higher)
- PostgreSQL database
- npm or yarn package manager

### Environment Variables

Create a `.env` file in the BE directory with the following variables:

```
PORT=3000
DB_CONNECTION_STRING=postgresql://username:password@localhost:5432/price_list
JWT_SECRET=your_jwt_secret_key
```

### Backend Setup

1. Navigate to the backend directory:

   ```
   cd BE
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

The server will run on http://localhost:3000 by default.

### Frontend Setup

Create .env file in the FE/price_list directory with the following variable:

```
VITE_API_URL=http://localhost:3000/api/

1. Navigate to the frontend directory:

```

cd FE/price_list

```

2. Install dependencies:

```

npm install

```

3. Start the development server:
```

npm run dev

```

The application will be available at http://localhost:5173 by default.

## API Endpoints

### Authentication

- `POST /api/auth/signup`: Create a new user account
- `POST /api/auth/login`: Authenticate a user and receive a JWT token

### Products

- `GET /api/products`: Get all products
- `GET /api/products/:id`: Get a specific product
- `POST /api/products`: Create a new product
- `PUT /api/products/:id`: Update a product
- `DELETE /api/products/:id`: Delete a product

### Translations

- `GET /api/translations/:language`: Get all translations for a specific language

## Default User

The system creates a default admin user on first run:

- Username: `admin`
- Password: `admin123`

## Multilingual Support

The application supports multiple languages through the translation system. Currently implemented languages:

- English (en)
- Spanish (es)

Additional languages can be added by extending the translations table.
```
