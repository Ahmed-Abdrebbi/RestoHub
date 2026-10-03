const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

const authRoutes = require("./routes/auth.routes");
app.use("/api/auth", authRoutes);

const orderRoutes = require("./routes/order.routes")
app.use("/api/orders", orderRoutes)

const agentRoutes = require("./routes/agent.routes");
app.use("/api/agent", agentRoutes);

app.get("/health", (req, res) => res.json({ status: "ok" }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));