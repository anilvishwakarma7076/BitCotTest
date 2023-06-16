import React, { useEffect, useState} from 'react';
import database from './firebase';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Button } from "react-bootstrap";
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
const EditContact = () => {
    const [state,setState]=useState(initialData);
    const [data, setData] = useState({});
    const { id } = useParams();
    const handleReset = () => {
      setState(initialData);
    };
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
    const handleSubmit = (e) => {
        e.preventDefault();
        if (id) {
            updateData();
        }
        else {
          datainsert();
        }
      }
    
      const updateData = () => {
    
        state.userid = userid;
        database.ref(`Contact_table/${id}`).set(state, (err) => {
          if (err) {
            alert("data not updated");
          }
          else {
            alert("data updated");
          }
        });
      }
      const datainsert = () => {
    
    
        const unqid = uuid();
        const slicid = unqid.slice(0, 5);
        state.userid = slicid;
        database.ref('Contact_table').push(state, (err) => {
          if (err) {
            alert("data not inserted");
          }
          else {
            alert("data inserted");
          }
        })
    
      }

    return (
        <>
        
        <div className='container mt-4'>
            <form
                onSubmit={handleSubmit}
                className='container border border-black col-sm-4 mt-4 mb-3 shadow' >
                <h2 className='text-center text-danger'>Edit Contact</h2>
                <div>
                    <h6 className='text-danger mt-3'>Name:</h6>
                    <input
                        type="text"
                        name="contact_name"
                        value={contact_name||""}
                        className="form-control mb-2"
                        placeholder='Enter Your Name'
                        onChange={handleChange} 
                        required
                        />
                        
                    <h6 className='text-danger mt-3'>Email:</h6>
                    <input
                        type="text"
                        name="contact_mail"
                        value={contact_mail||""}
                        className="form-control mb-2"
                        placeholder='Enter Your Email'
                        onChange={handleChange} 
                        required
                        />
                    <h6 className='text-danger'>PhoneNumber:</h6>
                    <input
                        type="text"
                        name="contact_mob"
                        value={contact_mob||""}
                        placeholder='Enter Your Phone Number'
                        className="form-control mb-2"
                        onChange={handleChange} 
                        required/>
                        <h6 className='text-danger'>Address:</h6>
                    <input
                        type="text"
                        name="contact_add"
                        value={contact_add||""}
                        placeholder='Enter Your Address'
                        className="form-control mb-2"
                        onChange={handleChange} 
                        required/>
                </div>
                <div className="text-center mt-3 mb-2">
                
                    <Button
                        type="submit"
                        className="btn-success px-5 "
                        value={id?"Update":"Save"}
                    >
                        Save
                    </Button>
                  
                    <Button
                     onClick={handleReset}
                        className="btn-dark px-5 ms-3"
                    >
                    Reset
                    </Button>
                </div>
                <div><i class="bi bi-person-circle"></i></div>
            </form>
        </div>
        </>
    );
}

export default EditContact;
