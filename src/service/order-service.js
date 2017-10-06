var Order = require("../model/Order");
var HashMap = require('hashmap');
var orderRepo = require("../Repo/order-repo.js");
/* var orderRepo={
	orderMap:null,
	
	initializeMap:function(){
		
		console.log("hasp map initialization");
		this.orderMap = new HashMap();
	},
	save:function(order){
		console.log("order repo save is called"+JSON.stringify(order)+"orderId:"+order.orderId);
		
		this.orderMap.set(order.orderId,JSON.stringify(order));
		
	},
	getOrder:function(orderId){
		console.log("order repo get is called:"+orderId);
		console.log("order has keys?"+this.orderMap.keys());
		console.log("order:"+this.orderMap.get(orderId));
		console.log("order:"+this.orderMap.get(1));
		return this.orderMap.get(orderId);
	}
	
};

orderRepo.initializeMap(); */
var orderservice={
	
	/* orderRepo:null,
	setOrderRepo:function(repo){
		this.orderRepo=repo;
	},
	getOrderRepo:function(){
		return this.orderRepo;
	}, */
	save:function(order){
		console.log("order service save is called");
		//this.getOrderRepo().save(order);
		orderRepo.save(order);
		
	},
	getOrder:function(orderId){
		console.log("order service get is called");

		//return this.getOrderRepo().getOrder(orderId);
		var order = (orderRepo.getOrder(orderId))
		return order;		
		
	},
	getOrders:function(){
		console.log("order service get is called");

		//return this.getOrderRepo().getOrder(orderId);
		var order = (orderRepo.getOrders())
		return order;		
		
	},
	updateOrder:function(order){
		
		console.log("Update Order is called");
		var orderCount = orderRepo.updateOrder(order);
		return orderCount;
	}
	
	
	
};
//orderservice.setOrderRepo(orderRepo);

module.exports = orderservice;
