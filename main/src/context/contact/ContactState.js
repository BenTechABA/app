import {useReducer} from 'react';
import axios from 'axios';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import {
ADD_CONTACT,
DELETE_CONTACT,
SET_CURRENT,
CLEAR_CURRENT,
UPDATE_CONTACT, 
FILTER_CONTACTS,
CLEAR_FILTER,
CONTACT_ERROR,
GET_CONTACTS,
CLEAR_CONTACTS
} from '../types';
 
const ContactState = props => {
const initialStates = {
    contacts: null,
    current: null,
    filtered:null,
    error: null
}
const [state, dispatch] = useReducer(contactReducer, initialStates);

//Get contacts
const getContacts = async() =>{
    try {
        const res = await axios.get('/api/contacts');
        dispatch({ type: GET_CONTACTS, payload: res.data })
    } catch (err) {
        dispatch({type: CONTACT_ERROR, payload: err.response.msg})
    }
    
}


//Add contact
const addContact = async contact =>{
    const config = {
        headers:{
            'Content-Type':'application/json'
        }
    }
    try {
        const res = await axios.post('/api/contacts', contact, config);
        dispatch({ type: ADD_CONTACT, payload: res.data })
    } catch (err) {
        dispatch({type: CONTACT_ERROR, payload: err.response.msg})
    }
    
}
//Update contact
const updateContact = async contact =>{
    const config = {
        headers:{
            'Content-Type':'application/json'
        }
    }
    try {
        const res = await axios.post(`/api/contacts/${contact._id}`, contact, config);
        dispatch({ type: UPDATE_CONTACT, payload: res.data })
    } catch (err) {
        dispatch({type: CONTACT_ERROR, payload: err.response.msg})
    }
    
}
//Delete contact
const deleteContact = async id =>{
    try {
        await axios.delete(`/api/contacts/${id}`);
        dispatch({ type: DELETE_CONTACT, payload: id })
    } catch (err) {
        dispatch({type: CONTACT_ERROR, payload: err.response.msg})
    }
    
}
//clear contacts
const clearContacts = () =>{
    dispatch({ type: CLEAR_CONTACTS})
}
//Delete contact
const setCurrent = contact =>{
    dispatch({ type: SET_CURRENT, payload: contact})
}
//Delete contact
const clearCurrent = () =>{
    dispatch({ type: CLEAR_CURRENT})
}

//filter contacts
const filterContacts = text =>{
    dispatch({ type: FILTER_CONTACTS, payload: text })
}
//Clear filter
const clearFilter = () =>{
    dispatch({ type: CLEAR_FILTER});
}
return(
    <ContactContext.Provider
    value={{
        contacts: state.contacts,
        current: state.current,
        filtered:state.filtered,
        error: state.error,
        updateContact,
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        filterContacts,
        clearFilter,
        getContacts,
        clearContacts
    }}>
        {props.children}
    </ContactContext.Provider>
)

}
export default ContactState;