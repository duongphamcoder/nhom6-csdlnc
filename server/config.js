const mongoose = require("mongoose");

function Connect(app) {
  mongoose
    .connect(
      "mongodb+srv://admin:qWMO1iTxNF125jjm@cluster0.j9leh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
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
