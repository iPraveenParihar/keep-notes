const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const noteRouter = require("./routes/noteRoute");
app.use('/notes',noteRouter);

// app.use(express.static(path.join(__dirname, '/build')))
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '/build'))
// })


if(process.env.NODE_ENV === "production"){
  app.use(express.static('client//build'));
}


app.listen(PORT, console.log(`Server is starting at ${PORT}`));