import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '../components/button';
import { setLimit } from '../../../events/actions/index';

class Setting extends Component {
  constructor(props) {
    super(props);
    this.state = { visible: false };
  }

  limitVisibility = () => {
    this.setState({ visible: true });
  }

  operator(cb) {
    const val = cb(this.props.tabLimit);
    if (val < 1) return;
    this.props.setTabLimit(val);
  }

  increment = () => {
    return this.operator(val => val + 1);
  }

  decrement = () => {
    return this.operator(val => val - 1);
  }

  render() {
    return (
      <div className="settings">
        {
          !this.state.visible &&
          <Button
            classnameBtn="settingBtn"
            title="&#9881;"
            onclick={this.limitVisibility}
          />
        }
        {
          this.state.visible &&
          <div className="limitBtns">
            <Button classnameBtn="limitBtn" title="<" onclick={this.decrement} />
            <span className="limitCounter">{this.props.tabLimit}</span>
            <Button classnameBtn="limitBtn" title=">" onclick={this.increment} />
          </div>
        }
      </div>
    );
  }
}
const mapStateToProps = state => ({
  tabLimit: state.tabLimit
});
const mapDispatchToProps = dispatch => (
  {
    setTabLimit: limit => dispatch(setLimit(limit))
  }
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Setting);
