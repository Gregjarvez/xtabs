/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
  import { setCloseType } from '../../../events/actions';

const Query = ({closeType, setCloseType }) => {
  console.log(closeType)
  return (
    <form>
      <div className="form-heading">CLOSE</div>
      <div>
        <input
            type="radio"
            id="oldest"
            name="close"
            checked={closeType === 'oldest'}
            onChange={() => setCloseType('oldest')}
        />
        <label htmlFor="oldest" className="label">Oldest</label>
      </div>
      <div>
        <input
            type="radio"
            id="left-most"
            name="close"
            checked={closeType  === 'left-most'}
            onChange={() => setCloseType('left-most')}
        />
        <label htmlFor="left-most" className="label">Left-most Tab</label>
      </div>
    </form>
  );
};

const mapStateToProps = (state) => ({
  closeType: state.settings.closeType
})

const mapDispatchToProps = (dispatch) => ({
  setCloseType: type => dispatch(setCloseType(type))
})


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Query);

