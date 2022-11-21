import express from "express";
import dotenv from "dotenv";
import connectDatabase from "./config/mongoDB.js";
import ImportData from "./dataImport.js";
import productRoutes from "./routes/productRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import mailRouter from "./routes/mailRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

import userRoutes from "./routes/userRoutes.js";
import { errorHandle, notFound } from "./middleware/Error.js";
import imgRouter from "./routes/imageRoutes.js";
import fileUpload from "express-fileupload";

dotenv.config();
connectDatabase();
const app = express();

//API
app.use(express.json({ limit: "50mb" }));
app.use(
  express.urlencoded({
    limit: "50mb",
    extended: true,
  })
);

app.use(
  fileUpload({
    useTempFiles: true,
  })
);
app.use("/api/import", ImportData);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/email", mailRouter);
app.use("/api/category", categoryRoutes);
app.use("/api/uploads", imgRouter);
app.get("/", (req, res) => {
  res.send("server is running....");
});

// ERROR HANDLE
app.use(notFound);
app.use(errorHandle);

const PORT = process.env.PORT || 1000;

app.listen(PORT, console.log(`server running port ${PORT}.....`));
