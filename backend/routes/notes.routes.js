const express= require("express");

const {NotesModel}=require("../model/notes.model");


const noteRouter= express.Router();
 



//the create router
noteRouter.post("/create",async(req,res)=>{
    const noteData= req.body;
    const note=new NotesModel(noteData);
    await note.save()
    res.send("the note has been created");
})


//to get all the notes
//read router
noteRouter.get("/",async(req,res)=>{
    const notes=await NotesModel.find();
    res.send(notes);
})


//to delete the notes
noteRouter.delete("/delete/:id", async (req, res) => {
    const noteID = req.params.id;
    const note = await NotesModel.findOne({ "_id": noteID })
    const userID_note = note.userID;
    const userID_req = req.body.userID
    try {
        if (userID_req !== userID_note) {
            res.send({ "msg": "You are not Authorized" });
        } else {
            await NotesModel.findByIdAndDelete({ _id: noteID });
            res.send({ "msg": `Note with id ${noteID} has been Deleted` });
        }

    } catch (error) {

        res.send({ "msg": "unable to delete note", "error": error.message });
    }
})




noteRouter.patch("/update/:id", async (req, res) => {
    const payload = req.body;
    const noteID = req.params.id;
    const note = await NotesModel.findOne({ "_id": noteID })
    const userID_note = note.userID;
    const userID_req = req.body.userID;
    try {
        if (userID_req !== userID_note) {
            res.send({ "msg": "You are not Authorized" });
        } else {
            await NotesModel.findByIdAndUpdate({ _id: noteID }, payload);
            res.send({ "msg": `Note with id ${noteID} has been updated` });
        }

    } catch (error) {

        res.send({ "msg": "unable to update note", "error": error.message });
    }

})



module.exports={
    noteRouter
}