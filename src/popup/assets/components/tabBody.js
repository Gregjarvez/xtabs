import React from 'react';

const TabBody = ({ url, removeTab, id }) => {

  return (
    <div className="tab-ctrl">
      <a href={url} target="_blank" className="tab-link" onClick={() => removeTab(id)}>
        { url.slice(0, 30).concat('...') }
      </a>
      <div>
        <span className="close" onClick={() => removeTab(id)}>&#x2716;</span>
      </div>
    </div>
  );
};

export default TabBody;
