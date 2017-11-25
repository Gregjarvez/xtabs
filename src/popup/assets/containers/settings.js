import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { setLimit } from '../../../events/actions/index';
import Button from '../components/button';
import Gear from '../components/gear';
import Query from '../components/query';
import Counter from '../components/counter';


class Setting extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  limitVisibility = () => {
    this.setState({ visible: true });
  };

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
        { !this.state.visible &&
          <Button buttonClassName="settingBtn" onclick={this.limitVisibility}>
            <Gear />
          </Button>
        }
        { this.state.visible &&
          <div className="settings-panel-visible">
            <Counter
              tabLimit={this.props.tabLimit}
              decrement={this.decrement}
              increment={this.increment}
            />
            <span>
              <Query />
            </span>
          </div>
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  tabLimit: state.tabLimit
});
const mapDispatchToProps = dispatch => ({
  setTabLimit: limit => dispatch(setLimit(limit))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Setting);
