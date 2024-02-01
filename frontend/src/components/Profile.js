import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setIsSideBarOpen } from '../redux/filterOptionsSlice';
import '../styles/MultiStepForm.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAddressBook,
  faBackward,
  faCity,
  faClock,
  faEllipsisH,
  faEnvelope,
  faForward,
  faForwardStep,
  faGreaterThan,
  faIdCard,
  faLocation,
  faPerson,
} from '@fortawesome/free-solid-svg-icons';
import { primaryColor } from '../values/color';
import { setActiveTab } from '../redux/userSlice';

const Profile = () => {
  const user = useSelector((state) => state.user.user);
  const [currentSection, setCurrentSection] = useState(1);

  const detailPStyle = {
    display: 'flex',
    color: primaryColor,
    flex: 1,
    backgroundColor: 'white',
    height: '100%',
    alignItems: 'center',
    padding: '10px',
    borderRadius: '0px 6px 6px 0px',
    marginLeft: '5px',
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setActiveTab("profile"));
    dispatch(setIsSideBarOpen(false));
  }, []);

  const handleSectionChange = (section) => {
    setCurrentSection(section);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', height: '100%' }}>
      <div style={{ display: 'flex', width: '50%', alignItems: 'center', justifyContent:'center'}}>
        <center>
          <img src="./profileImg.png" style={{ width: '100%' }} alt="Profile" />
        </center>
      </div>
      <div className="step-container" style={{ flex: 1}}>
        <div className="form-container" style={{ width: '70%', height: '85vh'}}>
          {currentSection === 1 && (
            <>
              <p className="title">Personal Details</p>
              <div className="input" style={{ padding: '0px 0px 0px 10px' }}>
                <FontAwesomeIcon icon={faPerson} color="white" className="fa-icon" />
                <p style={detailPStyle}>{user.name}</p>
              </div>
              <div className="input" style={{ padding: '0px 0px 0px 10px' }}>
                <FontAwesomeIcon icon={faEnvelope} color="white" className="fa-icon" />
                <p style={detailPStyle}>{user.email}</p>
              </div>
            </>
          )}
          {currentSection === 2 && (
            <>
              <p className="title">Address</p>
              <div className="input" style={{ padding: '0px 0px 0px 10px' }}>
                <FontAwesomeIcon icon={faAddressBook} color="white" className="fa-icon" />
                <p style={detailPStyle}>{user.address}</p>
              </div>
              <div className="input" style={{ padding: '0px 0px 0px 10px' }}>
                <FontAwesomeIcon icon={faCity} color="white" className="fa-icon" />
                <p style={detailPStyle}>{user.city}</p>
              </div>
              <div className="input" style={{ padding: '0px 0px 0px 10px' }}>
                <FontAwesomeIcon icon={faLocation} color="white" className="fa-icon" />
                <p style={detailPStyle}>{user.zip}</p>
              </div>
            </>
          )}
          {currentSection === 3 && (
            <>
              <p className="title">Payment Details</p>
              <div className="input" style={{ padding: '0px 0px 0px 10px' }}>
                <FontAwesomeIcon icon={faIdCard} color="white" className="fa-icon" />
                <p style={detailPStyle}>{user.cardNumber}</p>
              </div>
              <div className="input" style={{ padding: '0px 0px 0px 10px' }}>
                <FontAwesomeIcon icon={faClock} color="white" className="fa-icon" />
                <p style={detailPStyle}>{user.formattedExpirationDate}</p>
              </div>
              <div className="input" style={{ padding: '0px 0px 0px 10px' }}>
                <FontAwesomeIcon icon={faEllipsisH} color="white" className="fa-icon" />
                <p style={detailPStyle}>{user.cvv}</p>
              </div>
            </>
          )}
          <div style={{ marginTop: 'auto', marginBottom:'20px', display:'flex', gap:'20px', alignItems:'center', justifyContent:'center'}}>
           
            <FontAwesomeIcon onClick={() => currentSection > 1 && handleSectionChange(currentSection - 1)} icon={faBackward} color={currentSection > 1 ? 'black' : 'grey'}/>
            <p style={{width:'150px', textAlign:'center'}}> 
                Section {currentSection} of 3
            </p>
            <FontAwesomeIcon onClick={() => currentSection < 3 && handleSectionChange(currentSection + 1)} icon={faForward} color={currentSection < 3 ? 'black' : 'grey'}/>
            
        </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
