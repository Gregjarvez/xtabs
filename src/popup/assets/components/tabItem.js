import React from 'react';
import { connect } from 'react-redux';
import { deleteTab } from '../../../events/actions/index';
import TabHeader from './tabHeader';
import TabBody from './tabBody';

const Tab = ({
  title, url, id, removeTab, favIconUrl,
}) => {
  return (
    <li>
      <TabHeader favIconUrl={favIconUrl} title={title} />
      <TabBody url={url} id={id} removeTab={removeTab} />
    </li>
  );
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => (
  {
    removeTab(id) {
      dispatch(deleteTab(id));
    },
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(Tab);
