import express = require("express");
import router from "./routes/post-route";
import { errorHandler } from "./middleware/errorHandler";

const app = express();

app.use(express.json());

app.use("/api/v1", router);

app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log("server is running");
});
