import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import '../styles/MultiStepForm.css'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressBook, faBackward, faCheck, faCity, faClock, faCode, faDiagramNext, faDiagramPredecessor, faEllipsisH, faEnvelope, faExclamation, faForward, faIdCard, faLocation, faLock, faPerson, faWarning } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { setIsSideBarOpen } from '../redux/filterOptionsSlice';
import { fetchUser } from '../redux/userSlice';

// Component for Personal Details step
const PersonalDetailsStep = ({ onNext, data, onChange }) => {
  const { name, email } = data;
  const [errors, setErrors] = useState({});

  const validate = () => {
    let valid = true;
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = 'Name is required';
      valid = false;
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Invalid email address';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleNext = () => {
    if (validate()) {
      onNext();
    }
  };

  return (
    <div className='step-container'>
      <div className='form-container'>
        <p className='title'>Personal Details</p>
        <div className='input'>
          <FontAwesomeIcon icon={faPerson} color="white" className='fa-icon'/>
          <input
            type="text"
            placeholder='Name'
            value={name}
            onChange={(e) => onChange('name', e.target.value)}
          />
        </div>
        {errors.name && 
          <div className='error'>
            <FontAwesomeIcon icon={faWarning} color='red'/>&nbsp;
            <div style={{ color: 'red' }}>{errors.name}</div>
          </div>
        }
        <div className='input'>
          <FontAwesomeIcon icon={faEnvelope} color="white" className='fa-icon'/>
          <input
            type="text"
            placeholder='Email'
            value={email}
            onChange={(e) => onChange('email', e.target.value)}
          />
        </div>
        {errors.email && 
          <div className='error'>
            <FontAwesomeIcon icon={faWarning} color='red'/>&nbsp;
            <div style={{ color: 'red' }}>{errors.email}</div>
          </div>
        }
        <button className="form-btn" onClick={handleNext}>Next &nbsp; <FontAwesomeIcon icon={faForward} color='white'/></button>
        
      </div>
      <div>
        <center>
          <img src='./personalDetailsImg.png'/>
        </center>
      </div>
    </div>
  );
};

