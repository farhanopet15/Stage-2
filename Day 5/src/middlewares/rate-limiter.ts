import rateLimit from "express-rate-limit";
import router from "../routes/authRoute";

const limiter = rateLimit({
	windowMs: 1 * 60 * 1000,
	limit: 1,
    message:"terlau banyak request, tolong sabar",
});

export default limiter;