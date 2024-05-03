const express = require("express");

const app = express();

app.get("/api", (req, res, next) => {
    res.json(
        {
            message: "Welcome to the API",
        }
    );
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));