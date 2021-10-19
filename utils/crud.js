const db = require('../DummyData');

function findEntrie(id) {
	let start = 0;
    let end = db.length - 1;

    while (start <= end) {
        let middle = Math.floor((start + end) / 2);

        if (db[middle].id == id) {
            return middle;
        } else if (db[middle].id < id) {
            start = middle + 1;
        } else {
            end = middle - 1;
        }
    }
	// key wasn't found
    return -1;
}

const createEntries = (req, res, next) => {
    const {
        isFeatured,
        listingTitle,
        listedCompany,
        listingLocation,
        timeRegistered,
        listingType,
        role,
        level,
        languages
    } = req.body.data;

    if (!(isFeatured && listingTitle && listedCompany && listingLocation && timeRegistered && listingType && role && level && languages)) {
        res.status(400).send({
            "message": "all fields must be provided"
        })
    } else {
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
    if (db) {
        res.status(200).json(db)
    } else {
        res.status(404).send({
            "message": "DB not found"
        });
    }

    return next();
}

const updateEntries = (req, res, next) => {
    const id = req.params.id;
    if (!id) {
        res.status(400).send({ "message": "id must be provided" })
    }
    else {
        const entrieIndex = findEntrie(id);
        if(entrieIndex == -1) {
            res.status(404).send({ "message": "entrie not found" })
        }
        else {
            for (const [key, value] of Object.entries(req.body.data)) {
                db[entrieIndex][key] = value;
            }

            res.status(200).send({ "message": "entrie edited successfully", "data": db[entrieIndex] })
        }
    }

    return next();
}

const deleteEntries = (req, res, next) => {
    const id = req.params.id;
    if (!id) {
        res.status(400).send({ "message": "id must be provided"})
    }
    else {
        const entrieIndex = findEntrie(id)
        if(entrieIndex == -1) {
            res.status(404).send({ "message": "entrie not found" })
        }
        else {
            db.splice(entrieIndex, 1);
            res.status(200).send({ "message": "Entrie deleted", "data": db })
        }
    }

    return next();
}

module.exports = {
    createEntries,
    readEntries,
    updateEntries,
    deleteEntries,
};