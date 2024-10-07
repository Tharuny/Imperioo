
import React, { useState } from 'react';
import axios from 'axios';
import "./section-12.css";// Import the CSS file
import "./ContactForm.css";// Import the CSS file
 
const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: ''
  });
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
  
    try {
      const response = await axios.post('/api/contact', formData);
   
      setStatus('succeeded');
      setFormData({ firstName: '', lastName: '', email: '', mobile: '' }); // Reset form after successful submission
    } catch (err) {
      setError(err.message);
      setStatus('failed');
    }
  };
 
  return (
    <div className="container">
      <div className="content">
        <div className="leftSection">
          <h2 className="title">CONTACT</h2>
          <h2 className="subtitle">WITH AB-FURNITURE</h2>
          <p className="description">
            Sign up and discover the latest news on how we can help transform your outdoor projects with Akula marine-grade outdoor furniture.
          </p>
        </div>
        <form className="form" onSubmit={handleSubmit}>
          <div className="inputRow">
            <div className="inputGroup">
              <label htmlFor="firstName" className="label">FIRST NAME *</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="input"
                required
              />
            </div>
            <div className="inputGroup">
              <label htmlFor="lastName" className="label">LAST NAME *</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="input"
                required
              />
            </div>
          </div>
          <div className="inputGroup">
            <label htmlFor="email" className="label">EMAIL *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="emailInput"
              required
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="mobile" className="label">MOBILE NUMBER *</label>
            <input
              type="text"
              id="mobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className="input"
              required
            />
          </div>
          <div className="buttonContainer">
            <button
              type="submit"
              className={isHovered ? 'button buttonHover' : 'button'}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Submitting...' : 'SUBMIT'}
            </button>
          </div>
          {status === 'failed' && <p className="errorMessage">{error}</p>}
          {status === 'succeeded' && <p className="successMessage">Successfully submitted the form</p>}
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#e3364e',
    padding: '40px',
    width: '100%',
    boxSizing: 'border-box',
  },
  content: {
    display: 'flex',
    justifyContent: 'space-between',
    maxWidth: '1200px',
    margin: '0 auto',
    flexDirection: 'row',
  },
  leftSection: {
    flex: '0 0 45%',
  },
  title: {
    color: '#fff',
    fontSize: '48px',
    fontWeight: 'normal',
    margin:'0%'
  
    
    
  },
  subtitle: {
    color: '#fff',
    fontSize: '24px',
    fontWeight: 'normal',
    margin: '0 0 20px 0',
  },
  description: {
    color: '#fff',
    fontSize: '16px',
    lineHeight: '1.5',
  },
  form: {
    flex: '0 0 45%',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  inputRow: {
    display: 'flex',
    gap: '20px',
  },
  inputGroup: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    color: '#fff',
    fontSize: '14px',
    marginBottom: '5px',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #fff',
    backgroundColor: 'transparent',
    color: '#fff',
  },
  emailInput: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #fff',
    backgroundColor: 'transparent',
    color: '#fff',
    boxSizing: 'border-box',
  },
  buttonContainer: {
    marginTop: '20px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '20px',
    backgroundColor: '#fff',
    color: '#000',
    border: '1px solid #fff',
    cursor: 'pointer',
    width: '40%',
    transition: 'color 0.3s, font-weight 0.3s',
  },
  buttonHover: {
    color: 'red',
    fontWeight: 'bold',
  },
  errorMessage: {
    color: 'yellow',
    fontSize: '14px',
    marginTop: '10px',
  },
  successMessage: {
    color: 'white',
    fontSize: '14px',
    marginTop: '10px',
    fontWeight: 'bold',
  },
  '@media (max-width: 768px)': {
    content: {
      flexDirection: 'column',
    },
    button: {
      width: '100%',
    },
  },
  '@media (max-width: 480px)': {
    title: {
      fontSize: '36px',
    },
    subtitle: {
      fontSize: '20px',
    },
    button: {
      fontSize: '18px',
    },
  },
};

export default ContactForm;