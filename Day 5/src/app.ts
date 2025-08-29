import express from "express";
import authRoute from "./routes/authRoute";
import supplierRoute from "./routes/supplierRoute";
import { corsOptions } from "./middlewares/cors";


const app = express();
app.use(express.json());

app.use(corsOptions)

app.use("/auth", authRoute);
app.use("/suppliers", supplierRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server Running at http://localhost:${PORT}`);
});