class Order{
	
	constructor(orderId,productName,locationName,quantity){
			this.orderId=orderId;
			this.productName=productName;
			this.locationName=locationName;
			this.quantity=quantity;
			}
	
	getOrderId(){
		return this.orderId;
	}
	getProductName(){
		return this.productName;
	}
	getLocationName(){
		return this.locationName;
	}
	
	toString(){
		return JSON.stringify(this);
	}
}

module.exports=Order;