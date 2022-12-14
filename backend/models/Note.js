const mongoose = require('mongoose');
const { Schema } = mongoose;

const NotesSchema = new Schema({
    //forign key of user key
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tags: {
        type: String,
        default: "Genral"
    },
    Date:{
        type: Date,
        default: Date.now
    },

});

const Note = mongoose.model('notes', NotesSchema);
Note.createIndexes();
module.exports = Note

// module.export = mongoose.model('notes',NotesSchema);