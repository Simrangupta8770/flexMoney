const express = require('express');
const bodyParser = require('body-parser');
// const dotenv = require("dotenv");
const connectDB = require('./config/db');
const UserReg =require('./models/UserRegModel');
const cors=require('cors');
const path=require("path");
const app = express();
const PORT = 5000;

app.use(bodyParser.json());
require('dotenv').config();
connectDB();
app.use(cors());
// app.use('/api/reg',(req,res)=>{
    
// });
app.post('/reg', async (req, res) => {
  try {
    const { name, email, age, slot, month } = req.body;

    
    const newReg = new UserReg({
      name,
      email,
      age,
      slot,
      month,
    });

    // Save the user to the database
    await newReg.save();

    res.status(201).json({ message: 'User created successfully', reg: newReg });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
const __dirname1 = path.resolve();

if (true) {
  app.use(express.static(path.join(__dirname1, "/interntask/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}

app.listen(PORT,()=>{
  console.log(`server started ${PORT}`);
})