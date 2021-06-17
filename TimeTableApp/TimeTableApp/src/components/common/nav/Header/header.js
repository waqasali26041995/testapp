import React from 'react';
import '../../../../Assests/css/style.css';
import '../../../../Assests/css/responsive.css';
import '../../../../Assests/css/bootstrap.min.css';
import {FaSignOutAlt} from '@react-icons/all-files/fa/FaSignOutAlt';
import {useSelector} from 'react-redux';
import {LoggedInInfo} from '../../../../AuthTokenProvider/TokenInfo';


export default function Header(){
  const initialValue = useSelector((state) => state.ChangeHeaderlogo);
  const title = useSelector((state) => state.ChangeHeaderTitle);

  const Logout = () => {
    const {isLoggedIn} = LoggedInInfo();
    if(isLoggedIn) {
      return <>
      <a href="/" style={{position: "absolute", color: "white", right: "15px", top:"106px" }} onClick={() => {localStorage.removeItem('token')}}><FaSignOutAlt /> Logout</a>
      </>
    }
    else {
      return <></>;
    }
  } 

  return (
    <>
    <header className="bg-color">
      <div className="container py-4">
        <div className="d-flex justify-content-between text-white">
          <div className="logo-image">
            <a href="/" className="text-uppercase text-white h2 text-decoration-none"> 
            <img className="img-fluid" src={initialValue} alt="" /> </a>
            {Logout()}
          </div>
          <div>
            <div className="days-bg ">
              <p class="text-uppercase">{title}</p>
              </div>
          </div>
        </div>
      </div>
    </header>
  </>
  );
};