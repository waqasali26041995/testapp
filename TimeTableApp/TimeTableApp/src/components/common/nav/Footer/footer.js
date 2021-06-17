import React, { useState } from 'react';
import '../../../../Assests/css/style.css';
import '../../../../Assests/css/responsive.css';
import '../../../../Assests/css/bootstrap.min.css';
import moment from 'moment';
import 'moment-timezone'


export default function Footer(){

  //const momentDate = moment().tz("Europe/London").format("dddd D MMM yyyy").toLocaleString('en-GB', { timeZone: 'Europe/London' });
  const momentDate = moment().format("dddd D MMM yyyy");

  let currTime = moment().format("hh:mm:ss");
  const [ctime, setCTime] = useState(currTime);
  const updateTime = () => {
    currTime = moment().format("hh:mm:ss");
    setCTime(currTime);
  };
  setInterval(updateTime,1000)
  return (
    <>
    <footer className="bg-color relative">
        <div className="container-fluid">
          <div className="container text-center text-white py-4">
            <h2 className="footerAfterBefore">
              <span>{currTime.split(":")[0]}</span> : <span>{currTime.split(":")[1]}</span> : <span>{currTime.split(":")[2]}</span>
              </h2>
            <h1>{momentDate}</h1>
          </div>
        </div>
    </footer>
  </>
  );
};