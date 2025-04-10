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

  ### Create a New User
   - **Mutation:**
     ```json
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
     ```json
        mutation Mutation($id: ID!, $userInput: UpdateUserInput!) {
           updateUser(id: $id, userInput: $userInput) {
                name
                email
                password
                phone
           }
       }

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
     ```json
        mutation Mutation($id: ID!) {
           deleteUser(id: $id) {
             _id
             name
             email
             phone
           }
        }

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
     ```json
        query {
           getAllUsers {
             _id
             name
             email
           }
        }

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
     ```json
        query($getUserByIdId: ID!) {
           getUserById(id: $getUserByIdId) {
             _id
             name
             email
             phone
             password
           }
         }

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
