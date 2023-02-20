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
noteRouter.delete("/delete/:id",async (req,res)=>{
    const noteID=req.params.id;
    await NotesModel.findByIdAndDelete({_id:noteID});
    res.send("the note was deleted");
})

// patch the notes
noteRouter.patch("/updata/:id",async(req,res)=>{
    const id=req.params.id;

    const updatedData=req.body;

    try{
        await NotesModel.findByIdAndUpdate({_id:id},updatedData);
        console.log("the data has been updated");
        res.send(updatedData);
    }
    catch(err){
        console.log("the data could not be updated");
    }
})



module.exports={
    noteRouter
}