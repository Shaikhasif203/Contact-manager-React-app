import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {Contactservices} from '../../../services/Contactservices';



function Addcontacts() {

  const history = useNavigate();

  const [state, setState] = useState({

    loading:false,
    contacts: {
      name:"",  
      photo:"",  
      mobile:"", 
      email:"",  
      title:"",   
      company:"",
      groupId:""

    },
    groups:[],
    errorMessage:""
  });


  useEffect(()=>{
    (async() => {
  
      try{
        setState({...state, loading:true });
           
        let response = await Contactservices.getGroups();

        setState({...state, loading:false, groups:response.data });
        console.log()
      }catch(error){
        
  
      }
     }) ();
  },[]);


  let updateInput = (event) =>{
   event.preventDefault();
    setState({...state,  contacts:{...state.contacts, [event.target.name] : event.target.value}
    })
  }


let onsubmitForm = async(e) => {
e.preventDefault();

try{
let response = await Contactservices.creatContact(state.contacts);
  if(response){
    history("/Contactlist/list",{replace:true});
  }
}catch(error)
{
  setState({...state,errorMessage:error.message});
  history("/Contactlist/add", {replace:false})
}
}


let {contacts,loading,errorMessage,groups} = state;

  return (
     
    <>
  
    <section className='add-contact p-3'>
      <div className="container">
    
        <div className="row">
           
           <div className="col">
          <p className="h3 text-success fw-bold">Create Contact</p>
          <p className="fst-italic">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id, magnam neque veniam quasi, nesciunt voluptatum animi sit tempora exercitationem quaerat officia omnis sequi earum laborum nemo rerum in repellendus unde?</p>
           </div>

        </div>

        <div className="row">
        <div className="col-sm-4">
        <form onSubmit={onsubmitForm}>
         <div className='mb-2'>
          <input type="text" className='form-control' placeholder='Name' name="name" value={contacts.name} onChange={updateInput} required={true}></input>
         </div>
          
         <div className='mb-2'>
          <input type="text" className='form-control' placeholder='Photo url' name="photo" value={contacts.photo} onChange={updateInput} required={true}></input>
         </div>


         <div className='mb-2'>
          <input type="number" className='form-control' placeholder='Phone' name="mobile" value={contacts.mobile} onChange={updateInput} required={true}></input>
         </div>


         <div className='mb-2'>
          <input type="text" className='form-control' placeholder='Email' name="email" value={contacts.email} onChange={updateInput} required={true}></input>
         </div>


         <div className='mb-2'>
          <input type="text" className='form-control' placeholder='Company' name="company" value={contacts.company} onChange={updateInput} required={true}></input>
         </div>


         <div className='mb-2'>
          <input type="text" className='form-control' placeholder='Title' name="title" value={contacts.title} onChange={updateInput} required={true}></input>
         </div>


         <div className='mb-2'>

          <select className='form-control' name="groupId" value={contacts.groupId} onChange={updateInput}>
          <option>Select option</option>
            {
              groups.length > 0 && 
              groups.map((data)=>{
               
                return <>
                
                <option key={data.id} value={data.id}  onChange={updateInput}>{data.name}</option>
                
                
                </>


              })

            }


          </select>

          
         </div>
         <div className='mb-2'>
         <input type="submit" className='btn btn-success' value='Create'/>
       
        

         <Link to={'/Contactlist/list'} className='btn btn-dark ms-2'>Cancel</Link>
             

           </div>

        </form>

        </div>


        </div>



      </div>
      
      </section>    
    
    
    
    
    
    
    </>




  )
}

export default Addcontacts
