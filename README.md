# Library Management System

## Description

In this project, I have developed a Library Management System using GraphQL API. The main objective of this project is to provide an efficient way to manage books and authors, users. The system allows users to perform various operations on books and authors, track borrowed books by users, and fetch books by a specific author or authors of a particular book. This assignment helped in understanding the implementation of GraphQL queries, mutations, and handling relationships between different entities effectively.

## Features

1. Manage Books
   - Add Book
   - Update Book
   - Delete Book
   - List All Books
   - Get Book By bookId
   - Get Book By Filter
   - Search Book By SearchKey
     
2. Manage Authors
   - Add Author
   - Update Author
   - Delete Author
   - Get All Authors
   - Get Author By Id
   - SearchAuthor By SearchKey
  
3. Manage Users
   - Get All Users
   - Get User By Id
   - Create a new User
   - Update Users
   - Delete Users

4. Manage Borrow Records
   - Get all Borrowed Books
   - Get all Borrowed Boooks for User
   - Mark a book as borrowed by a user
   - Return a borrowed book

## Technologies Used
   - Node.js
   - Express.js
   - TypeScript
   - GraphQL
   - MongoDB 
   - Apollo Server
   - CI/CD

## Prerequisites
  - Node.js 
  - MongoDB
  - Docker
  - GraphQL
  - Git/Github
  - CI/CD
  - Server
    
## **Installation**

### 1. Clone the repository: 
   ```
      https://github.com/gaurav637/Library-System
   ```
### 2. Navigate to the project directory:
   ```
       cd Backend
   ```
### 3. Open the project in your IDE:

 VS Code (recommended) or IntelliJ IDEA
 
### 4. Create a .env file in the root directory:
   ```
     .env
   ```
### 5. Configure the environment variables:
   ```
     PORT=8080
     MONGO_URI=mongodb://localhost:27017/you_db_name
   ```
### 6. Install dependencies:
   ```
      yarn install
  ```
### 7. Start the server:
   ```
     yarn dev
   ```
    
## **Docker Setup**   

### 1. Build Docker Image
   ```
     docker build -t library-system .
   ```
### 2. Run Docker Container
   ```
      docker run -p 8080:8080 library-system
   ```
### 3. Check Running Containers
   ```
     docker ps
   ```
### 4. Stop Docker Container
   ```
      docker stop container-id
   ```

    
## **Git/Github**

### 1. Check the modified files
   ```
      git status
   ```
### 2. Add all changes
   ```
       git add .
   ```
### 3. Commit your changes
   ```
     yarn commit
   ```
- you show different options
    ````
  Select the type of change that you're committing: (Use arrow keys)
    
  feat:     A new feature 
  fix:      A bug fix 
  docs:     Documentation only changes 
  style:    Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
  refactor: A code change that neither fixes a bug nor adds a feature 
  perf:     A code change that improves performance 
```
### 4. Push code
   ```
      git push origin -u branch_name 
      

## **ER - Diagram**

<img width="604" alt="Screenshot 2025-04-09 at 6 57 27 PM" src="https://github.com/user-attachments/assets/dac8a015-9a5e-4e47-9956-e500b731cb28" />


## **FLow of my Code**

<img width="726" alt="Screenshot 2025-04-09 at 8 38 48 PM" src="https://github.com/user-attachments/assets/e630760b-ca34-4320-a392-3f5db5d7a142" />


## **API Documents**

