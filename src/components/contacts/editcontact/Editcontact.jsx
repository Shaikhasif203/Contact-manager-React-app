import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { Link, useParams,useNavigate } from 'react-router-dom'
import { Contactservices } from '../../../services/Contactservices';



function Editcontact() {
  const history = useNavigate();
  const {contactId} = useParams();

let [state, setState] = useState({

 loading:false,
 contacts:{
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
    setState({...state, loading:true})
    let response = await Contactservices.getContact(contactId);
   
    let Groupresponse = await Contactservices.getGroups();

    setState({...state, loading:false, contacts:response.data, groups:Groupresponse.data})
    
   }catch(error){

    setState({...state, loading:false, errorMessage:error.message})

   }

  }) ();
},[contactId]);




let updateInput = ((event) => {

 setState({
    ...state, contacts:{...state.contacts,[event.target.name]: event.target.value},
    
 })
  
})



let submitForm = async(e) => {
  e.preventDefault();
  
  try{
  let response = await Contactservices.updateContact(state.contacts,contactId);
    if(response){
      history("/Contactlist/list",{replace:true});
    }
  }catch(error)
  {
    setState({...state,errorMessage:error.message});
    history("/Contactlist/edit", {replace:false})
  }
  }













let {contacts, loading, errorMessage,groups} = state;


  return (
    <>

    <section className='add-contact p-3'>
      <div className="container">

        <div className="row">
           
           <div className="col">
          <p className="h3 text-primary fw-bold">Edit Contact</p>
          <p className="fst-italic">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id, magnam neque veniam quasi, nesciunt voluptatum animi sit tempora exercitationem quaerat officia omnis sequi earum laborum nemo rerum in repellendus unde?</p>
           </div>

        </div>

        <div className="row align-items-center">
        <div className="col-sm-4">
        <form onSubmit={submitForm}>
         <div className='mb-2'>
          <input type="text" className='form-control' placeholder='Name' name="name" value={contacts.name} onChange={updateInput}></input>
         </div>
          
         <div className='mb-2'>
          <input type="text" className='form-control' placeholder='Photo url' name="photo" value={contacts.photo} onChange={updateInput}></input>
         </div>

         <div className='mb-2'>
          <input type="text" className='form-control' placeholder='Number' name="mobile" value={contacts.mobile} onChange={updateInput}></input>
         </div>
      


         <div className='mb-2'>
          <input type="text" className='form-control' placeholder='Email' name="email" value={contacts.email} onChange={updateInput}></input>
         </div>


         <div className='mb-2'>
          <input type="text" className='form-control' placeholder='Company' name="company" value={contacts.company} onChange={updateInput}></input>
         </div>


         <div className='mb-2'>
          <input type="text" className='form-control' placeholder='Title' name="title" value={contacts.title} onChange={updateInput}></input>
         </div>


         <div className='mb-2'>

          <select className='form-control' name="groupId" value={contacts.groupId}  onChange={updateInput}>
           <option >Select a group</option>
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
         <input type="submit" className='btn btn-primary' value='update'/>
       
        

         <Link to={'/Contactlist/list'} className='btn btn-dark ms-2'>Cancel</Link>
             

           </div>

        </form>

        </div>

        <div className="col-sm-6">
        <img src={contacts.photo} alt='image' className='img-fluid contact-img'/>

        </div>


        </div>



      </div>
      
      </section>    
    
    
    
    
    
    
    </>
  )
}

export default Editcontact
