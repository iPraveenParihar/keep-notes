const router = require("express").Router();

let Note = require("../schemas/noteSchema");

router.route('/').get((req, res) => {
    Note.find() 
        .then(notes => res.json(notes))
        .catch(error => res.status(400).json('Error'+error));
});

router.route('/add').post((req, res) => {
    const title = req.body.title;
    const noteText = req.body.noteText;
    const noteColor = req.body.noteColor;

    const newNote = new Note({title, noteText, noteColor});

    newNote.save()
        .then(() => res.json("Note added!"))
        .catch(error => res.status(400).json("Error:"+error));
});

router.route('/:id').delete((req, res) => {
    Note.findByIdAndDelete(req.params.id)
        .then(() => res.json("Note Deleted!"))
        .catch(error => res.status(400).json("Error: "+error));
});

module.exports = router;