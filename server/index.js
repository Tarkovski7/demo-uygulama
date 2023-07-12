import express from "express";
const app = express();
import routes from "./routes";
import cors from "cors";

app.use(cors());

app.use("/api", routes);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
  console.log("bağlandı..");
});
