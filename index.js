import express from "express";
import cors from "cors";
import mongoose from "mongoose";
require("dotenv").config();

import TicketRoutes from "./Routes/TicketAssigning";
import { PersonModel } from "./Models/Persons";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("", TicketRoutes);

app.get("/", async(req, res)=>{
  try{
    const id=[323994,3423234,982384,8273847];
    const persons=await PersonModel.find();
    const ids=persons.map((item)=>{
      return item.tickets_assigned
    })
    console.log(ids)
    res.send(`
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <div class="container">
        <h1 class="text-center mt-3 mb-3">Submit Form Data For Ticket Assigning</h1>
        <div class="card">
            <div class="card-header">Sample Form</div>
            <div class="card-body">
                <form method="POST" action="/ticket">
                    <div class="mb-3">
                        <label>User ID</label>
                        <input type="number" name="ticket_id" id="ticket_id" class="form-control" />
                    </div>
                    <div class="mb-3">
                        <label>Issue</label>
                        <input type="text" name="issue" id="issue" class="form-control" />
                    </div>
                    <div class="mb-3">
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </div>
                    </form>
                    </div>
                    </div>
                    <br>
                    <div class="row">
                    <div class="col border"><h3>Person 1 Tickets</h3>
                    <ul>
                    ${ids[0].map((item)=>{
                      return `<li>${item}</li>`
                    }).join('')}
                    </ul></div>
                    <div class="col border"><h3>Person 2 Tickets</h3>
                    <ul>
                    ${ids[1].map((item)=>{
                      return `<li>${item}</li>`
                    }).join('')}
                    </ul></div>
                    <div class="col border"><h3>Person 3 Tickets</h3>
                    <ul>
                    ${ids[2].map((item)=>{
                      return `<li>${item}</li>`
                    }).join('')}
                    </ul></div>
                    <div class="col border"><h3>Person 4 Tickets</h3>
                    ${ids[3].map((item)=>{
                      return `<li>${item}</li>`
                    }).join('')}<ul>
                    </ul></div>
                    <div class="col border"><h3>Person 5 Tickets</h3>
                    <ul> ${ids[4].map((item)=>{
                      return `<li>${item}</li>`
                    }).join('')}</ul></div>
                    </div>
    </div>
              
      `);
  }
  catch(err){
    res.send(err)
  }
  });

app.get("/check", async (req, res) => {
  try {
    res.status(200).json({ status: "Success" });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected To Database"))
  .catch((err) => console.log(err));

const PORT = process.env.Port || 8000;
app.listen(PORT, () => {
  console.log("server is running Successfully");
});
