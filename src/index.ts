import app from "./app";
import { productRouter } from "./routes/productsRouter";

app.use("/products", productRouter);