### User:- 

  ### Create a New User
   - **Mutation:**
     ```graphql
        {
          mutation Mutation($userInput: UserInput!) {
              createNewUser(userInput: $userInput) {
                   name
                   email
                   phone
                   password
                   profileImage
              }
         }
      }

    
- **Description:** Creates a new User.
   - **Variables:**
     ```json
        {
           "userInput": {
            "name": "Vikram Singh",
               "email": "vikram.singh@example.com",
               "phone": "9876501234",
               "password": "Vikram@123",
               "profileImage": "https://dummyimage.com/300x300/000/fff&text=Vikram"
           }
        }
     ```
   - Response:
     - 201 Created
       ```json
         {
           "data": {
             "createNewUser": {
               "name": "Vikram Singh",
               "email": "vikram.singh@example.com",
               "phone": "9876501234",
               "password": "$2b$10$7jxD0.4QpaSAR1b6K9lgje8UhdZ0jGCjLzxvl9fOZlcUARg9S3T/2",
               "profileImage": "https://dummyimage.com/300x300/000/fff&text=Vikram"
             }
           }
        }
     ```

  ### Update User Data
   - **Mutation:**
     ```graphql
        mutation Mutation($id: ID!, $userInput: UpdateUserInput!) {
           updateUser(id: $id, userInput: $userInput) {
                name
                email
                password
                phone
           }
       }
     ```

   - **Description:** Update User data by UserId.
   - **Variables:**
     ```json
        {
           "id": "67f7501cc2fc20c2c29e39f0",
           "userInput": {
             "name": "vikram khurana 1",
             "email": "vikram@123"
           }
        }
     ```
   - Response:
     - 200 Updated
       ```json
         {
           "data": {
             "updateUser": {
               "name": "vikram khurana 1",
               "email": "vikram@123",
               "password": "$2b$10$7jxD0.4QpaSAR1b6K9lgje8UhdZ0jGCjLzxvl9fOZlcUARg9S3T/2",
               "phone": "9876501234"
             }
           }
         }
     ```

 ### Delete User Data
   - **Mutation:**
     ```graphql
        mutation Mutation($id: ID!) {
           deleteUser(id: $id) {
             _id
             name
             email
             phone
           }
        }
     ```

   - **Description:** Delete User data by UserId.
   - **Variables:**
     ```json
        {
           "id": "67f5f3893741f9d8c1f9d2f5"
        }
     ```
   - Response:
     - 200 Deleted
       ```json
         {
           "data": {
             "deleteUser": {
               "_id": "67f5f3893741f9d8c1f9d2f5",
               "name": "Rahul Sharma",
               "email": "rahul.sharma@example.com",
               "phone": "9876543210"
             }
           }
         }
     ```

 ### Get All User Data
   - **Description:** Get All Users data.
   - **Query:**
     ```graphql
        query {
           getAllUsers {
             _id
             name
             email
           }
        }
     ```

   - Response:
     - 200 List all Users
       ```json
         {
           "data": {
             "getAllUsers": [
                  {
                    "_id": "67f5f3b63741f9d8c1f9d2f7",
                    "name": "Priya Verma",
                    "email": "priya.verma@example.com",
                    "password": "Priya@123"
                  },
                  {
                    "_id": "67f5f3cc3741f9d8c1f9d2f9",
                    "name": "Amit Patel",
                    "email": "amit.patel@example.com",
                    "password": "Amit@123"
                  }
              ]
            }
         }
     ```

 ### Get User By Id
   - **Query:**
     ```graphql
        query($getUserByIdId: ID!) {
           getUserById(id: $getUserByIdId) {
             _id
             name
             email
             phone
             password
           }
         }
     ```

   - **Description:** Get User data by UserId.
   - **Variables:**
     ```json
        {
           "getUserByIdId": "67f5f3b63741f9d8c1f9d2f7"
        }
     ```
   - Response:
     - 200 get By Id
       ```json
         {
           "data": {
             "getUserById": {
               "_id": "67f5f3b63741f9d8c1f9d2f7",
               "name": "Priya Verma",
               "email": "priya.verma@example.com",
               "phone": "9123456780",
               "password": "Priya@123"
             }
           }
         }
     ```


### Book:- 

  ### Add New Book
   - **Mutation:**
     ```graphql
        mutation Mutation($bookInput: BookInput!) {
           addNewBook(bookInput: $bookInput) {
                 _id
                title
                description
                price
                stock
                category
                author
                publishYear
                publisher
                language
                stock
           }
       }

     ```

   - **Description:** Add a new Book.
   - **Variables:**
     ```json
        {
          "bookInput": {
            "title": "MongoDB for Beginners",
            "description": "Step by step guide to learn MongoDB NoSQL database.",
            "category": "Database",
            "author": ["6610f26dbf4563abc1234567"],
            "price": 399,
            "publishYear": 2021,
            "publisher": "DB Publisher",
            "language": "English",
            "pages": 290,
            "stock": true
          }
        }
     ```
   - Response:
     - 201 Created
       ```json
         {
           "data": {
             "addNewBook": {
               "_id": "67f7661399db8677d904434a",
               "title": "MongoDB for Beginners",
               "description": "Step by step guide to learn MongoDB NoSQL database.",
               "price": 399,
               "stock": true,
               "category": "Database",
               "author": [
                 "6610f26dbf4563abc1234567"
               ],
               "publishYear": 2021,
               "publisher": "DB Publisher",
               "language": "English"
             }
           }
         }
     ```

### Update Book by bookID
   - **Mutation:**
     ```graphql
        mutation Mutation($id: ID!, $input: UpdateBookInput!) {
           updateBookById(id: $id, input: $input) {
             _id
             title
             description
             price
             stock
             category
             publishYear
             publisher
             language
           }
       }
     ```

   - **Description:** Update book data by bookId
   - **Variables:**
     ```json
        {
           "id": "67f4b6d838cad949d995baed",
           "input": {
             "title": "About Gaurav Negi",
             "description": "Updated Description",
             "price": 999,
             "stock": true,
             "category": "Programming in java",
             "publishYear": 2024,
             "publisher": "TechBooks PB",
             "language": "English"
           }
        }
     ```
   - Response:
     - 200 Updated.
       ```json
         {
           "data": {
             "updateBookById": {
               "_id": "67f4b6d838cad949d995baed",
               "title": "About Gaurav Negi",
               "description": "Updated Description",
               "price": 999,
               "stock": true,
               "category": "Programming in java",
               "publishYear": 2024,
               "publisher": "TechBooks PB",
               "language": "English"
             }
           }
         }
     ```

### Delete Book by bookID
   - **Mutation:**
     ```graphql
        mutation Mutation($id: ID!) {
           deleteBookById(id: $id){
             _id
             title
             description
             price
             stock
             category
             author
             publishYear
             publisher
             language
             stock
           }
       }
     ```

   - **Description:** Delete book data by bookId
   - **Variables:**
     ```json
         {
           "id": "67f4b59db88f9faf28fd39ba"
         }
     ```
   - Response:
     - 200 Deleted.
       ```json
         {
           "data": {
             "deleteBookById": {
               "_id": "67f4b59db88f9faf28fd39ba",
               "title": "Mastering Node.js",
               "description": "Learn backend development using Node.js from scratch.",
               "price": 499,
               "stock": true,
               "category": "Programming",
               "author": [
                 "6610f26dbf4563abc1234567"
               ],
               "publishYear": 2023,
               "publisher": "TechMaster Publication",
               "language": "English"
             }
           }
         }
     ```

  ### Get Book By Id
   - **Query:**
     ```graphql
        query($getBookByIdId: ID!) {
           getBookById(id: $getBookByIdId) {
             _id
             title
             description   
           }
        }
     ```

   - **Description:** Get Book data by bookId.
   - **Variables:**
     ```json
        {
           "getBookByIdId": "67f3d2f3c630fbf48e31e520"
        }
     ```
   - Response:
     - 200 get book By Id
       ```json
         {
           "data": {
             "getBookById": {
               "_id": "67f3d2f3c630fbf48e31e520",
               "title": "GraphQL with Node.js",
               "description": "Complete guide to learn GraphQL with Node.js"
             }
           }
         }
     ```

### Get all Books
   - **Description:** Get all Books data.
   - **Query:**
     ```graphql
        query {
           getAllBooks {
             _id
             title
             description
           }
        }
     ```
   - Response:
     - 200 get All Books
       ```json
         {
           "data": {
             "getAllBooks": [
                  {
                    "_id": "67f3d2f3c630fbf48e31e520",
                    "title": "GraphQL with Node.js",
                    "description": "Complete guide to learn GraphQL with Node.js"
                  },
                  {
                    "_id": "67f4b68eb88f9faf28fd39bc",
                    "title": "Mastering Node.js",
                    "description": "Learn backend development using Node.js from scratch."
                  },
                  {
                    "_id": "67f4b6d838cad949d995baed",
                    "title": "About Gaurav Negi",
                    "description": "Updated Description"
                  },
                  {
                    "_id": "67f4b73538cad949d995baef",
                    "title": "Fullstack Development with MERN",
                    "description": "Complete guide for Fullstack Development using MongoDB, Express, React, and Node.js."
                  }
                ]
            }
        }
     ```

### Get Books By filter
   - **Description:** Get Books data by filter various fields.
   - **Query:**
     ```graphql
        query {
           getBooksByFilter(filter: { title: "Mas"}, page: 1, limit: 5) {
             _id
             title
             stock
           }
        }
     ```
   - Response:
     - 200 get book By filter
       ```
         {
           "data": {
             "getBooksByFilter": [
               {
                 "_id": "67f4b68eb88f9faf28fd39bc",
                 "title": "Mastering Node.js",
                 "stock": true
               }
             ]
           }
         }
   

 ### Search Books
   - **Description:** Search the Book by various fields.
   - **Query:**
     ```graphql
        query {
           searchBooksBySearchKey(searchKey: "Mastering", page: 1, limit: 5) {
             _id
             title
             description
             author
             price
           }
        }
     ```

   - Response:
     - 200 get book By searchKey
       ```json
         {
           "data": {
             "searchBooksBySearchKey": [
               {
                 "_id": "67f4b68eb88f9faf28fd39bc",
                 "title": "Mastering Node.js",
                 "description": "Learn backend development using Node.js from scratch.",
                 "author": [
                   "6610f26dbf4563abc1234567"
                 ],
                 "price": 499
               }
             ]
           }
         }
     ```


