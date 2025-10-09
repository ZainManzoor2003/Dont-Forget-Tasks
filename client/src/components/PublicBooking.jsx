import React, { useMemo, useState, useEffect } from 'react';
import { FiCalendar, FiRefreshCw, FiArrowLeft } from 'react-icons/fi';
import { Link, useSearchParams } from 'react-router-dom';
import './Booking.css';

const defaultSlots = [
  '09:00', '09:30', '10:00', '10:30', '11:00',
  '11:30', '12:00', '14:00', '14:30', '15:00',
  '15:30', '16:00'
];

const PublicBooking = () => {
  const [searchParams] = useSearchParams();
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [selectedSlot, setSelectedSlot] = useState('');
  const [guest, setGuest] = useState({ name: '', email: '', phone: '', comment: '' });
  const [step, setStep] = useState('select'); // select -> payment -> confirm
  const [paymentMethod, setPaymentMethod] = useState('stripe');
  const [requirePayment, setRequirePayment] = useState(false); // Owner link allows optional payment by default
  const [payNow, setPayNow] = useState(false); // Client chooses to pay now or not
  const [isSharedLink, setIsSharedLink] = useState(false);
  const [ownerName, setOwnerName] = useState('us');

  // In a real app, you might fetch owner-configured pricing here; for now, payment is optional without service selection

  // Handle URL parameters for shared links
  useEffect(() => {
    const owner = searchParams.get('owner');
    const payment = searchParams.get('payment');
    const task = searchParams.get('task');
    
    if (owner === 'true') {
      setIsSharedLink(true);
      setOwnerName('the account owner');
    }
    
    if (payment === 'optional') {
      setRequirePayment(false);
    } else if (payment === 'required') {
      setRequirePayment(true);
    }
    
    // In a real app, you would load task details based on the task parameter
  }, [searchParams]);

  const meetingLink = useMemo(() => {
    if (!selectedSlot) return '';
    const token = Math.random().toString(36).slice(2, 8).toUpperCase();
    return `https://dontforget.app/meet/${date}-${selectedSlot}-${token}`;
  }, [date, selectedSlot]);

  const isGuestValid = guest.name.trim() && guest.email.trim() && guest.phone.trim();
  const needsPayment = requirePayment || payNow; // requirePayment (owner-enforced) OR client chooses to pay now

  const handleConfirm = (e) => {
    e.preventDefault();
    if (!isGuestValid || !selectedSlot) return;
    if (step === 'select') {
      if (needsPayment) {
        setStep('payment');
      } else {
        setStep('confirm');
      }
      return;
    }
    if (step === 'payment') {
      // Simulate payment success
      setTimeout(() => setStep('confirm'), 400);
    }
  };

  const resetBooking = () => {
    setSelectedSlot('');
    setGuest({ name: '', email: '', phone: '', comment: '' });
    setPaymentMethod('stripe');
    setStep('select');
    setPayNow(false);
  };

  return (
    <div className="public-booking-page">
      {/* Public Header */}
      <div className="public-header">
        <div className="public-header-content">
          <Link to="/" className="back-link">
            <FiArrowLeft />
            Back to Home
          </Link>
          <div className="public-logo">
            <FiCalendar />
            <span>Don't Forget</span>
          </div>
        </div>
      </div>

      <div className="booking-page">
        <div className="content-header">
          <div className="section-title">
            <span className="title-icon"><FiCalendar /></span>
            <h2>Book Your Appointment</h2>
          </div>
          <p className="section-desc">
            {isSharedLink 
              ? `Schedule a meeting with ${ownerName}. No account required - just pick a time, enter your details, and we'll confirm your appointment instantly.`
              : 'Schedule a meeting with us. No account required - just pick a time, enter your details, and we\'ll confirm your appointment instantly.'
            }
          </p>
        </div>

        {step !== 'confirm' && (
          <div className="booking-container">
            <div className="booking-main">
              <div className="booking-grid">
                <div className="calendar-card">
                  <div className="card-title">Select Date</div>
                  <input
                    type="date"
                    className="date-input"
                    value={date}
                    onChange={(e) => { setDate(e.target.value); setSelectedSlot(''); }}
                  />
                  <div className="card-title" style={{ marginTop: 12 }}>Available Slots</div>
                  <div className="slots-grid">
                    {defaultSlots.map(t => (
                      <button
                        key={t}
                        className={`slot-btn ${selectedSlot === t ? 'selected' : ''}`}
                        onClick={() => setSelectedSlot(t)}
                      >{t}</button>
                    ))}
                  </div>
                </div>

                <form className="details-card" onSubmit={handleConfirm}>
                  <div className="card-title">Your Details</div>
                  <div className="form-row">
                    <div className="form-field">
                      <label>Full Name *</label>
                      <input 
                        value={guest.name} 
                        onChange={(e)=>setGuest({ ...guest, name: e.target.value })} 
                        placeholder="Your full name" 
                        required 
                      />
                    </div>
                    <div className="form-field">
                      <label>Email *</label>
                      <input 
                        type="email"
                        value={guest.email} 
                        onChange={(e)=>setGuest({ ...guest, email: e.target.value })} 
                        placeholder="your.email@example.com" 
                        required 
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-field">
                      <label>Phone *</label>
                      <input 
                        value={guest.phone} 
                        onChange={(e)=>setGuest({ ...guest, phone: e.target.value })} 
                        placeholder="Your phone number" 
                        required 
                      />
                    </div>
                    <div className="form-field">
                      <label>Comments</label>
                      <input 
                        value={guest.comment} 
                        onChange={(e)=>setGuest({ ...guest, comment: e.target.value })} 
                        placeholder="Any special requests?" 
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={payNow}
                        onChange={(e) => setPayNow(e.target.checked)}
                      />
                      Pay now (optional)
                    </label>
                  </div>

                  {step === 'select' && (
                    <div className="actions-row">
                      <button type="submit" className="primary-btn" disabled={!isGuestValid || !selectedSlot}>
                        {needsPayment ? 'Continue to Payment' : 'Confirm Booking'}
                      </button>
                    </div>
                  )}

                  {step === 'payment' && (
                    <div className="payment-panel">
                      <div className="card-title">Payment</div>
                      <div className="payment-info">
                        <p className="payment-note">You chose to pay now. Complete payment to confirm your booking.</p>
                      </div>
                      <div className="pay-methods">
                        <label className="radio"><input type="radio" name="pay" checked={paymentMethod==='stripe'} onChange={()=>setPaymentMethod('stripe')} /> Stripe</label>
                        <label className="radio"><input type="radio" name="pay" checked={paymentMethod==='paypal'} onChange={()=>setPaymentMethod('paypal')} /> PayPal</label>
                      </div>
                      <div className="actions-row">
                        <button type="button" className="secondary-btn" onClick={() => setStep('select')}>Back</button>
                        <button type="submit" className="primary-btn">Pay and Confirm</button>
                      </div>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        )}

        {step === 'confirm' && (
          <div className="confirmation-card">
            <div className="card-title">Booking Confirmed! 🎉</div>
            <ul className="confirm-list">
              <li><strong>Date/Time:</strong> {date} at {selectedSlot}</li>
              <li><strong>Meeting link:</strong> <span className="mono">{meetingLink}</span></li>
              <li><strong>Payment:</strong> {payNow || requirePayment ? 'Collected' : 'Not collected'}</li>
              {guest.comment && (<li><strong>Notes:</strong> {guest.comment}</li>)}
            </ul>
            <div className="confirmation-note">
              <p>We've sent a confirmation email to <strong>{guest.email}</strong> with all the details.</p>
            </div>
            <div className="actions-row">
              <button className="secondary-btn" onClick={resetBooking}>Book Another</button>
              <Link to="/" className="primary-btn">Back to Home</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PublicBooking;
