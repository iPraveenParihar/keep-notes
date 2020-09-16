const router = require("express").Router();

let Note = require("../schemas/noteSchema");

router.route('/').get((req, res) => {
    Note.find()
        .then((notes) => {
            res.json(notes);
        })
        .catch((error) => {
            res.status(500).json({ message: `${error}` });
        });
});

router.route('/add').post((req, res) => {
    const title = req.body.title;
    const noteText = req.body.noteText;
    const noteColor = req.body.noteColor;

    const newNote = new Note({ title, noteText, noteColor });


    newNote.save()
        .then((addedNote) => {
            res.json(addedNote);
        })
        .catch((error) => {
            res.json({
                "status": res.statusCode,
                "message": res.statusMessage
            });
        })

});

router.route('/:id').delete((req, res) => {
    Note.findByIdAndDelete(req.params.id)
        .then((deletedNoted) => {
            res.json({
                "statusCode" : res.statusCode,
                "message" : "Note Deleted!"
            });
        })
        .catch((error) => {
            res.json({
                "statusCode" : res.statusCode,
                "message" : error
            });
        });
});

module.exports = router;