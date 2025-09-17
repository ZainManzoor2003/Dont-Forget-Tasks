import React, { useMemo, useState } from 'react';
import { FiCalendar } from 'react-icons/fi';
import './Booking.css';

const defaultSlots = [
  '09:00', '09:30', '10:00', '10:30', '11:00',
  '11:30', '12:00', '14:00', '14:30', '15:00',
  '15:30', '16:00'
];

const Booking = () => {
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [selectedSlot, setSelectedSlot] = useState('');
  const [guest, setGuest] = useState({ name: '', phone: '', comment: '' });
  const [step, setStep] = useState('select'); // select -> payment -> confirm
  const [paymentMethod, setPaymentMethod] = useState('stripe');

  const meetingLink = useMemo(() => {
    if (!selectedSlot) return '';
    const token = Math.random().toString(36).slice(2, 8).toUpperCase();
    return `https://dontforget.app/meet/${date}-${selectedSlot}-${token}`;
  }, [date, selectedSlot]);

  const isGuestValid = guest.name.trim() && guest.phone.trim();

  const handleConfirm = (e) => {
    e.preventDefault();
    if (!isGuestValid || !selectedSlot) return;
    if (step === 'select') {
      setStep('payment');
      return;
    }
    if (step === 'payment') {
      // Simulate payment success
      setTimeout(() => setStep('confirm'), 400);
    }
  };

  const resetBooking = () => {
    setSelectedSlot('');
    setGuest({ name: '', phone: '', comment: '' });
    setPaymentMethod('stripe');
    setStep('select');
  };

  return (
    <div className="booking-page">
      <div className="content-header">
        <div className="section-title">
          <span className="title-icon"><FiCalendar /></span>
          <h2>Public Booking</h2>
        </div>
        <p className="section-desc">Pick a time slot, enter details, complete payment if required, and get your confirmation instantly.</p>
      </div>

      {step !== 'confirm' && (
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
            <div className="card-title">Guest Details</div>
            <div className="form-row">
              <div className="form-field">
                <label>Name</label>
                <input value={guest.name} onChange={(e)=>setGuest({ ...guest, name: e.target.value })} placeholder="Your full name" required />
              </div>
              <div className="form-field">
                <label>Phone</label>
                <input value={guest.phone} onChange={(e)=>setGuest({ ...guest, phone: e.target.value })} placeholder="Your phone number" required />
              </div>
            </div>
            <div className="form-row">
              <div className="form-field full">
                <label>Comment</label>
                <textarea value={guest.comment} onChange={(e)=>setGuest({ ...guest, comment: e.target.value })} placeholder="Anything we should know?" rows={4} />
              </div>
            </div>

            {step === 'select' && (
              <div className="actions-row">
                <button type="submit" className="primary-btn" disabled={!isGuestValid || !selectedSlot}>Continue to Payment</button>
              </div>
            )}

            {step === 'payment' && (
              <div className="payment-panel">
                <div className="card-title">Payment</div>
                <div className="pay-methods">
                  <label className="radio"><input type="radio" name="pay" checked={paymentMethod==='stripe'} onChange={()=>setPaymentMethod('stripe')} /> Stripe</label>
                  <label className="radio"><input type="radio" name="pay" checked={paymentMethod==='paypal'} onChange={()=>setPaymentMethod('paypal')} /> PayPal</label>
                </div>
                <div className="actions-row">
                  <button type="submit" className="primary-btn">Pay and Confirm</button>
                </div>
              </div>
            )}
          </form>
        </div>
      )}

      {step === 'confirm' && (
        <div className="confirmation-card">
          <div className="card-title">Booking Confirmed</div>
          <ul className="confirm-list">
            <li><strong>Service:</strong> Consultation</li>
            <li><strong>Date/Time:</strong> {date} at {selectedSlot}</li>
            <li><strong>Meeting link:</strong> <span className="mono">{meetingLink}</span></li>
            {guest.comment && (<li><strong>Notes:</strong> {guest.comment}</li>)}
          </ul>
          <div className="actions-row">
            <button className="secondary-btn" onClick={resetBooking}>Book Another</button>
            <a className="primary-btn" href="#" onClick={(e)=>e.preventDefault()}>Go to Custom URL</a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Booking;



