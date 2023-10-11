const mongoose=require('mongoose')

const  OrderSchema=mongoose.Schema({
    email:{type:String},
    General_service:{type:Boolean},
    oil_service:{type:Boolean},
    water_service:{type:Boolean},
    final_date:{type:String},
    current_status:{type:Boolean}
})

const Order=mongoose.model('orders',OrderSchema)
module.exports=Order;