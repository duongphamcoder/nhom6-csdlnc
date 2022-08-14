const mongoose = require("mongoose");

function Connect(app) {
  mongoose
    .connect(
      "mongodb+srv://admin:dcWeT5TFt51SnyPq@cluster0.zp3h9.mongodb.net/?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(() => {
      console.log("Success.....");
      app.listen(5000, () => {
        console.log("Running success.....");
      });
    });
}

module.exports = Connect;
