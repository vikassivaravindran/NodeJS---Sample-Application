var chai = require('chai');

var expect = chai.expect;
var should = chai.should();
var chaiHttp = require('chai-http');
var orderservice = require('../service/order-service');

chai.use(chaiHttp);
var order = {
	"orderId":"15",
	"productName":"Fridge",
	"locationName":"India",
	"quantity":1
}
describe('postOrder()',function(){
	
	it('should post order successfully and return 200',(done)=>{
		chai.request('http://localhost:8085/')  
		.post('order/')
		.send(order)
		.end((err, res)=> {
			expect(res).to.have.status(200);
			res.body.should.be.a('object');
			done();
		});
		
	});
});    
describe('getOrder()',function(){
	
	it('should get order successfully',(done)=>{
		chai.request('http://localhost:8085/')  
		.get('order/get/15')    
		.end((err, res)=> {
			expect(res).to.be.json;
			expect(res.body).to.eql(order);
			res.body.should.be.a('object');
			res.body.should.have.property('productName');
			done();
		});
	});
});