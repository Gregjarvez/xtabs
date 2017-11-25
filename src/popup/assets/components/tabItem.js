import React from 'react';
import { connect } from 'react-redux';
import Ionicon from 'react-ionicons';
import { deleteTab } from '../../../events/actions/index';

const Tab = ({
  title, url, id, removeTab, favIconUrl,
}) => {
  return (
    <li>
      <div className="tab-header">
        <img
          src={(`${favIconUrl}`).includes('https') ? favIconUrl : './icons/favicon.ico'}
          alt="fav icon"
          className="favIcon"
        />
        <h3 className="tab-title">{ (
            title
        ).substring(0, 35) }
        </h3>
      </div>
      <div className="tab-ctrl">
        <a
          href={url}
          target="_blank"
          className="tab-link"
        >
          { url.slice(0, 30).concat('...') }
        </a>
        <div>
          <Ionicon
            icon="ios-close-circle"
            rotate
            fontSize="18px"
            className="close"
            onClick={() => removeTab(id)}
            color="#e74c3c"
          />
        </div>
      </div>
    </li>
  );
};
const mapStateToProps = state => (
  {}
);
const mapDispatchToProps = dispatch => (
  {
    removeTab(id) {
      dispatch(deleteTab(id));
    },
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(Tab);
