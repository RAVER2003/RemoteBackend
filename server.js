const app = require("./app");

const mongoose = require("mongoose");
mongoose
  .connect("mongodb+srv://joshi:tadwi@cluster0.mbjvtev.mongodb.net/Khetomate?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => {
    console.log("database connected");
    app.listen(8005, () => {
      console.log("Server started");
    });
  })
  .catch((err) => {
    console.log(err);
  });
