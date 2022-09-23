import './App.css';
import {Routes,  Route,Navigate} from "react-router-dom";
import Contactlist from './components/contacts/contactlist/Contactlist';
import Navbar from './components/navbar/Navbar';
import Addcontacts from './components/contacts/addcontacts/Addcontacts';
import Editcontact from './components/contacts/editcontact/Editcontact';
import Viewcontact from './components/contacts/viewcontacts/Viewcontact';
// import Spinner from './components/spinner/Spinner';
function App() {
  
  return (  
  
    <>
 {/* <Spinner/> */}
   <Navbar/>

   <Routes>
   <Route path={'/'} element={<Navigate to ={'/Contactlist/list'}/>}/>
    <Route path={'/Contactlist/list'} element={<Contactlist/>}/>
    <Route path={'/Contactlist/add'} element={<Addcontacts/>}/>
    <Route path={'/Contactlist/edit/:contactId'} element={<Editcontact/>}/>
    <Route path={'/Contactlist/view/:contactId'} element={<Viewcontact/>}/>

    <Route/>
   </Routes>
    
    </>
    
    )
}

export default App;
