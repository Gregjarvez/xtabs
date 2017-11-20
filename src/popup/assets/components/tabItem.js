import React from 'react';
import { connect } from 'react-redux';
import { deleteTab } from '../../../events/actions/index';

const Tab = ({
  title, url, id, removeTab
}) => {
  return (
    <li>
      <div>{ title }</div>
      <div>
        <a href={url}>{url.slice(0, 15).concat('...')}</a>
      </div>
      <button onClick={() => removeTab(id)}>delete</button>
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
