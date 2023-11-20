const express = require('express');
const User = require('./models/user.model');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const Admin = require('./models/admin.model');
const Order = require('./models/order.model');
const mongoose = require("mongoose");
const PORT = process.env.PORT || 5000;


mongoose.connect("CONNECTION_ID_OF_MONGODB_DATABASE");

app.use(bodyParser.json());
app.use(cors())

app.post("/signup", async (req, res, pos) => {
  const data = req.body;
  if (data.position.toLowerCase() === 'user') {
    const user = new User(data)
    await user.save()
    console.log(user)
    res.status(201)
  }
  else if (data.position.toLowerCase() === 'admin') {
    const admin = new Admin(data)
    await admin.save()
    res.status(201)
  }
  
});

app.post("/login", async (req, res) => {
  const { key, password, identity, position } = req.body;
  var email, mno;
  if (key === 'email') {
    email = identity;
    console.log(identity);
    if (position === 'user') {
      const users = await User.findOne({ email });
      console.log(users)
      if (!users) {
        return res.status(401).json({ message: "Invalid email/phone number" });
      }
      if (users.password !== password) {
        return res.status(401).json({ message: "Invalid password" });
      }
      return res.status(200).json({ Auth: true , name:users.name,email:users.email,pos:req.body.position});
    }
    else {
      const admins = await Admin.findOne({ email });
      console.log(admins)
      if (!admins) {
        return res.status(401).json({ message: "Invalid email/phone number" });
      }
      if (admins.password !== password) {
        return res.status(401).json({ message: "Invalid password" });
      }
      return res.status(200).json({ Auth: true,name:admins.name,email:admins.email,pos:req.body.position });
    }
  }
  else {
    if (key === 'mno') {
      mno = identity;
      console.log(identity);
      if (position === 'user') {
        const users = await User.findOne({ mno });
        console.log(users)
        if (!users) {
          return res.status(401).json({ message: "Invalid email/phone number" });
        }
        if (users.password !== password) {
          return res.status(401).json({ message: "Invalid password" });
        }
        return res.status(200).json({ Auth: true , name:users.name,email:users.email,pos:req.body.position});
      }
      else {
        const admins = await Admin.findOne({ mno });
        if (!admins) {
          return res.status(401).json({ message: "Invalid email/phone number" });
        }
        if (admins.password !== password) {
          return res.status(401).json({ message: "Invalid password" });
        }
        return res.status(200).json({Auth:true,name:admins.name,email:admins.email,pos:req.body.position});
      }
    }
  }
})


app.post('/serviceplace',async (req,res)=>{
  
  const data=req.body;
  console.log(data)
  const orders=new Order(data);
  await orders.save();
  res.status(201).json({data:"saved"});
})

app.get('/data', async (req, res) => {
  const orders = await Order.find();
  console.log(orders)
  res.send(orders);
});
app.post('/dataofuser', async (req, res) => {
  const email=req.body.email;
  const orders = await Order.find({email});
  res.send(orders);
});

app.post('/changestatus', async (req, res) => {
  const email=req.body.email;
  const data={
    current_status:true
  }
  await Order.updateOne({email},data);
  res.send("updated sucessfully");
});


app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`)
});
