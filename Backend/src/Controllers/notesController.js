import Note from "../model/Note.js"

export async function getAllNotes (req,res) {
    try {
        const notes = await Note.find();
        res.status(200).json(notes);
    } catch (error) {
        console.error("Error in getNoteById controller", error);
        res.status(500).json({message: "Internal Server Error"});
    }
}

export async function getNoteById (req,res) {
    try {
        const note = await Note.findById(req.params.id);
        if(!note) return res.status(404).json({message:"Note not found!!"})
        res.status(200).json(note);
    } catch (error) {
        console.error("Error in getNoteById controller", error);
        res.status(500).json({message: "Internal Server Error"});
    }
}

export async function createNote (req,res) {
    try {
        const {title, content} = req.body
        const note = new Note({title:title, content:content})

        const savedNote = await note.save()
        res.status(201).json(savedNote);
    } catch (error) {
        console.error("Error in createNotes controller", error);
        res.status(500).json({message: "Internal Server Error"});
    }
}

export async function updateNote (req,res) {
    try {
        const {title,content} = req.body
        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id, 
            { title, content },
            { new: true }
    );

    if(!updatedNote) return res.status(404).json({message:"Note not found"});

        res.status(200).json(updatedNote);
    } catch (error) {
        console.error("Error in updateNotes controller", error);
        res.status(500).json({message: "Internal Server Error"});
    }
}

export async function deleteNote (req,res) {
    try {
        const {title, content} = req.body;
        const deletedNote = await Note.findByIdAndDelete(req.params.id);
        if(!deletedNote) return res.status(404).json({message:"Note not found"});
        res.status(200).json({message:"Notes deleted successfully!"});    //Even if you not add status, it'll be by default 200
    } catch (error) {
        console.error("Error in deleteNotes controller", error);
        res.status(500).json({message: "Internal Server Error"});        
    }
}