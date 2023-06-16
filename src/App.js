import React from 'react';
import EditContact from './EditContact';
import AddContact from './AddContact';
import AllContact from './AllContact';
import { BrowserRouter,Route, Routes } from "react-router-dom";
import ContactsView  from './ContactsView';

function App() {
  return (
   <>
   <BrowserRouter>
             <Routes>
                <Route path='/' element={<AllContact/>}/>
                <Route path='/update/:id' element={<EditContact/>}/>
                <Route path='/ContactsView/:id' element={<ContactsView/>}/>
                <Route path='/AddContact/:id' element={<AddContact/>}/>
             </Routes>
             </BrowserRouter>
   </>
  );
}

export default App;
