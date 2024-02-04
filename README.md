#  REST API for an e-commerce system
A RESTful API example for simple  e-commerce system  with Go

It is a just simple  example for making simple RESTful API  using **Node Js**  and **MangoDB** (Atlas)

## Installation & Run
```bash
# Download this project
go https://github.com/MMM192/e-commerce-system-Rest-api.git
```


```go
# Installation
--> cd e-commerce-system-Rest-api-main
--> npm install

#run test cases
--> npm test

#run server
--> npm run dev


# API PORT : 5001
# Base URL : http://localhost:5001/api/products
```


## Structure
```
e-commerce-system-Rest-api-master
│   ├── node_modules
│   ├── Postman_collection
│   ├── src                        
│   │   ├── models                 // modles for product is defined here
│   │   |   └── product.js
│   │   ├── routes                 // routes are defined here 
│   │   |   └── productRoutes.js            
│   │   └── tests                  //  test cases are written here 
│   │       └── test.js              
│   │           
│   ├── package-lock.json
│   ├── package.json
│   ├── server.js                     // Our API core handlers (app)
│   └── babel.config.js       
```

## API 
#### ROOT URL - http://localhost:5001

#### /api/products
* `GET` : Get all product
* `POST` : Create a new product

#### /api/products/search
* `GET` : serch product 
 

#### /products/name/:productName
* `PUT` : Update Product
 
#### /products/name/:productName
* `DELETE` : Delete Product

#### /products/:productName/variants
* `POST` : Add new variant


#### /products/name/:productName/variant/:variantName
* `PUT` : Update variant

#### /products/variants
* `DELETE` : Delete variant

## Links
Postman Documentation  -  https://documenter.getpostman.com/view/21886136/2s9YywdJmN



 
