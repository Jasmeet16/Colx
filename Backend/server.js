const express = require("express");
const dotenv = require("dotenv");
const { connectDb } = require("./config/db");
const { productRoutes } = require("./routes/productRoutes");
const { userRoutes } = require("./routes/userRoutes");
const { uploadRoutes } = require("./routes/uploadRoutes");

const path = require("path");

dotenv.config();

connectDb();

//console.log( typeof( connectDb ) );

const app = express();

app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/user", userRoutes);
app.use("/api/upload", uploadRoutes);

//console.log( path.resolve( __dirname , '..' , 'Frontend' , 'build' ) )

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/../Frontend/build")));
  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "..", "Frontend", "build", "index.html")
    )
  );
} else {
  app.get("/", (req, res) => {
    res.send("api is running");
  });
}
//console.log(path.join(__dirname , '/../uploads'))
app.use("/uploads", express.static(path.join(__dirname, "/../uploads")));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
