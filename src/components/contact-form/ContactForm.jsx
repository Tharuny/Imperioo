import React, { useState } from 'react';
import axios from 'axios';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: ''
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
      const response = await axios.post('/api/ContactApi', formData);
      setStatus('succeeded');
      setFormData({ firstName: '', lastName: '', email: '' });
    } catch (err) {
      setError(err.message);
      setStatus('failed');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <div style={styles.leftSection}>
          <h1 style={styles.title}>CREATE</h1>
          <h2 style={styles.subtitle}>WITH AB-FURNITURE</h2>
          <p style={styles.description}>
            Sign up and discover the latest news on how we can help transform your outdoor projects with Akula marine-grade outdoor furniture.
          </p>
        </div>
        <form style={styles.form} onSubmit={handleSubmit}>
          <div style={styles.inputRow}>
            <div style={styles.inputGroup}>
              <label htmlFor="firstName" style={styles.label}>FIRST NAME *</label>
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
              <label htmlFor="lastName" style={styles.label}>LAST NAME *</label>
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
            <label htmlFor="email" style={styles.label}>EMAIL *</label>
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
          <div style={styles.buttonContainer}>
            <button
              type="submit"
              style={isHovered ? { ...styles.button, ...styles.buttonHover } : styles.button}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Submitting...' : 'SIGN UP'}
            </button>
          </div>
          {status === 'failed' && <p style={styles.errorMessage}>{error}</p>}
          {status === 'succeeded' && <p style={styles.successMessage}>Successfully submitted the form</p>}
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: 'red',
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
    margin: '0 0 10px 0',
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
    width: '100%',
    boxSizing: 'border-box',
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
  '@media (max-width: 1024px)': {
    content: {
      flexDirection: 'column',
      alignItems: 'center',
    },
    leftSection: {
      flex: '0 0 100%',
      marginBottom: '30px',
      textAlign: 'center',
    },
    form: {
      flex: '0 0 100%',
      maxWidth: '600px',
    },
    title: {
      fontSize: '42px',
    },
    subtitle: {
      fontSize: '22px',
    },
    button: {
      width: '60%',
      fontSize: '18px',
    },
  },
  '@media (max-width: 768px)': {
    container: {
      padding: '30px',
    },
    title: {
      fontSize: '36px',
    },
    subtitle: {
      fontSize: '20px',
    },
    description: {
      fontSize: '14px',
    },
    inputRow: {
      flexDirection: 'column',
      gap: '10px',
    },
    button: {
      width: '80%',
      fontSize: '16px',
    },
  },
  '@media (max-width: 480px)': {
    title: {
      fontSize: '24px',
    },
    subtitle: {
      fontSize: '16px',
    },
    description: {
      fontSize: '14px',
    },
    inputRow: {
      flexDirection: 'column',
    },
    input: {
      fontSize: '14px',
    },
    emailInput: {
      fontSize: '14px',
    },
    button: {
      fontSize: '16px',
    },
  },
};

export default ContactForm;