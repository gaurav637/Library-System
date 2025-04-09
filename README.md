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
    
## ** Docker Setup **   

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
