import React from 'react';
import './Forms.css';
import { CheckCircle, Search, CreditCard, Shield, Clock, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const SellYourCar = () => {
  return (
    <div className="page-wrapper">
      <section className="form-hero-section sell-car-bg">
        <div className="container form-hero-container">
          <div className="form-hero-text">
            <h5 className="text-primary uppercase font-bold tracking-wider mb-2" style={{color: 'var(--primary-color)'}}>SELL YOUR CAR</h5>
            <h1>Sell Your Car.<br/>Fast, Easy & Hassle-Free.</h1>
            <p>Get the best value for your car with a quick, transparent and secure process.</p>
          </div>
          
          <div className="form-card">
            <h3>Get Instant Valuation</h3>
            <p className="text-muted" style={{marginBottom: '20px', fontSize: '0.9rem'}}>Enter your car details to get a free, no-obligation valuation.</p>
            
            <form>
              <div className="form-group">
                <label>Registration Number</label>
                <input type="text" placeholder="Enter Reg. Number" defaultValue="MH01AB1234" />
              </div>
              <div className="form-group">
                <label>Car Model</label>
                <select><option>Select Model</option></select>
              </div>
              <div className="form-group">
                <label>Manufacturing Year</label>
                <select><option>Select Year</option></select>
              </div>
              <div className="form-group">
                <label>Kilometer Driven</label>
                <div className="input-with-suffix">
                  <input type="text" placeholder="Enter KMs Driven" />
                  <span className="suffix">km</span>
                </div>
              </div>
              
              <button className="btn btn-primary w-full mt-4" style={{width: '100%', padding: '14px'}}>
                Get Valuation
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="section container">
        <h2 className="section-title">Our Simple 3-Step Process</h2>
        
        <div className="process-steps">
          <div className="process-step">
            <div className="step-icon"><Search size={32} /></div>
            <h4>1. Get Valuation</h4>
            <p>Get instant price for your car.</p>
          </div>
          <div className="step-arrow"><Zap size={24} color="#cbd5e1" /></div>
          <div className="process-step">
            <div className="step-icon"><Clock size={32} /></div>
            <h4>2. Book Inspection</h4>
            <p>Schedule a free inspection.</p>
          </div>
          <div className="step-arrow"><Zap size={24} color="#cbd5e1" /></div>
          <div className="process-step">
            <div className="step-icon"><CreditCard size={32} /></div>
            <h4>3. Get Paid</h4>
            <p>Get instant payment on the spot.</p>
          </div>
        </div>
      </section>

      <section className="section bg-gray">
        <div className="container">
          <h2 className="section-title">Why Sell Your Car to ThinkArz?</h2>
          
          <div className="grid grid-cols-4 gap-6 text-center">
            <div className="benefit-card">
              <div className="benefit-icon mx-auto"><Shield size={32} /></div>
              <h4>Best Price Assurance</h4>
              <p>Get the best market price for your car.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon mx-auto"><CheckCircle size={32} /></div>
              <h4>Free Inspection</h4>
              <p>100% free inspection at your doorstep.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon mx-auto"><Clock size={32} /></div>
              <h4>Quick Process</h4>
              <p>Sell your car in just a few hours.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon mx-auto"><CreditCard size={32} /></div>
              <h4>Instant Payment</h4>
              <p>Get paid instantly via secure transfer.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Ready to sell banner reused from home */}
      <section className="promo-banner container my-12" style={{margin: '60px auto'}}>
        <div className="promo-content">
          <div>
            <h3>Ready to sell your car?</h3>
            <p>Get the best value for your car with ThinkArz.<br/>It's quick, easy and hassle-free.</p>
          </div>
          <div className="promo-actions">
            <button className="btn btn-primary">Get Free Valuation</button>
            <button className="btn btn-outline-dark" style={{color: 'white', borderColor: 'white'}}>Talk to Expert</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SellYourCar;
