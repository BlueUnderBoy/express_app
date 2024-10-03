const express = require("express");
const jparser = require('body-parser');
const app = express();
const port = 3000;

app.get("/", (req, res) => {
res.send("");
});

app.use(jparser.urlencoded({ extended: true }));
app.use(jparser.json({ extended: true }));

app.use(express.static(path.join(__dirname, 'templates')))

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

app.use((req, res, next) => {
    next(error(404, "Resource Not Found"));
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({ error: err.message });
    });

app.listen(port, () => {
console.log(`Sounds coming from port: ${port}.`);
});