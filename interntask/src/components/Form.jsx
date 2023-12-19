import React, { useState } from 'react'
import './style.css';
import PaymentModal from './Modal';
import axios from 'axios';
const Form = () => {
  const initialData={
    name: '',
    email: '',
    selectedSlot: '',
    month:'',
    age:18
  }
    const months=['Jan','Feb','Mar','April','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const [formData,setFormData]=useState(initialData);
      const [ageNotInLimit,setAgeNotInLimit]=useState(false);

      const handleChange=(e)=>{

        const { name, value } = e.target;
        console.log(name + " "+(value<65));

        if(name==="age" && (value > 65 || value <18)){
            console.log(formData.age);
            setAgeNotInLimit(true);
        }else{
            setAgeNotInLimit(false);
        }
        setFormData({ ...formData, [name]: value });

      }
      const [isPaymentModalOpen, setPaymentModalOpen] = useState(false);
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  function isValidEmail(email) {
    // Regular expression for a basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  const handleOpenPaymentModal = () => {
    if(!isValidEmail(formData.email) || formData.name=='' || formData.selectedSlot=='' || formData.month==''){
        console.log(formData.email + " "+formData.name+" "+formData.selectedSlot+" "+formData.month);
        alert("Kindly fill all the fields correctly to proceed");
        return;
    }
    if( formData.age<18 || formData.age >65){
        alert("Your age does not fulfill the requirements");
        return;
    }
    setPaymentModalOpen(true);
  };

  const handleClosePaymentModal = () => {
    setPaymentModalOpen(false);
  };

  const handleConfirmPayment = (isConfirmed) => {
    if (isConfirmed) {
      // You can handle the successful payment confirmation here
      // For example, submit the form or update the UI
      console.log('Payment confirmed!');
      axios.post('https://flexmoney-30re.onrender.com/reg',{
        
          name: formData.name,
          email: formData.email,
          age: formData.age,
          slot: formData.selectedSlot,
        month: formData.month,
        
      }).then(()=>{
        setFormData(initialData);
        setPaymentConfirmed(true);
      }).catch((error)=>{
        console.log("error");
      })
      
    }

    // Close the modal regardless of the payment result
    handleClosePaymentModal();
  };

  return (
    <div style={{marginTop:'6%',display:'flex',flexDirection:'column',alignItems:'center',width:'50%',height:'50%',justifyContent:'center',padding:'20px 20px 50px 20px',fontWeight:'bold',border:'1px solid grey',borderRadius:'10px'}}>
        <div className="form-group">
          <div className="label">
            <label htmlFor="name">Name:</label>
          </div>
          <div className="input">
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="form-group">
          <div className="label">
            <label htmlFor="name">Email:</label>
          </div>
          <div className="input">
            <input
              type="email"
              id="name"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="form-group">
          <div className="label">
            <label htmlFor="name">Age:</label>
          </div>
          <div className="input">
            <input
              type="number"
              id="name"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div style={{padding:'0px 0px 20px 70px',color:'red'}}>
            {ageNotInLimit && <span style={{paddingLeft:'10px'}}>Age must be between 18 and 65</span>}
        </div>

        <div className="form-group">
          <div className="label">
            <label htmlFor="name">Slots: </label>
          </div>
          <div className="input">
          <select
            id="name"
              name="selectedSlot"
              value={formData.selectedSlot}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Select a slot</option>
              <option value="slot1">6AM - 7AM</option>
              <option value="slot2">7AM - 8AM</option>
              <option value="slot3">8AM - 9AM</option>
              <option value="slot3">5PM - 6PM</option>
              {/* Add more options as needed */}
            </select>
          </div>
        </div>
        <div className="form-group">
          <div className="label">
            <label htmlFor="name">Month: </label>
          </div>
          <div className="input">
          <select

              name="month"
              value={formData.month}
              onChange={handleChange}
              required
            >
            <option value="" disabled>Select a Month</option>

              {months.map((val)=>(
                    <option key={val} value={val}>{val}</option>

              ))}
            </select>
          </div>
        </div>

        <button onClick={handleOpenPaymentModal} disabled={paymentConfirmed}>
            Proceed for Payment
        </button>
        {paymentConfirmed && (
        <div style={{ marginTop: '20px', color: 'green' }}>
          Registration Successful! {/* Add any additional success message here */}
        </div>
      )}
        <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={handleClosePaymentModal}
        onConfirmPayment={handleConfirmPayment}
      />
    </div>
  )
}

export default Form