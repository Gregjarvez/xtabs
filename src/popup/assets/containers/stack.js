/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import TabItem from '../components/tabItem';

class Stack extends Component {
  constructor(props) {
    super(props);
  }

  includesSearchWord = (tab) => {
    const word = this.props.searchWord.toLowerCase();
    if (!this.props.searchWord.length) {
      return tab;
    }
    return tab.title.concat(tab.url).toLowerCase()
      .includes(word);
  }

  populate = ({ url, title, id }) => {
    return (
      <TabItem
        key={id}
        id={id}
        url={url}
        title={title}
      />
    );
  }

  render() {
    return (
      <div className="stack">
        <ul>
          {
              this.props.tabs &&
              this.props.tabs
                  .filter(this.includesSearchWord)
                  .map(this.populate)
            }
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    tabs: state.tabs,
    searchWord: state.searchWord || '',
  }
);

export default connect(mapStateToProps)(Stack);
