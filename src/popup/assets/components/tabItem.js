import React from 'react';
import { connect } from 'react-redux';
import { deleteTab } from '../../../events/actions/index';
import Ionicon from 'react-ionicons'

const Tab = ({
  title, url, id, removeTab
}) => {
  return (
    <li>
      <h3 className="webTitle">{ title.slice(0,28) }</h3>
      {/* <p> { favIconUrl } </p> */}
      <div>
        <a href={url} target="_blank" className="webLink">{url.slice(0, 25).concat('...')} <Ionicon icon="ios-open" rotate={true} fontSize="16px" color="#10D2E5"/> </a>
      </div>
        <div className="icon"><Ionicon icon="ios-close-circle" rotate={true} fontSize="18px" onClick={() => removeTab(id)} color="#e74c3c"/></div>
    </li>
  );
};
const mapStateToProps = (state) => ({})
const mapDispatchToProps = dispatch => (
  {
    removeTab(id) {
      dispatch(deleteTab(id));
    }
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(Tab);
