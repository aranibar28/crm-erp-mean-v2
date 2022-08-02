require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { db_connection } = require("./database/config");
const port = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());
db_connection();

// Rutas API
app.use("/api/auth", require("./routes/auth"));
app.use("/api/collaborators", require("./routes/collaborators"));
app.use("/api/customers", require("./routes/customers"));
app.use("/api/prospect", require("./routes/prospect"));
app.use("/api/courses", require("./routes/course"));
app.use("/api/cycles", require("./routes/cycles"));
app.use("/api/inscriptions", require("./routes/inscription"));
app.use("/api/payments", require("./routes/payments"));
app.use("/api/products", require("./routes/product"));

app.listen(port, () => {
  console.log("Servidor corriendo Puerto: " + port);
});
