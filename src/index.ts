import express from "express";
const app = express();
import cors from "cors";
import helmet from "helmet";

// USE HELMET AND CORS MIDDLEWARES
app.use(
  cors({
    origin: ["*"], // Comma separated list of your urls to access your api. * means allow everything
    credentials: true, // Allow cookies to be sent with requests
  })
);
app.use(helmet());

app.use(express.json());

app.get("/", async (req: express.Request, res: express.Response) => {
  try {
    res.send(
      "Welcome to unit testing guide for nodejs, typescript and express!"
    );
  } catch (err) {
    console.log(err);
  }
});

// Start backend server
const PORT = process.env.PORT || 8800;
app.listen(PORT, () => {
  console.log(`Backend server is running at port ${PORT}`);
});

export default app;
