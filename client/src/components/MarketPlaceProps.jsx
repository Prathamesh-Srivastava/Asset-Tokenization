import React from 'react';
import MarketPlace from './MarketPlace';

const MarketPlaceProps = () => {
  const offerTitle = "Available Offer";
  const imgSrc = "/mall.jpg"; // Replace with your image path
  const propertyTitle = "Avenue Mall";
  const category = "Commercial Office";
  const location = "Mumbai";
  const shareType = "Equity";
  const description = "Exciting opportunity in Mumbai’s vibrant real estate market: 5% equity in a prime mall available for INR 1 crore. Secure your stake in a high-traffic location poised for growth. Don’t miss out on this lucrative investment chance!";
  const equityInfo = "5% EQUITY FOR SALE (1CR)";
  const ownerName = "OWNER NAME";

  return (
    <MarketPlace
      offerTitle={offerTitle}
      imgSrc={imgSrc}
      propertyTitle={propertyTitle}
      category={category}
      location={location}
      shareType={shareType}
      description={description}
      equityInfo={equityInfo}
      ownerName={ownerName}
    />
  );
};

export default MarketPlaceProps;
