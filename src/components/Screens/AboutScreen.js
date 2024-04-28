
import React from 'react';
import '../../CSS/AboutScreen.css';
import Logo from '../../assets/final-logo.svg'
import EJ from '../../assets/profiles/EJ.jpg'
import AJ from '../../assets/profiles/AJ.jpg'
import SJ from '../../assets/profiles/SJ.png'
import EY from '../../assets/profiles/EY.jpg'


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
          <img src={Logo} alt="EASE Logo" className="ease-logo"/>
        </div>

        <div className="image-row">
          <div className="profile">
            <img src={EJ} alt="Team Member 1"/>
            <p className="bold">Emily Jeong</p>
            <p className="role">front-end developer</p>
            <p className="role">asset artist</p>
          </div>
          <div className="profile">
            <img src={AJ} alt="Team Member 2"/>
            <p className="bold">Alvin Jiang</p>
            <p className="role">front-end developer</p>
          </div>
          <div className="profile">
            <img src={SJ} alt="Team Member 3"/>
            <p className="bold">Sara Jeiter-Johnson</p>
            <p className="role">back-end developer</p>
          </div>
          <div className="profile">
            <img src={EY} alt="Team Member 4"/>
            <p className="bold">Eric Yang</p>
            <p className="role">front-end developer</p>
          </div>
        </div>

    </div>
    </div>
  );
}

export default AboutScreen;