// Component for Address step
const AddressStep = ({ onNext, onPrev, data, onChange }) => {
  const { address, city, zip } = data;
  const [errors, setErrors] = useState({});

  const validate = () => {
    let valid = true;
    const newErrors = {};

    if (!address.trim()) {
      newErrors.address = 'Address is required';
      valid = false;
    }

    if (!city.trim()) {
      newErrors.city = 'City is required';
      valid = false;
    }

    if (!zip.trim()) {
      newErrors.zip = 'ZIP code is required';
      valid = false;
    } else if (!/^\d{6}$/.test(zip)) {
      newErrors.zip = 'Invalid ZIP code';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleNext = () => {
    if (validate()) {
      onNext();
    }
  };

  return (
    <div className='step-container'>
    <div className='form-container'>
      <p className='title'>Address</p>
      <div className='input'>
        <FontAwesomeIcon icon={faAddressBook} color="white" className='fa-icon'/>
        <input
          type="text"
          placeholder='Address'
          value={address}
          onChange={(e) => onChange('address', e.target.value)}
        />
      </div>
      {errors.address && 
        <div className='error'>
          <FontAwesomeIcon icon={faWarning} color='red'/>&nbsp;
          <div style={{ color: 'red' }}>{errors.address}</div>
        </div>
      }
      <div className='input'>
        <FontAwesomeIcon icon={faCity} color="white" className='fa-icon'/>
        <input
          type="text"
          placeholder='City'
          value={city}
          onChange={(e) => onChange('city', e.target.value)}
        />
      </div>
      {errors.city && 
        <div className='error'>
          <FontAwesomeIcon icon={faWarning} color='red'/>&nbsp;
          <div style={{ color: 'red' }}>{errors.city}</div>
        </div>
      }
      <div className='input'>
        <FontAwesomeIcon icon={faLocation} color="white" className='fa-icon'/>
        <input
          type="text"
          placeholder='ZIP Code'
          value={zip}
          onChange={(e) => onChange('zip', e.target.value)}
        />
      </div>
      {errors.zip && 
        <div className='error'>
          <FontAwesomeIcon icon={faWarning} color='red'/>&nbsp;
          <div style={{ color: 'red' }}>{errors.zip}</div>
        </div>
      }
      <div className='btn-container'>
        <button className="btn form-btn" onClick={onPrev}>Previous &nbsp; <FontAwesomeIcon icon={faBackward} color='white'/></button>
        <button className="btn form-btn" onClick={handleNext}>Next &nbsp; <FontAwesomeIcon icon={faForward} color='white'/></button>
      </div>
    </div>
    <div>
      <center>
        <img src='./AddressImg.png'/>
      </center>
    </div>
    </div>
  );
};

// Component for Payment Details step
const PaymentDetailsStep = ({ onPrev, onSubmit, data, onChange }) => {
  const { cardNumber, expirationDate, cvv } = data;
  const [errors, setErrors] = useState({});

  const validate = () => {
    let valid = true;
    const newErrors = {};

    if (!cardNumber.trim()) {
      newErrors.cardNumber = 'Card number is required';
      valid = false;
    } else if (!/^\d{16}$/.test(cardNumber)) {
      newErrors.cardNumber = 'Invalid card number';
      valid = false;
    }

    const isDateValid = (date) => {
      const currentDate = new Date();
      return new Date(date) >= currentDate;
    };

    if (!expirationDate) {
      newErrors.expirationDate = 'Expiration date is required';
      valid = false;
    }else if(!isDateValid(expirationDate)){
      newErrors.expirationDate = 'Invalid Expiration date';
      valid = false;
    }

    if (!cvv.trim()) {
      newErrors.cvv = 'CVV is required';
      valid = false;
    } else if (!/^\d{3}$/.test(cvv)) {
      newErrors.cvv = 'Invalid CVV';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleExpirationDateChange = (date) => {

    if (date instanceof Date && !isNaN(date)) {
      const lastDateOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
      const lastDate = new Date(date.getFullYear(), date.getMonth(), lastDateOfMonth);

      console.log(`Selected date: ${date}`);
      console.log(`Last date of the selected month: ${lastDate}`);

      onChange('expirationDate', lastDate)
      onChange('formattedExpirationDate', `${date.getMonth() + 1}/${date.getFullYear()}`)
    }

  }

  const handleSubmit = () => {
    if (validate()) {
      onSubmit();
    }
  };

  return (
    <div className='step-container'>
      <div className='form-container'>
        <p className='title'>Payment Details</p>
        <div className='input'>
          <FontAwesomeIcon icon={faIdCard} color="white" className='fa-icon'/>
          <input
            type="text"
            placeholder='Card Number'
            value={cardNumber}
            onChange={(e) => onChange('cardNumber', e.target.value)}
          />
        </div>
        {errors.cardNumber && 
          <div className='error'>
            <FontAwesomeIcon icon={faWarning} color='red'/>&nbsp;
            <div style={{ color: 'red' }}>{errors.cardNumber}</div>
          </div>
        }
        <div className='input' style={{maxWidth:'400px'}}>
          <FontAwesomeIcon icon={faClock} color="white" className='fa-icon'/>
          <div>
            <DatePicker
              selected={expirationDate ? new Date(expirationDate) : null}
              onChange={(date) => handleExpirationDateChange(date)}
              dateFormat="MM/yyyy"
              showMonthYearPicker
              placeholderText='Expiration Date'
            />
          </div>
        </div>
        {errors.expirationDate && 
          <div className='error'>
            <FontAwesomeIcon icon={faWarning} color='red'/>&nbsp;
            <div style={{ color: 'red' }}>{errors.expirationDate}</div>
          </div>
        }

        <div className='input'>
          <FontAwesomeIcon icon={faEllipsisH} color="white" className='fa-icon'/>
          <input
            type="text"
            placeholder='CVV'
            value={cvv}
            onChange={(e) => onChange('cvv', e.target.value)}
            />
        </div>
        {errors.cvv && 
          <div className='error'>
            <FontAwesomeIcon icon={faWarning} color='red'/>&nbsp;
            <div style={{ color: 'red' }}>{errors.cvv}</div>
          </div>
        }
        <div className='btn-container'>
          <button className="btn form-btn" onClick={onPrev}>Previous &nbsp; <FontAwesomeIcon icon={faBackward} color='white'/></button>
          <button className="btn form-btn" style={{backgroundColor:'green'}} onClick={handleSubmit}>Submit &nbsp; <FontAwesomeIcon icon={faCheck} color='white'/></button>
        </div>
      </div>
      <div>
        <center>
          <img src='./paymentDetailsImg.png'/>
        </center>
      </div>
    </div>
  );
};

// Main Form Component
const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(
    localStorage.getItem("formData") ? JSON.parse(localStorage.getItem("formData")) :
    {
    name: '',
    email: '',
    address: '',
    city: '',
    zip: '',
    cardNumber: '',
    expirationDate: null,
    formattedExpirationDate: '',
    cvv: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(()=>{
    dispatch(setIsSideBarOpen(false));
  },[])

  const handleChange = (field, value) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleNext = () => setStep(step + 1);
  const handlePrev = () => setStep(step - 1);

  const handleSubmit = () => {
    // console.log('Form submitted:', formData);
    localStorage.setItem('formData', JSON.stringify(formData));
    dispatch(fetchUser());
    navigate('/profile');
  };

  return (
    <div style={{height:'100%'}}>
      {step === 1 && (
        <PersonalDetailsStep onNext={handleNext} data={formData} onChange={handleChange} />
      )}
      {step === 2 && (
        <AddressStep onNext={handleNext} onPrev={handlePrev} data={formData} onChange={handleChange} />
      )}
      {step === 3 && (
        <PaymentDetailsStep onPrev={handlePrev} onSubmit={handleSubmit} data={formData} onChange={handleChange} />
      )}
    </div>
  );
};

export default MultiStepForm;
