import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { setLimit } from '../../../events/actions/index';
import { Gear, Button } from '../components/commons';
import Query from '../components/query';
import Counter from '../components/counter';


class Setting extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  toggleSettingPanel = () => {
    this.setState({ visible: true });
  };

  operator(cb) {
    const val = cb(this.props.tabLimit);
    if (val < 1) return;
    this.props.setTabLimit(val);
  }

  increment = () => this.operator(val => val + 1);

  decrement = () => this.operator(val => val - 1);

  render() {
    return (
      <div className="settings">
        { !this.state.visible &&
          <Button buttonClassName="settingBtn" onclick={this.toggleSettingPanel}>
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
  tabLimit: state.settings.tabLimit
});
const mapDispatchToProps = dispatch => ({
  setTabLimit: limit => dispatch(setLimit(limit))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Setting);