### Author:-




















### Add New Author
   - **Mutation:**
     ```graphql
        mutation Mutation($authorInput: AuthorInput!) {
           addNewAuthor(authorInput: $authorInput) {
             name
             bio
             dob
             nationality
             awards
             website
             profileImage
             Address
           }
      }

     ```

   - **Description:** Add a new Author.
   - **Variables:**
     ```json
        {
          "authorInput": {
            "name": "Ankit Joshi",
            "bio": "DevOps Engineer",
            "dob": "1992-12-30",
            "nationality": "Indian",
            "awards": "Cloud Specialist 2023",
            "website": "https://ankitjoshi.dev",
            "profileImage": "https://dummyimage.com/300x300/000/fff&text=Ankit",
            "Address": ["661234abcd1234abcd1234b6"]
          }
       }
     ```
   - Response:
     - 201 Created
       ```json
         {
           "data": {
             "addNewAuthor": {
               "name": "Ankit Joshi",
               "bio": "DevOps Engineer",
               "dob": "1992-12-30T00:00:00.000Z",
               "nationality": "Indian",
               "awards": "Cloud Specialist 2023",
               "website": "https://ankitjoshi.dev",
               "profileImage": "https://dummyimage.com/300x300/000/fff&text=Ankit",
               "Address": null
             }
           }
         }
     ```

