import React from 'react';
import './CarCard.css';
import { User, Battery, Zap, Fuel, Activity } from 'lucide-react';

const CarCard = ({ car }) => {
  // Using a placeholder car image based on fuel type for variety
  const getPlaceholderImage = (make) => {
    switch(make.toLowerCase()) {
      case 'mg': return 'https://thinkarz.com/wp-content/uploads/2025/10/WhatsApp-Image-2025-10-03-at-5.59.55-PM.jpeg';
      case 'kia': return 'https://thinkarz.com/wp-content/uploads/2025/10/WhatsApp-Image-2025-10-03-at-6.00.30-PM.jpeg';
      case 'hyundai': return 'https://thinkarz.com/wp-content/uploads/2025/10/WhatsApp-Image-2025-10-03-at-6.01.51-PM.jpeg';
      case 'maruti suzuki': return 'https://thinkarz.com/wp-content/uploads/2025/10/WhatsApp-Image-2025-10-03-at-6.02.15-PM.jpeg';
      default: return 'https://thinkarz.com/wp-content/uploads/2025/10/WhatsApp-Image-2025-10-03-at-6.12.05-PM.jpeg';
    }
  };

  return (
    <div className="car-card">
      <div className="car-card-img">
        <img src={car.image || getPlaceholderImage(car.make)} alt={`${car.make} ${car.model}`} />
      </div>
      <div className="car-card-content">
        <div className="car-title">
          <h3>{car.make} - {car.model.split(' ')[0]}</h3>
          <p>{car.model.substring(car.model.indexOf(' ') + 1)}</p>
        </div>
        
        <div className="car-specs">
          <span><User size={12}/> {car.year}</span>
          <span className="dot">•</span>
          <span>
            {car.fuel === 'EV' || car.fuel === 'Electric' ? <Zap size={12}/> : <Fuel size={12}/>} 
            {car.fuel}
          </span>
          <span className="dot">•</span>
          <span><Activity size={12}/> {car.kms} km</span>
        </div>
        
        <div className="car-price-row">
          <div className="car-price">Rs. {car.price}</div>
          <div className="car-emi">EMI at Rs. {car.emi}</div>
        </div>
        
        {car.showActions && (
          <div className="car-card-actions">
            <button className="btn btn-primary">View Details</button>
            <button className="btn btn-outline-dark">Make Offer</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CarCard;
