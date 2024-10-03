const express = require("express");
const jparser = require('body-parser')
const app = express();
const port = 3000;

app.get("/", (req, res) => {
res.send("");
});

app.use(jparser.urlencoded({ extended: true }));
app.use(jparser.json({ extended: true }));


app.get("/", (req, res) => {
    res.json({
        links: [
            {
            href: "/api",
            rel: "api",
            type: "GET",
        },
    ],
});
});

app.listen(port, () => {
console.log(`Any sound from port: ${port}?`);
});