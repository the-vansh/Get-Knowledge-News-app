import React from "react";
import { useState } from "react";
import noteContext from "./notecontext";

const Notestate = (props)=>{
  const host="http://localhost:8000"
  const notesInitial=[]

 const [notes,setNotes] = useState(notesInitial);

// get Notes

const getNotes = async()=>{
  const response = await fetch(`${host}/api/notes/fetchallnotes`, {
    method: "GET", 
    headers:{
      "Content-Type": "application/json",
      "auth-token":localStorage.getItem('token')
    },
  });
  const json  = await response.json();
 //console.log(json);
 setNotes(json);
}
// add notes
 const addNote = async(title,description,tag)=>{
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST", 
      headers:{
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
        "auth-token":localStorage.getItem('token')
      },
      body: JSON.stringify({title,description,tag}),
    });
    const note = await response.json();
    setNotes(notes.concat(note));
 }
  //delete a note
  const deleteNote = async(id)=>{
    //api
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE", 
      headers:{
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
        "auth-token":localStorage.getItem('token')
      },
    });

    response.json();
      const newNotes = notes.filter((note)=>{return note._id!==id})
      setNotes(newNotes);
  }

 
 const editNote=async(id,title,description,tag)=>{

     //api

    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT", 
      headers:{
        "Content-Type": "application/json",
        //'Content-Type': 'application/x-www-form-urlencoded',
        "auth-token":localStorage.getItem('token')
      },
      body: JSON.stringify({title,description,tag}),
    });

    await response.json();
   
   //console.log(gt);

   let newNotes = JSON.parse(JSON.stringify(notes));
    // logic to edit note
        for(let index = 0;index<newNotes.length;index++){
          const element = newNotes[index];
          if(element._id===id){
            newNotes[index].title = title;
            newNotes[index].description = description;
            newNotes[index].tag = tag;
            break;
          }
          
        }
        setNotes(newNotes);
  }
  return(
       <noteContext.Provider value={{notes,addNote,deleteNote,editNote,getNotes}}>
             {props.children}
        </noteContext.Provider>
  )
}
export default Notestate;