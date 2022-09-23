import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {Contactservices} from '../../../services/Contactservices';
import Spinner from '../../spinner/Spinner';
function Viewcontact() {
  
  const {contactId} = useParams(); 
  const [singledata, setSingledata] = useState(
    {
      loading: false,
      contacts:[],
      errorMessage:'',
      group:{}
      
      }); 
      
      
      useEffect(()=>{
        (async() => {
      
          try{
            setSingledata ({...singledata, loading:true});
          let response = await Contactservices.getContact(contactId);
          let groupResponse = await Contactservices.getGroup(response.data); 
         

          setSingledata({
            ...singledata, 
            loading:false,
            contacts:response.data,
            group:groupResponse.data
          });
          }catch(error){
            setSingledata ({...singledata, loading:false, errorMessage:error.message});
      
          }
         }) ();
      },[contactId]);



    

      const {group,contacts} = singledata;


  return (
    <>
     <section className='view-contact-intro p-3'>
      <div className="container">
     <div className="row">
<div className="col">

<p className="h3 text-warning fw-bold">View Contact</p>
<p className='fst-italic'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptate, mollitia perspiciatis corrupti a neque consequatur doloremque dicta, nostrum repellendus repudiandae soluta veritatis vel ullam! Temporibus quisquam tempora sed sunt cumque!</p>
  
</div>

  </div>
   </div>
  </section>




   <section className='view-contact mt-3'>
    <div className="container">
       <div className="row align-items-center d-flex justify-content-around">
        
       <div className="col-sm-4">

       <img src={contacts.photo} alt='image' className='img-fluid contact-img'/>
       </div>
         

      <div className="col-sm-8">
        <ul className='list-group'>
                <li className='list-group-item list-group-item-action'>
                  Name: <span className='fw-bold'>{contacts.name}</span>
                </li>
                
                <li className='list-group-item list-group-item-action'>
                  Mobile: <span className='fw-bold'>{contacts.mobile}</span>
                </li>


                <li className='list-group-item list-group-item-action'>
                  Email: <span className='fw-bold'>{contacts.email}</span>
                </li>

                <li className='list-group-item list-group-item-action'>
                  Company: <span className='fw-bold'>{contacts.company}</span>
                </li>

                <li className='list-group-item list-group-item-action'>
                  Title: <span className='fw-bold'>{contacts.title}</span>
                </li>

                <li className='list-group-item list-group-item-action'>
                  Group: <span className='fw-bold'>{group.name}</span>
                </li>


              </ul>
      </div>

       </div>
       <div className="row">
        <div className="col">
<Link to={'/Contactlist/list'} className="btn btn-warning">Back</Link>
</div>
       </div>


    </div>


   </section>

    </>
  )
}

export default Viewcontact
