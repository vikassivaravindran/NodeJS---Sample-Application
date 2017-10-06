# Node-JS Application for Swagger and RMQ sender

## steps to run:

npm intsall

node index.js

### Request and Response

 post url : http://localhost:8085/order/
 Request Body : {
	"orderId":"2",
	"productName":"TV",
	"locationName":"chennai",
	"quantity":1
 }
 Response :{
    "orderId": "2",
    "productName": "TV",
    "locationName": "chennai",
    "quantity": 1
 }
 
 get url : http://localhost:8085/order/get/{orderId}
 
 Reposnse:{
	"orderId": "23",
    "productName": "TV",
    "locationName": "chennai",
    "quantity": 1
 }
 
 
 Refer url for swagger.json : http://localhost:8085/swagger.json 
 
 Refer url for swagger-ui : http://localhost:8085/api-docs
 
 ## steps to run test
 
 npm install mocha -g
 
 mocha
 
 ### console output
 
   postOrder()
	connected to MySql
    √ should post order successfully and return 200 (854ms)
	
  getOrder()
  √ should get order successfully (83ms)
  
  2 passing (1s)
