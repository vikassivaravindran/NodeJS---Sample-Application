var express = require('express');
var Order = require('../model/Order');
var orderservice = require('../service/order-service');
var router = express.Router();
var amqp=require('amqplib/callback_api');
var redis = require('redis');	
var client = redis.createClient();
client.on("error",function(err){
	console.log("Error:",err);
});

//var order = null;
/**
 * @swagger
 * definition:
 *   Order:
 *     properties:
 *       orderId:
 *         type: string
 *       productName:
 *         type: string
 *       locationName:
 *         type: integer
 *       quantity:
 *         type: string
 */
/**
 * @swagger
 * /order/:
 *   post:
 *     tags:
 *       - Orders
 *     description: Creates a new order
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: order
 *         description: order object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Order'
 *     responses:
 *       200:
 *         description: Successfully created
 */
router.post('/',function(req,res){
	
	console.log('order post is called');
	//var connection = amqpConn;
	//console.log("con in order",connection);
	var order = new Order(req.body.orderId,
						req.body.productName,
						req.body.locationName,
						req.body.quantity);
	orderservice.save(order);
	res.setHeader('Content-Type', 'application/json');
	res.json(JSON.parse(order));
	amqp.connect('amqp://localhost',function(err,conn){
		conn.createChannel(function(err,ch){
		var q = 'messageQueue1';
		ch.assertQueue(q,{durable:false});
		console.log("Order:",order);
		ch.sendToQueue(q,new Buffer(JSON.stringify(order)));
		console.log("sent to queue:",JSON.stringify(order));
		client.set(order.orderId,JSON.stringify(order),redis.print);
	 });
	
		
	});	

});

/**
 * @swagger
 * /order/get/{orderId}:
 *   get:
 *     tags:
 *       - Orders
 *     description: Returns a single order
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: orderId
 *         description: order's id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: A single order
 *         schema:
 *           $ref: '#/definitions/Order'
 */
router.get('/get/:orderId',function(req,res){
	var order=null;
	var orderId=req.params.orderId;
	console.log("orderId"+orderId);
	client.get(orderId,function(err,reply){
			if(reply == null){
				console.log("Given Order not available in cache");
				order = orderservice.getOrder(orderId).then(function(rows){   
					console.log("order fetched from DB:"+JSON.stringify(rows));
					res.writeHead(200, { 'Content-Type': 'application/json'});
					res.end(JSON.stringify(rows));					
				}).catch(function(e){
					console.log(e.stack);
				});
			}
			else{
				order=reply.toString();
				console.log("order fetched from Redis:"+order);
				console.log("order"+JSON.stringify(order));
				res.json(JSON.parse(order));
			}
			
		});
	 
	
	
});

/**
 * @swagger
 * /order/getAllOrders:
 *   get:
 *     tags:
 *       - Orders
 *     description: Returns a single order
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: A Array of order
 *         schema:
 *           $ref: '#/definitions/Order'
 */
router.get('/getAllOrders',function(req,res){
	var order=null;
	
	
			
				
				order = orderservice.getOrders().then(function(rows){   
					console.log("order fetched from DB:"+JSON.stringify(rows));
					res.writeHead(200, { 'Content-Type': 'application/json'});
					res.end(JSON.stringify(rows));					
				}).catch(function(e){
					console.log(e.stack);
				});
			
			
		
	 
	
	
});
/**
 * @swagger
 * /order/update:
 *   put:
 *     tags:
 *       - Orders
 *     description: Returns a updated order
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: order
 *         description: order object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Order'
 *	    responses:
 *       200:
 *         description: Successfully created
 */
router.put('/update',function(req,res){
	
	var order = new Order(req.body.orderId,
						req.body.productName,
						req.body.locationName,
						req.body.quantity);	
				console.log("Received Order",order);
				client.set(order.orderId,JSON.stringify(order),redis.print);
				orderservice.updateOrder(order).then(function(rows){   
					console.log("No of Rows fetched from DB:"+JSON.stringify(rows));
					res.writeHead(200, { 'Content-Type': 'application/json'});
					res.end(JSON.stringify(rows +" Rows were updated Successfully"));					
				}).catch(function(e){
					console.log(e.stack);
				});
			
			
		
	 
	
	
});

module.exports = router;