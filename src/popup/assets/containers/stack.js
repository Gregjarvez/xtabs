import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import TabItem from '../components/tabItem';

class Stack extends PureComponent {

  tabItem({
    url, title, id, favIconUrl
  }) {
    return (
      <TabItem
        key={id}
        id={id}
        url={url}
        title={title}
        favIconUrl={favIconUrl}
      />
    );
  }

  includesSearchWord = (tab) => {
    const word = this.props.searchWord.toLowerCase();
    if (!this.props.searchWord.length) {
      return tab;
    }
    return tab.title.concat(tab.url).toLowerCase()
      .includes(word);
  };

  populate = predicate => (acc, nextTab) => {
    if (predicate(nextTab)) {
      acc.push(this.tabItem(nextTab));
      return acc;
    }
    return acc;
  }

  render() {
    return (
      <div className="stack">
        <ul>
          {
              this.props.tabs &&
              this.props.tabs
                  .reduce(this.populate(this.includesSearchWord), [])
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
