import React from 'react';
import './PreOwnedCars.css';
import CarCard from '../components/CarCard';

const PreOwnedCars = () => {
  const cars = [
    { id: 1, make: 'MG', model: 'COMET EV EXCLUSIVE FC', year: 2024, fuel: 'EV', kms: '14,568', price: '4.50 Lakh', emi: '8,125', showActions: true },
    { id: 2, make: 'KIA', model: 'SONET GT 1.0T DCT GTX PLUS', year: 2024, fuel: 'Petrol', kms: '9,000', price: '13.75 Lakh', emi: '24,665', showActions: true },
    { id: 3, make: 'Maruti Suzuki', model: 'IGNIS ZETA AGS 1.2', year: 2021, fuel: 'Petrol', kms: '52,280', price: '6.25 Lakh', emi: '11,210', showActions: true },
    { id: 4, make: 'Hyundai', model: 'VENUE 1.0 TURBO DCT SX O', year: 2023, fuel: 'Petrol', kms: '44,694', price: '9.75 Lakh', emi: '17,070', showActions: true },
    { id: 5, make: 'TATA', model: 'NEXON EV XZ+', year: 2023, fuel: 'Electric', kms: '20,935', price: '12.95 Lakh', emi: '22,140', showActions: true },
    { id: 6, make: 'MG', model: 'ZS ASTOR VTI TECH CVT SHARP 1.5', year: 2022, fuel: 'Petrol', kms: '14,136', price: '8.95 Lakh', emi: '15,420', showActions: true },
  ];

  const filters = [
    { label: 'Make / Model', placeholder: 'Select Make / Model' },
    { label: 'Seller Type', placeholder: 'Select Seller Type' },
    { label: 'City', placeholder: 'Select City' },
    { label: 'Car Age (Year)', placeholder: 'Select Year' },
    { label: 'Fuel', placeholder: 'Select Fuel' },
    { label: 'Kilometer (Kms)', placeholder: 'Select Kms' },
    { label: 'Transmission', placeholder: 'Select Transmission' },
    { label: 'Body Type', placeholder: 'Select Body Type' },
    { label: 'Owners', placeholder: 'Select Owners' },
  ];

  return (
    <div className="cars-page section bg-gray">
      <div className="container">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="section-title" style={{textAlign: 'left', marginBottom: '10px'}}>Pre Owned Cars</h1>
            <p className="text-muted">Explore our wide range of quality pre-owned cars.<br/>Find the perfect car that fits your needs and budget.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="car-count">
              <strong>120+</strong> Cars Available
            </div>
            <select className="sort-select">
              <option>Sort By: Newest First</option>
            </select>
          </div>
        </div>

        <div className="cars-layout">
          {/* Sidebar Filters */}
          <aside className="filters-sidebar">
            {filters.map((filter, index) => (
              <div key={index} className="filter-group">
                <label>{filter.label}</label>
                <select><option>{filter.placeholder}</option></select>
              </div>
            ))}
            
            <div className="filter-group">
              <label>Show Cars With</label>
              <div className="checkbox-group">
                <input type="checkbox" id="certified" />
                <label htmlFor="certified" style={{marginBottom: 0, fontWeight: 'normal'}}>Certified Cars</label>
              </div>
            </div>
            
            <button className="btn btn-outline-dark reset-btn" style={{width: '100%', marginTop: '10px'}}>
              Reset Filters
            </button>
          </aside>

          {/* Cars Grid */}
          <main className="cars-grid-container">
            <div className="grid grid-cols-3 gap-6">
              {cars.map(car => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
            
            {/* Pagination */}
            <div className="pagination">
              <button className="page-btn disabled">&lt;</button>
              <button className="page-btn active">1</button>
              <button className="page-btn">2</button>
              <button className="page-btn">3</button>
              <button className="page-btn">4</button>
              <span className="page-ellipsis">...</span>
              <button className="page-btn">10</button>
              <button className="page-btn">&gt;</button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default PreOwnedCars;
