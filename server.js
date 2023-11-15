//importazione express
const express = require("express");
const dotenv = require("dotenv");
const postsRouter = require("./routers/post");

dotenv.config();

//istanza di express
const app = express();

//configurazione per file statici
app.use(express.static("public"));

//configurazione express per dati urlencoded
app.use(express.urlencoded({ extend: true }));

app.get("/", (req, res) => {
    res.send("Benvenuto nel mio blog!");
});

//rotte per pizza
app.use("/posts", postsRouter);



// Avviamo il server
app.listen(process.env.PORT || 3000, () => {
    console.log(`Server running on http://localhost:${process.env.PORT}`);
});