import React from 'react'
import { useEffect } from 'react';
import axios from 'axios'
import { useState } from 'react'
import {Link, link} from 'react-router-dom'
// import { Contactservices } from '../../../services/Contactservices';
import {Contactservices} from '../../../services/Contactservices';
import Spinner from '../../spinner/Spinner';



function Contactlist() {

 let [query, setQuery] = useState({
 
   text:"",

 }); 

 




 let [State, setState] = useState(
{
loading: false,
contacts:[],
filteredContact:[],
errorMessage:''

}); 


useEffect(()=>{
  (async() => {

    try{
    setState({...State, loading:true});
    let response = await Contactservices.getAllcontacts();
    setState({...State, loading:false,contacts:response.data,filteredContact:response.data});
    }catch(error){
      setState ({...State, loading:false, errorMessage:error.message})

    }




}) ();
},[]);



let deletedata = async(contactId) => {
try{
  let Response = await Contactservices.deleteContact(contactId);
   

  if(Response){
    setState({...State, loading:true});
    let response = await Contactservices.getAllcontacts();

    setState({...State, loading:false,contacts:response.data, filteredContact:response.data});

  }

  // if(Response){

  //  let newdata = State.filter((item)=>{

  //    return (item.id !== contactId);

  //  })
  //  setState({...State,contacts:newdata.data,});
  // }

}catch(error){
  setState ({...State, loading:false, errorMessage:error.message})
}

}

let searchContact = (event) => {

  setQuery({...query, text:event.target.value})
 
  let theContacts = State.contacts.filter((contact)=>{
    return contact.name.toLowerCase().includes(event.target.value.toLowerCase())
  });
  setState({
  ...State,
  filteredContact:theContacts

  })

 }



let {loading,contacts,filteredContact,errorMessage} = State;

  return (
    <>
   
     <section className='contact-search p-3'>
      <div className='container'>
        <div className='grid'>
          <div className='row'>
            <div className='col'>
             <p className="h3">Contact Manager
             <Link to={'/Contactlist/add'} className="btn btn-primary ms-2"><i className='fa fa-plus-circle'></i> New </Link>
             
             </p>

            <p className="fst-italic">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam et error eligendi mollitia labore, dolore odit doloribus non quos quibusdam velit expedita vero iure reiciendis suscipit, ipsum qui cumque? Temporibus!</p>


            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <form className='row'>

                <div className="col">
                <div className="mb-2">
                <input type="text" value={query.text}  className='form-control' placeholder='Search Name' name="text" onChange={searchContact}/>
                </div>

                </div>

                <div className="col p-0"> <div className="mb-2">
                  <input type="submit" value="search"  className='btn btn-primary '/>
                  </div></div>

               
                
              </form>
            </div>
          </div>
        </div>
       </div>
     </section>


  
  {

  loading ? <Spinner/> : <React.Fragment>

<section className='contact-list'>
      <div className="container">
        <div className="row">

       
       {

         
filteredContact.length > 0 && filteredContact.map((contactdata,index)=>{

     


       return (
       <div className="col-sm-6 py-2" key={contactdata.id}>
       <div className="card">
       <div className="card-body">
         <div className="row align-items-center d-flex justify-content-around">
        <div className="col-sm-4 text-center">
          
           <img src={contactdata.photo} alt='image' className='img-fluid contact-img'/>
        </div>

        <div className="col-sm-7">
         <ul className='list-group'>
           <li className='list-group-item list-group-item-action'>
             Name: <span className='fw-bold'>{contactdata.name}</span>
           </li>
           
           <li className='list-group-item list-group-item-action'>
             Mobile: <span className='fw-bold'>{contactdata.mobile}</span>
           </li>


           <li className='list-group-item list-group-item-action'>
             Email: <span className='fw-bold'>{contactdata.email}</span>
           </li>


         </ul>

        </div>

       <div className="col-sm-1 d-flex flex-column align-items-center">
         <Link to={`/Contactlist/view/${contactdata.id}`} className='btn btn-warning my-1'> <i class="fa fa-eye"></i></Link>
          
         <Link to={`/Contactlist/edit/${contactdata.id}`} className='btn btn-primary my-1'> <i class="fa fa-pencil"></i></Link>


         <button className='btn btn-danger my-1' onClick={()=>deletedata(contactdata.id)}><i className='fa fa-trash'></i></button> 
          
         
       </div>
       </div>
       </div>
       </div>
     </div>

       )
       })
        
       
       


       }






          

          

          


        </div>
      </div>


     </section>


  </React.Fragment> 

  }







     

    </>
  )
}

export default Contactlist
