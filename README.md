# Library Catalogue System

Welcome to the Library Catalogue System, a powerful and flexible library management solution built with NestJS, Prisma, and PostgreSQL. This system allows you to efficiently manage your library's resources, organize collections, and  borrowing process.

## Features

- **Catalogue Management:** Effortlessly organize and manage your library's collection with features such as book additions, updates, and deletions.

- **Admin Authentication:** Secure admin authentication system to control access and protect sensitive information.

- **Search and Filters:** Quick and efficient search functionalities along with advanced filtering options for admins to find the resources they need.

- **Borrowing System:** Manage the borrowing and returning of items, including due date reminders.


## Tech Stack

- **NestJS:** A progressive Node.js framework for building efficient, scalable server-side applications.

- **Prisma:** A modern database toolkit that makes database access easy with type safety and auto-generated query builders.

- **PostgreSQL:** A powerful, open-source relational database system for efficient data storage and retrieval.

## Database Schema
![database_diagram](https://cdn.streamerchit.com/anbuchi-database-diagram.png)

## Business Flow 
![Business_flow_diagram](https://cdn.streamerchit.com/business_flow_diagram.png)

## Getting Started

Follow these steps to set up and run the Library Catalogue System locally:

 **Clone the repository:**
   

	   git clone https://github.com/agmyomyat/library-catalogue-system-demo.git
       cd library-catalogue-system-demo
       yarn install
       yarn prisma migrate dev
       yarn start:dev

 **Environment variables**

    DATABASE_URL=postgresql://....
    SHADOW_DATABASE_URL=postgresql://shadow_database_url(optional)
    JWT_SECRET=secret
    JWT_EXPIRES_IN=10d

## API Documentation

## Admin
All admin API endpoints are guarded by an authentication guard. You should first log in to the 'auth' endpoint to obtain an access token. Include the authorization header with the access token when making requests to admin endpoints.
## SignUp
### Endpoint
http://locahost:3000/auth/sign-up

- **Method:** `POST`
- **URL:** `/auth/sign-up`

### Request Body

    {
      "userName":"admin",
      "password":"admin"
    }

## SignIn
### Endpoint

http://locahost:3000/auth/sign-in


- **Method:** `POST`
- **URL:** `/auth`

### Request Body

    {
      "userName":"admin",
      "password":"admin"
    }
  ### Response Body

      {
          "access_token":"ey.....",
      }
 ## Accessing the following API endpoints should all include authorization header
 ### Example
 curl 'localhost:3000/books' 
 headers  'Authorization : {access_token}'

# BOOKs


### Endpoint
http://locahost:3000/books

### Get Books

- **Method:** `GET`
- **URL:** `/books`

## Query Parameters

- `limit` (optional): The maximum number of books to retrieve. Default is 10.
- `offset` (optional): The number of books to skip. Default is 0.
- `author_id` (optional): The ID of the author to filter books by.
- `category_ids` (optional): An array of category IDs to filter books by.
- `catalogue_id` (optional): The ID of the catalog to filter books by.

## Request Example

      GET /books?limit=5&author_id=123&category_ids=456,789&catalogue_id=abc
## Get a Specific Book

### Endpoint

- **Method:** `GET`
- **URL:** `/books/:id`

### Request Example

    GET /books/1

## Create a Book

### Endpoint

- **Method:** `POST`
- **URL:** `/books`

### Request Body

    {
      "title": "New Book",
      "categoryIds": ["123", "456"],
      "authorId": "789"
    }

## Delete a Book

### Endpoint

- **Method:** `DELETE`
- **URL:** `/books/:id`

### Request Example

    DELETE /book/1
## Update a Book

### Endpoint

- **Method:** `PATCH`
- **URL:** `/books/:id`

### Request Body


    {
      "title": "Updated Book Title",
      "categoryIdsToUpdate": ["789"],
      "categoryIdsToDelete": ["456"],
      "authorId": "123"
    }
# Authors

## Get Authors

### Endpoint

- **Method:** `GET`
- **URL:** `/authors`

### Query Parameters

- `limit` (optional): The maximum number of authors to retrieve. Default is 10.
- `offset` (optional): The number of authors to skip. Default is 0.

### Request Example


    GET /authors?limit=5&offset=10
  
  ## Get a Specific Author

### Endpoint

- **Method:** `GET`
- **URL:** `/authors/:id`

### Request Example

    GET /authors/1
 
 ## Create an Author

### Endpoint

- **Method:** `POST`
- **URL:** `/authors`

### Request Body

    {
      "name": "shakespear"
    }

## Delete an Author

### Endpoint

- **Method:** `DELETE`
- **URL:** `/authors/:id`

### Request Example

    DELETE /authors/1

## Update an Author

### Endpoint

- **Method:** `PATCH`
- **URL:** `/authors/:id`

### Request Body

    {
      "name": "Updated Author Name"
    }
## Category

## Get Categories

### Endpoint

- **Method:** `GET`
- **URL:** `/categories`

### Query Parameters

- `limit` (optional): The maximum number of categories to retrieve. Default is 10.
- `offset` (optional): The number of categories to skip. Default is 0.

### Request Example

    GET /categories?limit=5&offset=10
 
## Get a Specific Category

### Endpoint

- **Method:** `GET`
- **URL:** `/categories/:id`

### Request Example

    GET /categories/1

## Create a Book Category

### Endpoint

- **Method:** `POST`
- **URL:** `/categories`

### Request Body


    {
      "title": "New Category"
    }

## Delete a Book Category

### Endpoint

- **Method:** `DELETE`
- **URL:** `/categories/:id`

### Request Example

    DELETE /categories/1
## Update a Book Category

### Endpoint

- **Method:** `PATCH`
- **URL:** `/categories/:id`

### Request Body

    {
      "title": "Updated Category Title"
    }

# Student

## Get Students

### Endpoint

- **Method:** `GET`
- **URL:** `/students`

### Query Parameters

- `limit ` (optional): The maximum number of students to retrieve. Default is 10.
- `offset` (optional): The number of students to skip. Default is 0.

### Request Example

    GET /students?limit=5&offset=10

## Search Students

### Endpoint

- **Method:** `GET`
- **URL:** `/students/search`

### Query Parameters

- `limit` (optional): The maximum number of students to retrieve. Default is 10.
- `offset` (optional): The number of students to skip. Default is 0.
- `email` (optional): Filter students by email address.
- `name` (optional): Filter students by name.

### Request Example

    GET /students/search?limit=5&offset=10&email=aung@gmail.com&name=aung

## Get a Specific Student

### Endpoint

- **Method:** `GET`
- **URL:** `/students/:id`

### Request Example

    GET /students/1

## Create a Student

### Endpoint

- **Method:** `POST`
- **URL:** `/students`

### Request Body


    {
      "name": "Mg Mg",
      "email": "student@gmail.com",
      "phone": "09778711777"
    }
  
  ## Delete a Student

### Endpoint

- **Method:** `DELETE`
- **URL:** `/students/:id`

### Request Example

    DELETE /students/1
## Update a Student

### Endpoint

- **Method:** `PATCH`
- **URL:** `/students/:id`

### Request Body

    {
      "name": "Updated Name",
      "email": "updated.email@gmail.com",
      "phone": "09778711777"
    }
# Book Borrow Record
## Get Borrow Records

### Endpoint

- **Method:** `GET`
- **URL:** `/borrow-records`

### Query Parameters

- `limit` (optional): The maximum number of borrow records to retrieve. Default is 10.
- `offset` (optional): The number of borrow records to skip. Default is 0.

### Request Example

    GET /borrow-records?limit=5&offset=10
## Get a Specific Borrow Record

### Endpoint

- **Method:** `GET`
- **URL:** `/borrow-records/:id`

### Request Example

    GET /borrow-records/1

## Create a Borrow Record

### Endpoint

- **Method:** `POST`
- **URL:** `/borrow-records`

### Request Body

    {
      "bookId": "1",
      "studentId": "2",
      "borrowDate": "2023-11-15T12:00:00Z",
      "returnDate": "2023-12-01T12:00:00Z"
    }
  
  ## Delete a Borrow Record

### Endpoint

- **Method:** `DELETE`
- **URL:** `/borrow-records/:id`

### Request Example

    DELETE /borrow-records/1

