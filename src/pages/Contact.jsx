import React from 'react';
import './Forms.css'; // Reusing some form styles
import { MapPin, Phone, Mail, Clock, ChevronDown } from 'lucide-react';

const Contact = () => {
  return (
    <div className="page-wrapper">
      <section className="form-hero-section" style={{
        backgroundImage: `linear-gradient(to right, rgba(15, 23, 42, 0.9) 0%, rgba(15, 23, 42, 0.7) 100%), url('https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80')`,
        color: 'white'
      }}>
        <div className="container">
          <h5 className="text-primary uppercase font-bold tracking-wider mb-2" style={{color: 'var(--primary-color)'}}>CONTACT US</h5>
          <h1 style={{fontSize: '3rem', fontWeight: 800, marginBottom: '20px'}}>We're Here<br/>To Help You.</h1>
          <p style={{fontSize: '1.1rem', color: '#e2e8f0'}}>Have a question or need assistance?<br/>Reach out to us - we'd love to hear from you.</p>
        </div>
      </section>

      <section className="section container">
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h2 className="section-title" style={{textAlign: 'left', marginBottom: '20px'}}>Get In Touch</h2>
            <p className="text-muted mb-8" style={{marginBottom: '40px'}}>Our team is here to assist you with all your car buying, selling, and after-sales service needs.</p>
            
            <div className="contact-info-list" style={{display: 'flex', flexDirection: 'column', gap: '30px'}}>
              <div className="flex gap-4">
                <div style={{color: 'var(--primary-color)'}}><MapPin size={24} /></div>
                <div>
                  <h4 style={{fontWeight: 700, marginBottom: '4px'}}>Visit Our Showroom</h4>
                  <p className="text-muted">ThinkArz, 5th Floor, Modi House,<br/>Link Road, Malad (West),<br/>Mumbai - 400064</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div style={{color: 'var(--primary-color)'}}><Phone size={24} /></div>
                <div>
                  <h4 style={{fontWeight: 700, marginBottom: '4px'}}>Call Us</h4>
                  <p className="text-muted">022 4212 5678</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div style={{color: 'var(--primary-color)'}}><Mail size={24} /></div>
                <div>
                  <h4 style={{fontWeight: 700, marginBottom: '4px'}}>Email Us</h4>
                  <p className="text-muted">hello@thinkarz.com</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div style={{color: 'var(--primary-color)'}}><Clock size={24} /></div>
                <div>
                  <h4 style={{fontWeight: 700, marginBottom: '4px'}}>Business Hours</h4>
                  <p className="text-muted">Mon - Sat: 10:00 AM - 7:00 PM<br/>Sun: 10:00 AM - 5:00 PM</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="form-card">
            <h3>Send Us a Message</h3>
            <p className="text-muted" style={{marginBottom: '20px', fontSize: '0.9rem'}}>Fill in the details below and we'll get back to you shortly.</p>
            
            <form>
              <div className="grid grid-cols-2 gap-4">
                <div className="form-group">
                  <label>Full Name</label>
                  <input type="text" placeholder="Enter your full name" />
                </div>
                <div className="form-group">
                  <label>Mobile Number</label>
                  <input type="text" placeholder="Enter your mobile number" />
                </div>
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input type="email" placeholder="Enter your email address" />
              </div>
              <div className="form-group">
                <label>Subject</label>
                <select><option>Select a subject</option></select>
              </div>
              <div className="form-group">
                <label>Your Message</label>
                <textarea placeholder="Type your message here..." style={{
                  width: '100%', padding: '14px', border: '1px solid var(--border-color)', 
                  borderRadius: '6px', fontFamily: 'inherit', resize: 'vertical', minHeight: '120px'
                }}></textarea>
              </div>
              
              <button className="btn btn-primary w-full mt-4" style={{width: '100%', padding: '14px'}}>
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="section bg-gray">
        <div className="container grid grid-cols-2 gap-8 items-center">
          <div style={{height: '400px', backgroundColor: '#e2e8f0', borderRadius: '12px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80" alt="Map" style={{width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8}} />
          </div>
          <div className="form-card" style={{border: 'none', boxShadow: 'none', background: 'transparent'}}>
            <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80" alt="Showroom" style={{borderRadius: '12px', marginBottom: '20px', height: '200px', width: '100%', objectFit: 'cover'}} />
            <h3 style={{marginBottom: '10px'}}>Visit Our Showroom</h3>
            <p className="text-muted" style={{marginBottom: '20px'}}>Experience our wide range of pre-owned cars and get expert advice from our team. We look forward to welcoming you!</p>
            <button className="btn btn-outline-dark">Get Directions</button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section container">
        <h2 className="section-title" style={{textAlign: 'left'}}>Frequently Asked Questions</h2>
        <div className="grid grid-cols-2 gap-4 mt-8">
          {[
            'What are your showroom hours?',
            'Can I sell my car to ThinkArz?',
            'Do you offer financing options?',
            'Do you provide vehicle warranty?'
          ].map((q, i) => (
            <div key={i} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px', border: '1px solid var(--border-color)', borderRadius: '8px', cursor: 'pointer'}}>
              <h4 style={{fontWeight: 600}}>{q}</h4>
              <ChevronDown size={20} color="var(--text-muted)" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Contact;
