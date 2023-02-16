import express from 'express';
import { PersonModel } from '../Models/Persons';
import { TicketModel } from '../Models/Ticket';

const router = express.Router();



/**
 * Route        /ticket
 * Des          POST route for assigning the incoming ticket to persons
 * Params       none
 * Access       Public
 * Method       POST
 */
var counter=0;
router.post('/ticket',async(req,res)=>{
    try{
        const user_id=req.body.user_id
        //assigns 
        counter=(counter+1) % 6;
        if(counter==0)
            counter=counter+1;
        const lastObj=await TicketModel.findOne().sort({_id:-1}).limit(1);
        const ticket_id=lastObj._id+1;
        console.log("the ticket id is"+ticket_id)
        const assigning_ticket=await PersonModel.findOneAndUpdate(
            {_id:counter},
            {
                $push:{tickets_assigned:ticket_id}
            },{new:true})
        const addTicket=await TicketModel.create({
            _id:ticket_id,
            issue:req.body.issue,
            AssignedTo:counter,
            RaisedBy:user_id,
            new:true
        })
        console.log(addTicket)
        console.log(assigning_ticket)
        //incrementing the previous id
            // return res.status(200).json({
            //     message:"Ticket has been Assigned!",
            //     success:true,
            //     data:{
            //         ticket_id:ticket_id,
            //         assigned_to:counter
            //     }
            // })
        const response={
            "message":"Ticket has been Assigned!",
            "success":true,
            "data":{
                "ticket_id":ticket_id,
                "assigned_to":counter
            }
        }
        
            return res.send(`
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <h3>Response is here :-</h3>        
    <p>${JSON.stringify(response)}</p>
    <br>
    <i>Go back to home to see assigned Person</i>
            <a href="/"><button class="btn btn-primary">Go Back To Home</button></a>
            `)
    }
    catch(err){
        res.status(500).json({error:err})
    }
})



export default router;

