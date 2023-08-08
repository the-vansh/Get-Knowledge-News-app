import React from 'react'
import {useContext,useRef,useState } from 'react'
import noteContext from '../context/notes/notecontext';
import Noteitem from './Noteitem';
import Addnote from '../addnote/Addnote';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

export default function Notes(props) {
  let navigate = useNavigate();
    const context = useContext(noteContext);
    const {notes,getNotes,editNote}=context;
    const [note,setnote] = useState({id:"",etitle:"",edescription:"",etag:""});
   useEffect(()=>{
     if(localStorage.getItem('token')){
      getNotes();
     }
     else{
        navigate("/login");
      }
   },[]);
  const ref = useRef(null);
  const refclose = useRef(null);
  const updateNote=(currentNote)=>{
    ref.current.click();
    setnote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag});
  }
  const handleclick=(e)=>{
    editNote(note.id,note.etitle,note.edescription,note.etag);
    refclose.current.click();
    props.showAlert("Updated Successfully","success");
  }
  const onchange=(e)=>{
      setnote({...note,[e.target.name]: e.target.value});
  }
  return (
    <>
    <Addnote showAlert={props.showAlert}/>
    <button  ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
      Launch demo modal
    </button>
    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Edit Notes</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form className='my-3'>
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input type="email" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onchange}/>
                <div id="text" className="form-text"></div>
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onchange}/>
            </div>

            <div className="mb-3">
                <label htmlFor="tag" className="form-label">Tag</label>
                <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onchange}/>
            </div>
            </form>
          </div>
          <div className="modal-footer">
            <button ref = {refclose} type="button" className="btn btn-warning" data-bs-dismiss="modal">Close</button>
            <button onClick={handleclick} type="button" className="btn btn-warning">Save changes</button>
          </div>
        </div>
      </div>
    </div>  
      <div className="row my-3">
       <h1 style={{'margin-left':'40px'}}>YOUR NOTES</h1>
       <div className="container mx-1">
       {notes.length===0 && 'No Notes added yet'} 
       </div>
       {
         notes.map((notes)=>{
         return <Noteitem key = {notes._id} updateNote={updateNote} showAlert={props.showAlert} note={notes}/>
         })
       }
      </div> 
    </>
  )
}