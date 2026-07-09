import React from 'react';
import './About.css';
import { Shield, Building, Users, CheckCircle, Flag, TrendingUp, Car } from 'lucide-react';

const About = () => {
  return (
    <div className="page-wrapper">
      {/* Hero Section */}
      <section className="section container">
        <div className="grid grid-cols-2 gap-8 items-center">
          <div>
            <h5 className="text-primary uppercase font-bold tracking-wider mb-2" style={{color: 'var(--primary-color)', fontSize: '0.85rem'}}>ABOUT THINKARZ</h5>
            <h1 style={{fontSize: '3.5rem', fontWeight: 800, lineHeight: 1.1, marginBottom: '24px', color: 'var(--text-dark)'}}>
              Driven by Trust.<br/>Built for You.
            </h1>
            <p style={{fontSize: '1.1rem', color: 'var(--text-dark)', marginBottom: '24px', lineHeight: 1.6, fontWeight: 500}}>
              ThinkArz is the pre-owned car venture of Gautam Modi Group, built on decades of trust, customer first approach, and a passion for mobility.
            </p>
            <p style={{fontSize: '1.1rem', color: 'var(--text-dark)', lineHeight: 1.6}}>
              We are committed to delivering quality cars, transparent deals, and a seamless ownership experience.
            </p>
          </div>
          <div className="about-hero-img">
            <img src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80" alt="ThinkArz Showroom" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section container border-t border-b">
        <div className="grid grid-cols-4 gap-4 text-center py-8">
          <div className="stat-item">
            <div className="stat-icon mx-auto"><Shield size={32} /></div>
            <h2>35+</h2>
            <p>Years of Legacy</p>
          </div>
          <div className="stat-item">
            <div className="stat-icon mx-auto"><Building size={32} /></div>
            <h2>1</h2>
            <p>Branch</p>
          </div>
          <div className="stat-item">
            <div className="stat-icon mx-auto"><Users size={32} /></div>
            <h2>50,000+</h2>
            <p>Happy Customers</p>
          </div>
          <div className="stat-item">
            <div className="stat-icon mx-auto"><CheckCircle size={32} /></div>
            <h2>100%</h2>
            <p>Transparency</p>
          </div>
        </div>
      </section>

      {/* Our Journey Section */}
      <section className="section container">
        <h2 className="section-title" style={{textAlign: 'left', marginBottom: '60px'}}>Our Journey</h2>
        
        <div className="journey-timeline">
          <div className="journey-line"></div>
          
          <div className="journey-steps">
            <div className="journey-step">
              <div className="journey-icon"><Flag size={24} /></div>
              <div className="journey-content">
                <h3>1990s</h3>
                <p>Gautam Modi Group was founded with a vision to serve customers with integrity and trust.</p>
              </div>
            </div>
            
            <div className="journey-step">
              <div className="journey-icon"><TrendingUp size={24} /></div>
              <div className="journey-content">
                <h3>2010s</h3>
                <p>Expanded across automotive retail with multiple brands.</p>
              </div>
            </div>
            
            <div className="journey-step">
              <div className="journey-icon"><Car size={24} /></div>
              <div className="journey-content">
                <h3>2020s</h3>
                <p>Launched ThinkArz to revolutionize the pre-owned car experience.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="section container mb-12">
        <h2 className="section-title" style={{textAlign: 'left', marginBottom: '40px'}}>Our Leadership Team</h2>
        
        <div className="grid grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="team-member">
              <div className="team-avatar">
                <Users size={48} color="#cbd5e1" />
              </div>
              <p className="team-designation">Designation</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
