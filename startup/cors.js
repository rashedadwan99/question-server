const cors = require("cors");
module.exports = (app) => {
  app.use(
    cors({
      origin: [
        "http://localhost:3000",
        "https://question-client.onrender.com/",
        "https://q-dashboard.onrender.com/dashboard",
      ],
    })
  );
};
