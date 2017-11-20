import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setWord } from '../../../events/actions';

class SearchField extends Component {
  state = { searchWord: '' }

  render() {
    this.props.setSearchWord(this.state.searchWord);
    return (
      <div className="searchField">
        <input
          type="type"
          value={this.state.searchWord}
          onChange={e => this.setState({ searchWord: e.target.value })}
        />
      </div>
    );
  }
}

const mapStateToProps = state => (
  { searchWord: state.searchWord }
);

const mapDispatchToProps = dispatch => (
  {
    setSearchWord: word => dispatch(setWord(word))
  }
);


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchField);
