import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [users, setUsers] = useState([]);

  const [error, setError] = useState('');

  useEffect(() => {
    async function getUsers(){
      const { data } = await axios.get('https://user-list-mern.vercel.app/api/users/');
      setUsers(data);
    } 
    getUsers();
  }, [])

  //User Form
  function UserForm(){
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');

    //Function to add a User
    async function AddUser(event){
      //Prevent Default Page Behaviour on Submit
      event.preventDefault();
  
      //Add One User to the Database
      await axios.put(
        'https://user-list-mern.vercel.app/api/users',
        { firstName, lastName, email },
        { header: { 'Content-Type': 'application/json' } },
      ).then((user)=>{
        const { data } = user;
  
        //Add User to The Previous Data
        setUsers(prev=>[ ...prev, data ]);
  
        //Logs the User Data to the Console
        console.log(user);
      }).catch((error) => {
        //Set Error to Message Given by the Database
        setError(error?.response?.data?.error);
  
        //Remove Error After 7 Seconds
        setTimeout(()=>{
          setError('');
        }, 7000);
      });
    }

    return (
      <div 
        className="bg-white h-100 px-3 py-5
          d-flex flex-column justify-content-center align-items-center"
        style={{borderRadius: '17px'}}
      >
        {/* Error Message */}
        {error && <p className='text-danger'>{error}</p>}

        <h4>Add a User</h4>
        <form onSubmit={AddUser}>
          <div>
            <div className="row g-2">
              {/* Name Input */}
              <div className="col-md-6"> 
                <label className="w-100 mt-2">First Name
                  <input 
                    type="text" 
                    className="form-control formInput" 
                    placeholder="Enter First Name"
                    id="firstname" 
                    onChange={e=>setFirstName(e.target.value)} 
                    value={firstName}
                    required
                  /> 
                </label>
              </div>
              <div className="col-md-6"> 
                <label className="w-100 mt-2">Last Name
                  <input 
                    type="text" 
                    className="form-control formInput" 
                    placeholder="Enter Last Name"
                    id="lastname" 
                    onChange={e=>setLastName(e.target.value)} 
                    value={lastName} 
                    required
                  /> 
                </label>
              </div>
            </div>

            {/* Email Input */}
            <label className="w-100 mt-2">Email
              <input 
                type="email" 
                className="form-control formInput" 
                placeholder="Enter a valid email address"
                id="email" 
                onChange={e=>setEmail(e.target.value)} 
                value={email} 
                required
              /> 
            </label>

            {/* Submit Button */}
            <button 
              type="submit" 
              className="btn btn-primary w-100 mt-3"
              style={{backgroundColor: "#496885"}}
            >Submit</button>
          </div>
        </form>
      </div>
    )
  }

  //User Table
  function UserTable({ users }){
    return(
      <table 
        className="table table-striped table-hover"
        style={{
          backgroundColor: 'rgba(190,195,195,0.1)', 
          borderRadius: '17px',
          maxHeight: '20rem',
          overflowX: "hidden",
          overflowY: "scroll"
        }}
      >
        {/* Table Heading */}
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {users?.map(user => {
            return(
              <tr key={user?._id || 'No ID'}>
                <td>{user?.firstName || 'No First Name'}</td>
                <td>{user?.lastName || 'No Last Name'}</td>
                <td>{user?.email || 'No Email'}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }

  return (
    <div id="gradent1" className="container-fluid min-vh-100"
    style={{fontFamily: 'Montserrat,sans-serif'}} //Review (Should it be global or is there a better way such as in the head tag)
    >
      <div className='row align-items-center'>
        <div className="col-sm-5 col-md-6 my-3">
          {/* Form to add User */}
          <UserForm/>
        </div>

        <div className="col-sm-7 col-md-6 my-3" style={{overflowX: 'scroll'}}>
          {/* Table to display Users (Pure Function) */}
          <UserTable users={users}/>
        </div>
      </div>
    </div>
  );
}

export default App;
