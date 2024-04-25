
import React from 'react';
import '../../CSS/AboutScreen.css';
import Logo from '../../assets/final-logo.svg'


function AboutScreen() {
  return (
    <div className="about-screen">
    <div className="about-container">
    <div>
      <h1>The EASE Application</h1> 
    EASE is a web application that fills in the needs of some missing functionalities
    in current academic collaboration tools. EASE supports a myriad of extended features
    such as a direct messaging capabilities and a calendar system.
    </div>
    
    <div>
    <h1 className="team-header">Our Team</h1>
      <div>
      <img src={Logo} alt="EASE Logo" className="ease-logo"/>
      </div>
    </div>

    </div>
    </div>
  );
}

export default AboutScreen;
