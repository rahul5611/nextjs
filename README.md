# nextjs

# prerequisites:

1. NodeJS
2. ReactJS
3. NextJS
4. Mongodb


    **To start with nextJS**, Create a nextJS web application
     => npx create-next-app@latest nextjs

   **Note** -> In above command, **nextjs** is the name of application.

   To Run the Application ->
     npm run dev

   **Note** Above command is used to run the application in dev.


   In Mongodb ->
     Create an database named - **reactDB**

     Now, we need 4 Collections in reactDB database
   1. User
   2. Inventory
   3. role
   4. rolemaster
  
      **Content for rolemaster**:

[{
  "id": "product",
  "label": "Product",
  "page": "Product",
  "roles": [
    "Admin",
    "Guest"
  ]
},
{
  "id": "guest",
  "label": "Guest",
  "page": "Guest",
  "roles": [
    "Guest"
  ]
},
{
  "id": "quiz",
  "label": "Quiz",
  "page": "Quiz",
  "roles": [
    "Admin",
    "User"
  ]
},
{
  "id": "inventory",
  "label": "Inventory",
  "page": "Inventory",
  "roles": [
    "Admin"
  ]
},
{
  "id": "profile",
  "label": "Users",
  "page": "Users",
  "roles": [
    "Admin",
    "User",
    "Editor"
  ]
},
{
  "id": "assignRole",
  "label": "Roles",
  "page": "Roles",
  "roles": [
    "Admin"
  ]
}]




      
