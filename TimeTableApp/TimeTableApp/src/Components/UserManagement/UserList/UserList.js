import React, { useState, useEffect } from 'react';
import './UserList.css';
import axios from 'axios';
import useToken from '../../../account/useToken';
import { FaPlus } from '@react-icons/all-files/fa/FaPlus';
import CreateOrUpdateUser from '../CreateOrUpdate/CreateOrUpdateUser';
import Dropdown from 'react-bootstrap/Dropdown';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import {GetAllUsers, RemoveUser} from '../../../service'

function UserList() {
  const { token, setToken } = useToken();
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [id, setId] = useState();

  const getUsers = async () => {
    GetAllUsers(token)
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.error(error)
      });
  }


  useEffect(() => {
    getUsers();
  })


  const removeUser = (id) => {
    RemoveUser(id, token)
        .then(() => {
            NotificationManager.success('Deleted Successfully', 'User', 5000);
        })
        .catch((error) => {
            console.error(error)
        });
}


  const listItems = data.map((user) => {
    return <div className="box d-flex align-items-center my-3">
      <div className="ms-3">
        <h3>{user.firstName} {user.lastName}</h3>
        <p>{user.email}</p>
        <p>{user.phoneNumber}</p>
      </div>
      <div className="ms-auto text-danger">
        {/* <button className="btn btn-add pull-right" onClick={() => { setShow(true); setId(user.id) }} style={{ margin: "20px" }}>Edit</button> */}
        
        <Dropdown>
                    <Dropdown.Toggle style={{ backgroundColor: "#ADB842" }} variant="success" id="dropdown-basic">
                        Actions
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => { setShow(true); setId(user.id) }}>Edit</Dropdown.Item>
                        <Dropdown.Item onClick={() => { removeUser(user.id) }}>Delete</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
      </div>
    </div>
  }
  );
  return (
    <>
      <section>
        <label className="w-100">
          <button className="btn btn-add pull-right" onClick={() => { setShow(true); setId(null) }} style={{ margin: "20px" }}><FaPlus /> Add</button>
        </label>
        <div className="bforeTimeline">
          {listItems}
        </div>
      </section>
      <CreateOrUpdateUser
        show={show}
        id={id}
        onHide={() => setShow(false)} />
    </>
  );
}

export default React.memo(UserList);