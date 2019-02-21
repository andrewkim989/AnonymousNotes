var express = require("express");
var app = express();
var mongoose = require("mongoose");
var path = require("path");

mongoose.connect("mongodb://localhost/notes", { useNewUrlParser: true });

var NotesSchema = new mongoose.Schema({
    note: {type: String, required: [true, "Please type in a note"],
    minlength: [3, "Note must be at least 3 characters long"]}
}, {timestamps: true });

mongoose.model("Note", NotesSchema);
var Note = mongoose.model("Note");

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static(__dirname + "/AnonNotes/dist/AnonNotes"));


app.get("/notes", function(req, res) {
    Note.find({}, function(err, notes) {
        if (err) {
            console.log("Returned error", err);
            res.json({message: "Error", error: err});
        }
        else {
            res.json(notes);
        }
    });
});

app.post("/notes", function(req, res) {
    var note = req.body.note;
    var n = new Note({note: note});

    n.save(function(err){
        if(err) {
            var e = [];
            for (var key in err.errors) {
                var m = {};
                m[key] = err.errors[key].message;
                e.push(m);
            }
            res.json({error: e});
        }
        else {
            res.json(n);
        }
    });
});

app.all("*", (req, res, next) => {
    res.sendFile(path.resolve("./AnonNotes/dist/AnonNotes/index.html"));
});

app.listen(1000, function() {
    console.log("listening on port 1000");
});