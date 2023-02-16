import mongoose from "mongoose";

const TicketSchema = new mongoose.Schema({
    issue:{
        type:String,
        require:true
    },
    AssignedTo:{
        type:Number,
        require:true
    },
    RaisedBy:{
        type:String,
        require:true
    },
    _id:{
        type:Number
    }
})

export const TicketModel=mongoose.model("Ticket",TicketSchema);