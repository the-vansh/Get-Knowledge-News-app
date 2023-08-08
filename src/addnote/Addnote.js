import React from 'react'
import { useState,useContext } from 'react';
import noteContext from '../context/notes/notecontext';
import "./addnote.css";
export default function Addnote(props) {

    const context = useContext(noteContext);
    const {addNote}=context;
    const [note,setnote] = useState({title:"",description:"",tag:""});

    const handleclick=(e)=>{
        e.preventDefault();
       addNote(note.title,note.description,note.tag);
       setnote({title:"",description:"",tag:""})
       props.showAlert("Added Successfully","success");
    }
    const onchange=(e)=>{
        setnote({...note,[e.target.name]: e.target.value});
    }
  return (
    <div className="container my-7 upper" >
        <h1>Add a Note</h1>
        <form className='my-3'>
        <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" name="title"aria-describedby="emailHelp" value={note.title} onChange={onchange} placeholder="Enter the Title"/>
            <div id="text" className="form-text"></div>
        </div>
        <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onchange} placeholder="Enter the Description"/>
        </div>

        <div className="mb-3">
            <label htmlFor="tag" className="form-label">Tag</label>
            <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onchange} placeholder="Enter the Tag"/>
        </div>
        <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-dark" onClick={handleclick}>Add Note</button>
        </form>
    </div>
  )
}