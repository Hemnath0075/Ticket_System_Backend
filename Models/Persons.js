import mongoose from 'mongoose';

const PersonSchema=new mongoose.Schema({
    _id:{
        type:Number,
        required:[true,"Id is madatory"]
    },
    name:{
        type:String,
        required:true
    },
    tickets_assigned:[]
})

export const PersonModel=mongoose.model("Persons",PersonSchema);