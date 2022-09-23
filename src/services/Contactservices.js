import axios from 'axios'



export class Contactservices{
static serverURL = `http://localhost:9000`;


static getGroups(){
    let dataURL = `${this.serverURL}/groups`;
    return axios.get(dataURL)
}


static getGroup(contact){

    let groupId = contact.groupId;
    let dataURL = `${this.serverURL}/groups/${groupId}`;
    return axios.get(dataURL)

}


static getAllcontacts(){
    let dataURL = `${this.serverURL}/contacts`;
    return axios.get(dataURL)
}

static getContact(contactId){
   let dataURL = `${this.serverURL}/contacts/${contactId}`;
  return axios.get(dataURL);
}


static creatContact(contact){
    let dataURL = `${this.serverURL}/contacts`; 
  return axios.post(dataURL,contact)
}

static updateContact(contact,contactId){
    let dataURL = `${this.serverURL}/contacts/${contactId}`;
   return axios.put(dataURL,contact);
 }


 static deleteContact(contactId){
    let dataURL = `${this.serverURL}/contacts/${contactId}`;
   return axios.delete(dataURL);
 }



}

