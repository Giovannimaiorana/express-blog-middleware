//importazione express
const express = require("express");
const dotenv = require("dotenv");
const postsRouter = require("./routers/post");
const errorMiddle = require("./middlewares/error");
const errorNotFound = require("./middlewares/routeNotFound");

dotenv.config();

//istanza di express
const app = express();

//configurazione per file statici
app.use(express.static("public"));

//configurazione express per dati urlencoded
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Benvenuto nel mio blog!");
});

//rotte per pizza
app.use("/posts", postsRouter);


//per errori da inserire sempre come ultimo elemento
app.use(errorMiddle);
//per pagina non trovata
app.use(errorNotFound);

// Avviamo il server
app.listen(process.env.PORT || 3000, () => {
    console.log(`Server running on http://localhost:${process.env.PORT}`);
});