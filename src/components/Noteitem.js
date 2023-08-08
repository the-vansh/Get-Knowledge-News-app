import React from 'react'
import noteContext from '../context/notes/notecontext';
import { useContext } from 'react';

export default function Noteitem(props) {
   const context = useContext(noteContext);
   const {deleteNote}=context;
   const {note,updateNote}=props;
  return (
    <div className='col'>
      <div className="card my-3" style={{'width':"max-content",'margin-left':'40px'}}> 
        <div className="card-body">
          <div className="d-flex align-items-center">
           <h3 className="card-title"> {note.title}</h3>
           <button onClick={()=>{deleteNote(note._id);props.showAlert("Deleted Successfully","success");}} className='btn btn-dark mx-5'>Delete</button>
           <button onClick={()=>{updateNote(note)}} className='btn btn-dark mx-2'>Edit</button>
          </div>
            <p className="card-text">{note.description}</p>
           
        </div>
     </div>
    </div>
  )
}
//  onClick={()=>{updateNote(note)}}
//  onClick={()=>{deleteNote(note._id)}}