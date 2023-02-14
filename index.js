const express = require("express");
const router = require("./routes/router");

const app = express();
const PORT = 9348;

app.use(express.json());
app.use(router);

app.listen(PORT, () => console.log(`server work on port:${PORT}`));
