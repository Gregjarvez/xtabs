import React from 'react';

const TabHeader = ({ favIconUrl, title }) => {
  return (
    <div className="tab-header">
      <img
        src={(`${favIconUrl}`).includes('https') ? favIconUrl : './icons/favicon.ico'}
        alt="fav icon"
        className="favIcon"
      />
      <h3 className="tab-title">{(title).substring(0, 35)}
      </h3>
    </div>
  );
};

export default TabHeader;