### Update Author by authorID
   - **Mutation:**
     ```graphql
           mutation Mutation($id: ID!, $authorInput: AuthorInput!) {
              updateAuthor(id: $id, authorInput: $authorInput) {
                bio
                dob
                name
                nationality
                Address
              }
           }
     ```

   - **Description:** Update Author data by authorId
   - **Variables:**
     ```json
        {
           "id":"67f521a6dd496473a6d809ca",
           "authorInput": {
               "bio": "Software Engineer 2",
               "dob": "1998-05-15T00:00:00.000Z",
               "name": "Mohan Kumar",
               "nationality": "Indian",
               "Address": ["djfksd903940394fd"]
           }
        }
     ```
   - Response:
     - 200 Updated.
       ```json
         {
           "data": {
             "updateAuthor": {
               "bio": "Software Engineer 2",
               "dob": "1998-05-15T00:00:00.000Z",
               "name": "Mohan Kumar",
               "nationality": "Indian",
               "Address": null
             }
           }
         }
     ```

### Delete Author by authorId
   - **Mutation:**
     ```graphql
        mutation Mutation($deleteAuthorId: ID!) {
           deleteAuthor(id: $deleteAuthorId) {
             _id
             name
             bio
             dob
          }
       }
     ```

   - **Description:** Delete Author data by AuthorId
   - **Variables:**
     ```json
         {
           "deleteAuthorId": "67f77489a7a720a82836cfe5"
         }
     ```
   - Response:
     - 200 Deleted.
       ```json
         {
           "data": {
             "deleteAuthor": {
               "_id": "67f77489a7a720a82836cfe5",
               "name": "Ankit Joshi",
               "bio": "DevOps Engineer",
               "dob": "1992-12-30T00:00:00.000Z"
             }
           }
        }
     ```

  ### Get Author By Id
   - **Description:** Get Author data by AuthorId.
   - **Query:**
     ```graphql
        query($getAuthorByIdId: ID!) {
           getAuthorById(id: $getAuthorByIdId) {
             _id
             name
             dob
             bio
           }
      }
     ```
   - **Variables:**
     ```json
         {
           "getAuthorByIdId": "67f521a6dd496473a6d809ca"
         }
     ```
   - Response:
     - 200 get Author By Id
       ```json
         {
           "data": {
             "getAuthorById": {
               "_id": "67f521a6dd496473a6d809ca",
               "name": "Mohan Kumar",
               "dob": "1998-05-15T00:00:00.000Z",
               "bio": "Software Engineer 2"
             }
           }
       }
     ```

