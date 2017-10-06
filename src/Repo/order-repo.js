var mysql = require('mysql');
var Promise = require('promise');
var con = mysql.createConnection({
	host : "localhost",
	user : "root",
	password : "root",
	database : "myproject"

});
con.connect(function(err) {
	if (err)
		throw err;
	console.log('connected to MySql');

});
/*
 * var sql = "create table order_items(orderId varchar(25),productName
 * varchar(25),locationName varchar(25),quantity int)";
 * con.query(sql,function(err,result){ if(err) throw err; console.log('Table
 * created',result); });
 */
var orderRepo = {
	save : function(order) {
		console.log("Order in repository", order);
		con.query('insert into order_items set ?', order,
				function(err, result) {
					console.log("Insert");
					if (err)
						throw err;
					console.log('values inserted', result);

				});
	},
	getOrder : function(orderId) {
		
			var order = null;
			return new Promise(function(resolve,reject){
				con.query("select * from order_items where orderId='"+orderId+"'",function(err,rows,fields){
					console.log("Rows Fetched:"+JSON.stringify(rows));
					order=rows;
					if(err){    
						console.log(err);
						 reject(err);
					}
					else{    
						resolve(order);
					}
	
				}); 
			}).then(function(){
				return order;
				});		
	},
	getOrders : function() {
		
			var order = null;
			return new Promise(function(resolve,reject){
				con.query("select * from order_items",function(err,rows,fields){
					console.log("Rows Fetched:"+JSON.stringify(rows));
					order=rows;
					if(err){    
						console.log(err);
						 reject(err);
					}
					else{    
						resolve(order);
					}
	
				}); 
			}).then(function(){
				return order;
				});		
	},
	updateOrder : function(order) {
		
			
			return new Promise(function(resolve,reject){
				con.query("update order_items set productName=? , locationName=?,quantity=? where orderId=?",[order.productName,order.locationName,order.quantity,order.orderId],function(err,result){
					if(err){    
						console.log(err);
						 reject(err);
					}
					else{    
						resolve(result.affectedRows);
					}
	
				}); 
			});	
	}
	
	
}

module.exports = orderRepo;