import React, { useState } from 'react';
import axios from 'axios';
import { Height, SpatialTracking } from '@mui/icons-material';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    // Validation for first name: only letters, at least 2 characters
  
  
    // Validation for last name: only letters, at least 2 characters
   
  
    // Validation for email format
   
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  
    // Clear error message on successful validation
    setError(null);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if any field is empty
    for (const key in formData) {
      if (formData[key].trim() === '') {
        alert(`${key} cannot be empty.`);
        return;
      }
    }

    setStatus('loading');
    try {
      const response = await axios.post('/api/ContactApi', formData);
    
      setStatus('succeeded');
      setFormData({ firstName: '', lastName: '', email: '', message: '' }); // Reset form after successful submission
    } catch (err) {
      setError(err.message);
      setStatus('failed');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <form style={styles.form} onSubmit={handleSubmit}>
          <div style={styles.heading}>
             <h1>CONTACT US</h1>   
          </div>
          <div style={styles.inputRow}>
            <div style={styles.inputGroup}>
              <label htmlFor="firstName" style={styles.label}>
                FIRST NAME{' '}
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>
            <div style={styles.inputGroup}>
              <label htmlFor="lastName" style={styles.label}>
                LAST NAME{' '}
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>
          </div>
          <div style={styles.inputGroup}>
            <label htmlFor="email" style={styles.label}>
              EMAIL{' '}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={styles.emailInput}
              required
            />
          </div>
          <div style={styles.inputGroup}>
            <label htmlFor="message" style={styles.label}>
              MESSAGE{' '}
            </label>
            <textarea
              type="message"
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              style={styles.emailInput}
              rows={5}
              cols={50}
              required
            ></textarea>
          </div>
          <div style={styles.buttonContainer}>
            <button
              type="submit"
              style={
                isHovered
                  ? { ...styles.button, ...styles.buttonHover }
                  : styles.button
              }
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Submitting...' : 'SEND'}
            </button>
          </div>
          {status === 'failed' && (
            <p style={styles.errorMessage}>{error}</p>
          )}
          {status === 'succeeded' && (
            <p style={styles.successMessage}>
              Successfully submitted the form
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: 'white',
    padding: '40px',
    width: '100%',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection:'column',
    justifyContent: 'center'
  },
  content: {
    display: 'flex',
    justifyContent: 'space-between',
    maxWidth: '1200px',
    margin: '0 auto',
    flexDirection: 'row'
  },
  leftSection: {
    flex: '0 0 45%'
  },
  title: {
    color: '#fff',
    fontSize: '48px',
    fontWeight: 'normal',
    margin: '0 0 10px 0'
  },
  subtitle: {
    color: '#fff',
    fontSize: '24px',
    fontWeight: 'normal',
    margin: '0 0 20px 0'
  },
  description: {
    color: 'black',
    fontSize: '16px',
    lineHeight: '1.5'
  },
  heading: {
    display:'flex',
    justifyContent:'center',
    marginBottom:'50px'
  },
  form: {
    flex: '0 0 45%',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  inputRow: {
    display: 'flex',
    gap: '20px',
    justifyContent: 'center'
  },
  inputGroup: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column'
  },
  label: {
    color: 'black',
    fontSize: '14px',
    fontWeight: '500',
    marginBottom: '5px',
    letterSpacing: '2px'
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #d1cdc0',
    backgroundColor: 'transparent',
    color: 'black',
    Height: '50px',
    width: '500px'
  },
  emailInput: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #d1cdc0',
    backgroundColor: 'transparent',
    color: 'black',
    boxSizing: 'border-box'
  },
  buttonContainer: {
    marginTop: '20px',
    display:'flex',
    justifyContent:'center'
  },
  button: {
    padding: '10px 20px',
    fontSize: '20px',
    backgroundColor: '#de5d0d',
    color: 'black',
    border: '1px solid #fff',
    cursor: 'pointer',
    width: '160px',
    transition: 'color 0.3s, font-weight 0.3s'
  },
  buttonHover: {
    color: '#fff',
    fontWeight: 'bold'
  },
  errorMessage: {
    color: 'red ',
    fontSize: '14px',
    marginTop: '10px'
  },
  successMessage: {
    color: 'white',
    fontSize: '14px',
    marginTop: '10px',
    fontWeight: 'bold'
  },
  '@media (max-width: 768px)': {
    content: {
      flexDirection: 'column'
    },
    button: {
      width: '100%'
    }
  },
  '@media (max-width: 480px)': {
    title: {
      fontSize: '36px'
    },
    subtitle: {
      fontSize: '20px'
    },
    button: {
      fontSize: '18px'
    }
  }
};


export default ContactForm;
