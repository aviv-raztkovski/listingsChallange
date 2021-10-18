const db = require('../DummyData');

const createEntries = (req, res, next) => {
    const { isFeatured, listingTitle, listedCompany, listingLocation, timeRegistered, listingType, role, level, languages } = req.body.data;

    if (!(isFeatured && listingTitle && listedCompany && listingLocation && timeRegistered && listingType && role && level && languages)) {
        res.status(400).send({"message": "all fields must be provided"})
    }
    else {
        const newEntrie = {
            isFeatured: isFeatured,
            listingTitle: listingTitle,
            listedCompany: listedCompany,
            listingLocation: listingLocation,
            listingType: listingType,
            timeRegistered: timeRegistered,
            role: role,
            level: level,
            languages: languages
        }
        const id = db[db.length - 1].id + 1;
        newEntrie.id = id;
        db.push(newEntrie);

        res.status(200).json(db);
    }

    return next();
}

const readEntries = (req, res, next) => {
    if (db){
        res.status(200).json(db)
    }
    else{
        res.status(404).send({ "message": "DB not found" });
    }

    return next();
}

module.exports = { createEntries, readEntries };