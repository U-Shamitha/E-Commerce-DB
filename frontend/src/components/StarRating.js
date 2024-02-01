import React from 'react';
import PropTypes from 'prop-types';
import '../styles/StarRating.css';

const StarRating = ({ rating }) => {
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const remainder = rating - fullStars;

    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
    //   <div key={i} className="star full-star" />
      <div key={i} className="star full-star" style={{position:'relative'}}>
          <img style={{position:'absolute', width:'15px', height:'14.4px'}} src='./starOutline.png'/>
        </div>
      );
    }

    // Add remainder star
    if (remainder > 0) {
      const remainderPercentage = `${(remainder * 100).toFixed(0)}%`;
      stars.push(
        <div key="remainder" className="star remainder-star" style={{position:'relative'}}>
          <img style={{position:'absolute', width:'15px', height:'14.4px'}} src='./starOutline.png'/>
          <div className="remainder-star-fill" style={{ width: remainderPercentage}} />
        </div>
      );
    }else{
      stars.push(
        <div key="remainder" className="star remainder-star" style={{position:'relative'}}>
          <img style={{position:'absolute', width:'15px', height:'14.4px'}} src='./starOutline.png'/>
        </div>
      );
    }

    return stars;
  };

  return <div className="star-rating">{renderStars()}</div>;
};

StarRating.propTypes = {
  rating: PropTypes.number.isRequired,
};

export default StarRating;
