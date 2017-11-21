import React from 'react';
import { connect } from 'react-redux';
import { deleteTab } from '../../../events/actions/index';
import Ionicon from 'react-ionicons'

const Tab = ({
  title, url, id, removeTab
}) => {
  return (
    <li>
      <h3 className="webTitle">{ title }</h3>
      {/* <p> { favIconUrl } </p> */}
      <div>
        <a href={url} target="_blank" className="webLink">{url.slice(0, 15).concat('...')}</a>
      </div>
      <Ionicon icon="ios-add-circle" fontSize="35px" onClick={() => removeTab(id)}/>
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
