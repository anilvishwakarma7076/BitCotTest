import React, { useEffect, useState } from 'react';
import database from '../src/firebase';
import { Link } from 'react-router-dom';
import { BsPersonCircle, BsFillTrashFill, BsPencilFill, BsFillEyeFill, BsPlusCircle } from "react-icons/bs";
const initialData = {
    userid: "",
    contact_name: "",
    contact_mail: "",
    contact_mob: "",
    contact_add: "",
    search:""
}
const AllContact = () => {
    const [state, setState] = useState(initialData);
    useEffect(() => {
        database.ref('Contact_table').on("value", (snapshot) => {
            if (snapshot.val() !== null) {
                setState({ ...snapshot.val() });
            }
            else {
                setState({});
            }
        })
    }, []);
    const onDelete = (id) => {
        if (window.confirm("are you confirm to delete the record")) {
            database.ref(`Contact_table/${id}`).remove((err) => {
                if (err) {
                    alert("record is Not deleted");
                }
                else {
                    alert("record is deleted");
                }
            })
        }
    }
    
    const handleChange=(e)=>{
        const {name,value}=e.target;
        setState({...state,[name]:value});
    }
    let tempArray = [];
  Object.keys(state).map((id,index) => {
    tempArray.push({ id, value: state.contact_name });
    console.log("aappp",tempArray);
  });
  
  if (state.search) {
    tempArray = tempArray.filter(name => (name.value.contact_name).match(new RegExp(state.search, "i")))
  }
    return (

        <>
            <div className="form-control border-dark text-center text-light bg-primary border border-dark" >All Contact <BsPlusCircle></BsPlusCircle></div>
            <div className="container mt-1 d-flex justify-content-end">
                <input type="search"
              name="search"
              className=" form-control border-dark"
              onChange={handleChange}
              placeholder="Search"
            //   value={}
            /></div>
            <div className='table-responsive-md mt-4'>
                <table className='table table-striped table-bordered table-hover'>
                    <tbody>
                        {
                            Object.keys(state).map((id, index) => {
                                return (

                                    <tr key={id}>
                                        <td className='class="display-1'><BsPersonCircle /></td>
                                        <td>{index + 1}</td>
                                        <td>{state[id].contact_name}<br></br>
                                            {state[id].contact_mob}</td>
                                        <td>
                                        <Link to={`/ContactsView/${id}`}>
                                            <BsFillEyeFill />
                                            </Link>
                                            <BsFillTrashFill className='ms-4' onClick={() => onDelete(id)}></BsFillTrashFill>
                                           <Link to={`/update/${id}`}>
                                            <BsPencilFill className='ms-4'></BsPencilFill>
                                            </Link>
                                            <Link to={`/AddContact/${id}`}>
                                            <BsPlusCircle className='ms-4'></BsPlusCircle>
                                            </Link>
                                            
                                        </td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            </div>

        </>
    );
}

export default AllContact

