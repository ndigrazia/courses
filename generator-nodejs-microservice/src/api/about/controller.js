const properties = require("../../package.json");

const info = (req, res) => {
    const aboutInfo = { 
        name: properties.name,
        description: properties.description,
        author: properties.author
    }

    res.json(aboutInfo);
}

exports.info = info;