### Get all Authors
   - **Description:** Get all Authors data.
   - **Query:**
     ```graphql
        query {
           getAllAuthor {
             _id
             bio
             dob
             name
             nationality
           }
        }
     ```
   - Response:
     - 200 get All Authors
       ```json
         {
           "data": {
             "getAllAuthor": [
               {
                 "_id": "67f521a6dd496473a6d809ca",
                 "bio": "Software Engineer 2",
                 "dob": "1998-05-15T00:00:00.000Z",
                 "name": "Mohan Kumar",
                 "nationality": "Indian"
               },
               {
                 "_id": "67f521efdd496473a6d809cc",
                 "bio": "Full Stack Developer",
                 "dob": "1995-02-20T00:00:00.000Z",
                 "name": "Rahul Sharma",
                 "nationality": "Indian"
               }
             ]
          }
       } 
     ```

### Search Authors
   - **Description:** search authors by searchKey
   - **Query:**
     ```graphql
        query {
           searchAuthor(searchKey: "Rahul Sharma",page: 1,limit: 3) {
             _id
             name
             nationality
             bio
             dob
           }
        }
     ```
   - Response:
     - 200 Search by searchKey
       ```json
         {
           "data": {
             "searchAuthor": [
               {
                 "_id": "67f521efdd496473a6d809cc",
                 "name": "Rahul Sharma",
                 "nationality": "Indian",
                 "bio": "Full Stack Developer",
                 "dob": "1995-02-20T00:00:00.000Z"
               }
             ]
           }
         }
     ```

## **Contributing**

Contributions are welcome! Please follow these guidelines:

- Fork the repository
- Create a new branch (`git checkout -b feature`)
- Make changes and commit them (`yarn commit`)
- Push to the branch (`git push origin feature`)
- Create a pull request

## **Contact**

For any questions or feedback, please reach out to : negigaurav637@gmail.com

GAURAV NEGI
