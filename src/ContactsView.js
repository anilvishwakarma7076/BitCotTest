import React, { useEffect, useState} from 'react';
import database from '../src/firebase';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Link } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { useParams } from 'react-router-dom';

const initialData = {
    userid: "",
    contact_name: "",
    contact_mail: "",
    contact_mob: "",
    contact_add: ""
}
const ContactsView = () => {
    const [state,setState]=useState(initialData);
    const [data, setData] = useState({});
    const { id } = useParams();
    useEffect(() => {
        database.ref("Contact_table").on("value", (snapshot) => {
          if (snapshot.val() != null) {
            setData({ ...snapshot.val() });
          }
          else {
            setData({});
          }
        })
      }, [id]);
      useEffect(() => {

        if (id) {
          setState({...data[id] });
        }
    
        else {
          setState({...initialData });
        }
    
      }, [id, data]);
      const { contact_add, contact_mob, contact_name, userid, contact_mail } = state;
    const handleChange=(e)=>{
        const {name,value}=e.target;
        setState({...state,[name]:value});
    }
    return (
        <>
        
        <div className='container mt-4'>
            <form
                className='container border border-black col-sm-4 mt-4 mb-3 shadow' >
                <h2 className='text-center text-danger'>View Contact</h2>
                
  <ul class="list-group list-group-horizontal">
  <li class="list-group-item">Name:</li>
  <li class="list-group-item">{state.contact_name}</li>
</ul>
<ul class="list-group list-group-horizontal">
  <li class="list-group-item">Email:</li>
  <li class="list-group-item">{state.contact_mail}</li>
</ul>
<ul class="list-group list-group-horizontal">
  <li class="list-group-item">PhoneNumber:</li>
  <li class="list-group-item">{state.contact_mob}</li>
</ul>
<ul class="list-group list-group-horizontal">
  <li class="list-group-item">Address:</li>
  <li class="list-group-item">{state.contact_add}</li>
</ul>
            </form>
        </div>
        </>
    );
}

export default ContactsView;