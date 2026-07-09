import React from 'react';
import './Forms.css';
import { Search, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Blogs = () => {
  const blogs = [
    { id: 1, category: 'Tips & Advice', title: 'How to Get the Best Resale Value for Your Car', date: 'May 15, 2024', read: '4 min read', img: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=600&q=80' },
    { id: 2, category: 'Car Insurance', title: 'Understanding Car Insurance: A Complete Guide', date: 'May 10, 2024', read: '6 min read', img: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=600&q=80' },
    { id: 3, category: 'Car Maintenance', title: '5 Essential Car Maintenance Tips for a Smooth Drive', date: 'May 05, 2024', read: '5 min read', img: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=600&q=80' },
    { id: 4, category: 'Automobile News', title: 'BS6 vs BS4: What\'s the Difference?', date: 'Apr 30, 2024', read: '4 min read', img: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=600&q=80' },
    { id: 5, category: 'Automobile News', title: 'Upcoming Cars in India in 2024', date: 'Apr 25, 2024', read: '5 min read', img: 'https://images.unsplash.com/photo-1503376760366-071a26908e27?auto=format&fit=crop&w=600&q=80' },
    { id: 6, category: 'Tips & Advice', title: 'Summer Car Care: Keep Your Car Cool & Efficient', date: 'Apr 25, 2024', read: '4 min read', img: 'https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=600&q=80' },
  ];

  return (
    <div className="page-wrapper">
      <section className="form-hero-section" style={{
        backgroundImage: `linear-gradient(to right, rgba(15, 23, 42, 0.9) 0%, rgba(15, 23, 42, 0.4) 100%), url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80')`,
        color: 'white',
        minHeight: '400px'
      }}>
        <div className="container">
          <h5 className="text-primary uppercase font-bold tracking-wider mb-2" style={{color: 'var(--primary-color)'}}>BLOGS</h5>
          <h1 style={{fontSize: '3rem', fontWeight: 800, marginBottom: '20px'}}>Car Insights.<br/>Expert Advice.</h1>
          <p style={{fontSize: '1.1rem', color: '#e2e8f0'}}>Stay updated with the latest automotive trends,<br/>tips and news from the world of cars.</p>
        </div>
      </section>

      <section className="section container">
        <div className="grid grid-cols-4 gap-8">
          
          <div className="col-span-3" style={{gridColumn: 'span 3'}}>
            <h2 className="section-title" style={{textAlign: 'left', marginBottom: '20px', fontSize: '1.5rem'}}>Featured Blog</h2>
            <div style={{display: 'flex', gap: '30px', background: 'white', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border-color)', marginBottom: '50px'}}>
              <img src="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80" alt="Featured" style={{width: '50%', objectFit: 'cover'}} />
              <div style={{padding: '30px', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                <span style={{color: 'var(--primary-color)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '10px'}}>Buying Guide</span>
                <h3 style={{fontSize: '1.8rem', fontWeight: 700, marginBottom: '16px'}}>Top 10 Things to Check Before Buying a Used Car</h3>
                <div style={{display: 'flex', gap: '16px', color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '20px'}}>
                  <span>May 20, 2024</span>
                  <span>•</span>
                  <span>5 min read</span>
                </div>
                <p style={{color: 'var(--text-muted)', marginBottom: '20px'}}>Buying a used car? Here's a complete checklist to help you make a smart and safe purchase.</p>
                <Link to="#" style={{color: 'var(--primary-color)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px'}}>Read More <ChevronRight size={16} /></Link>
              </div>
            </div>

            <h2 className="section-title" style={{textAlign: 'left', marginBottom: '20px', fontSize: '1.5rem'}}>All Blogs</h2>
            <div className="grid grid-cols-3 gap-6">
              {blogs.map(blog => (
                <div key={blog.id} style={{background: 'white', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border-color)'}}>
                  <img src={blog.img} alt={blog.title} style={{width: '100%', height: '180px', objectFit: 'cover'}} />
                  <div style={{padding: '20px'}}>
                    <span style={{display: 'inline-block', padding: '4px 8px', background: 'var(--bg-gray)', color: 'var(--primary-color)', fontSize: '0.75rem', fontWeight: 600, borderRadius: '4px', marginBottom: '12px'}}>{blog.category}</span>
                    <h4 style={{fontSize: '1.1rem', fontWeight: 700, marginBottom: '12px', lineHeight: 1.3}}>{blog.title}</h4>
                    <div style={{display: 'flex', gap: '10px', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '16px'}}>
                      <span>{blog.date}</span>
                      <span>•</span>
                      <span>{blog.read}</span>
                    </div>
                    <Link to="#" style={{color: 'var(--primary-color)', fontWeight: 600, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '4px'}}>Read More <ChevronRight size={16} /></Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="col-span-1">
            <div className="form-group" style={{position: 'relative', marginBottom: '40px'}}>
              <input type="text" placeholder="Search blogs..." style={{width: '100%', padding: '12px 16px', border: '1px solid var(--border-color)', borderRadius: '6px'}} />
              <Search size={18} style={{position: 'absolute', right: '16px', top: '14px', color: 'var(--text-muted)'}} />
            </div>

            <div className="form-card" style={{marginBottom: '30px'}}>
              <h3 style={{fontSize: '1.2rem', marginBottom: '20px'}}>Categories</h3>
              <ul style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
                {[
                  { name: 'Buying Guide', count: 12 },
                  { name: 'Car Maintenance', count: 10 },
                  { name: 'Car Insurance', count: 6 },
                  { name: 'Automobile News', count: 8 },
                  { name: 'Tips & Advice', count: 9 },
                ].map((cat, i) => (
                  <li key={i} style={{display: 'flex', justifyContent: 'space-between', color: 'var(--text-dark)', fontWeight: 500}}>
                    <Link to="#" style={{display: 'flex', alignItems: 'center', gap: '8px'}}><ChevronRight size={16} color="var(--text-muted)" /> {cat.name}</Link>
                    <span style={{color: 'var(--text-muted)'}}>{cat.count}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="form-card">
              <h3 style={{fontSize: '1.2rem', marginBottom: '20px'}}>Popular Posts</h3>
              <div style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
                {blogs.slice(0, 3).map(blog => (
                  <div key={blog.id} style={{display: 'flex', gap: '12px'}}>
                    <img src={blog.img} alt="" style={{width: '60px', height: '60px', borderRadius: '6px', objectFit: 'cover'}} />
                    <div>
                      <h5 style={{fontSize: '0.9rem', fontWeight: 600, marginBottom: '4px', lineHeight: 1.2}}>{blog.title}</h5>
                      <span style={{fontSize: '0.8rem', color: 'var(--text-muted)'}}>{blog.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blogs;
