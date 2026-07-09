import React from 'react';
import { Link } from 'react-router-dom';
import { Search, PenTool as Tool, RotateCcw, ShieldCheck, Tag, ArrowRight, CheckCircle, FileText, Award, Users, ChevronRight } from 'lucide-react';
import './Home.css';
import CarCard from '../components/CarCard';

const Home = () => {
  const featuredCars = [
    {
      id: 1,
      make: 'MG',
      model: 'COMET EV EXCLUSIVE FC',
      year: 2024,
      fuel: 'EV',
      kms: '14,568',
      price: '4.50 Lakh',
      emi: '8,125'
    },
    {
      id: 2,
      make: 'KIA',
      model: 'SONET GT 1.0T DCT GTX PLUS',
      year: 2024,
      fuel: 'Petrol',
      kms: '9,000',
      price: '13.75 Lakh',
      emi: '24,665'
    },
    {
      id: 3,
      make: 'Maruti Suzuki',
      model: 'IGNIS ZETA AGS 1.2',
      year: 2021,
      fuel: 'Petrol',
      kms: '52,280',
      price: '6.25 Lakh',
      emi: '11,210'
    },
    {
      id: 4,
      make: 'Hyundai',
      model: 'VENUE 1.0 TURBO DCT SX O',
      year: 2023,
      fuel: 'Petrol',
      kms: '44,694',
      price: '9.75 Lakh',
      emi: '17,070'
    }
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="container hero-content">
          <h1>Trusted Cars.<br/>Transparent Deals.</h1>
          <p>Find quality pre-owned cars you can trust<br/>at the best value.</p>
          
          <div className="search-bar-widget">
            <div className="search-inputs grid grid-cols-3">
              <div className="input-group">
                <label>Budget</label>
                <select><option>Select Budget</option></select>
              </div>
              <div className="input-group">
                <label>City</label>
                <select><option>Select Body Type</option></select>
              </div>
              <div className="input-group">
                <label>Car Age</label>
                <select><option>Select Year</option></select>
              </div>
            </div>
            <button className="btn btn-primary search-btn">Search Cars</button>
          </div>
          
          <div className="hero-actions">
            <Link to="/cars" className="btn btn-primary">Browse Cars</Link>
            <Link to="/sell" className="btn btn-outline">Sell Your Car</Link>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="trust-badges container section">
        <div className="grid grid-cols-4 gap-4">
          <div className="badge-item">
            <div className="badge-icon"><Tool size={24} /></div>
            <div>
              <h4>140+</h4>
              <p>Quality Checks</p>
            </div>
          </div>
          <div className="badge-item">
            <div className="badge-icon"><RotateCcw size={24} /></div>
            <div>
              <h4>7 Days</h4>
              <p>Easy Return</p>
            </div>
          </div>
          <div className="badge-item">
            <div className="badge-icon"><ShieldCheck size={24} /></div>
            <div>
              <h4>100%</h4>
              <p>Transparent Process</p>
            </div>
          </div>
          <div className="badge-item">
            <div className="badge-icon"><Tag size={24} /></div>
            <div>
              <h4>Best Price</h4>
              <p>Guarantee</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Cars */}
      <section className="section bg-gray">
        <div className="container">
          <div className="flex justify-between items-center mb-8">
            <h2 className="section-title" style={{marginBottom: 0}}>Featured Cars</h2>
            <Link to="/cars" className="view-all-link">View All Cars <ArrowRight size={16}/></Link>
          </div>
          
          <div className="grid grid-cols-4 gap-6">
            {featuredCars.map(car => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section container">
        <div className="why-choose-grid">
          <div className="why-choose-text">
            <h2 className="section-title" style={{textAlign: 'left', marginBottom: '20px'}}>Why Choose ThinkArz?</h2>
            <p>At ThinkArz, we are committed to delivering a seamless car buying experience with trust, transparency and complete peace of mind.</p>
          </div>
          
          <div className="features-grid">
            <div className="feature-card">
              <CheckCircle className="feature-icon" size={32} />
              <h4>Quality Assured</h4>
              <p>Every car undergoes 140+ rigorous quality checks.</p>
            </div>
            <div className="feature-card">
              <FileText className="feature-icon" size={32} />
              <h4>Transparent History</h4>
              <p>Complete car history and documentation you can trust.</p>
            </div>
            <div className="feature-card">
              <Award className="feature-icon" size={32} />
              <h4>Best Value</h4>
              <p>Market best prices with no hidden charges.</p>
            </div>
            <div className="feature-card">
              <Users className="feature-icon" size={32} />
              <h4>Customer First</h4>
              <p>Dedicated support before, during and after your purchase.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Promo Banner */}
      <section className="promo-banner container mb-12">
        <div className="promo-content">
          <div>
            <h3>Looking to sell your car?</h3>
            <p>Get the best value for your car with a quick, free and hassle-free valuation.</p>
          </div>
          <div className="promo-actions">
            <Link to="/sell" className="btn btn-primary">Get Free Valuation</Link>
            <Link to="/sell" className="btn btn-outline-dark" style={{color: 'white', borderColor: 'white'}}>Sell Your Car</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
