# crud
Mazdak Atighi CRUD app

#Install
clone or unzip, npm install then npm start

#Instructions
Basic CRUD App Project
 
Description:
    - Build a basic CRUD app using nodejs with expressjs and a front end
interface build in one of three frameworks: angular, react, or ember.
    - By the end of this exercise, the user should be able to CREATE a new
resource, GET an existing resource, UPDATE an existing resource, and
DELETE an existing resource
    - Style the app however you would like, but don't spend too much time
on this. The main point of this exercise is to create the CRUD
functionality.
 
 
Technology Requirements:
- server
 - nodejs
 - expressjs with session store
- client
 - angular, ember, or react (pick one)
 
Client description
    - Simple front end CRUD form submission
    - resource fields to submit:
        - id (string) (label, display only after the resource is created)
        - name (string) (text input)
        - age (number) (number input)
        - address (string)
 
 - there should be a list that displays all stored resources and the
ability to click and edit the resource
 - you should be able to click on a stored resource and edit it and
update it to the server
 - you should be able to delete existing resources
 - any updates UPDATES to the resource should be done on focus off of
the field
 - there should be a delete button that explicitly removes the
resource. This should prompt the user to confirm they want to delete
(note, only store in server session storage, don't worry about database)
 
 
 
Server description
- Create a single route with GET/PUT/POST/DELETE http methods
- When creating a resource, generate an id and set it on the resource
(randomly generate this so it is unique)
- When creating a resource (after the id is set), store the resource
session storage for later retrieval/modification
- When deleting the resource, it should be removed entirely from
session storage
- when updating the resource, it should update what is in session
storage
- when any resource is sent to the server, type validation should be
done to ensure each field is the expected type (see client description for
types)
