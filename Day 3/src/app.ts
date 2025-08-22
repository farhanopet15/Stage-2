import express from "express";
import productRouter from "./routes/product";
import userRouter from "./routes/user";
import postRouter from "./routes/post";
import orderRouter from "./routes/order";
import transferRouter from "./routes/transfer"

const app = express();
app.use(express.json());

app.use("/api/v1", productRouter);
app.use("/api/v1", userRouter);
app.use("/api/v1", postRouter);
app.use("/api/v1", orderRouter);
app.use("/api/v1", transferRouter);
app.use((err:any, req:any, res:any, next:any) => {
    console.log(err);
    res.status(err.status || 500).json({ error: err.massage || "internal server gajalan"});
})

app.listen(process.env.PORT, () => {
    console.log("Server is running");
});