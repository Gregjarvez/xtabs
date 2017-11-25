/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import { closeType } from '../../../events/actions';

const Query = (props) => {
  return (
    <form>
      <div className="form-heading">CLOSE</div>
      <div>
        <input
            type="radio"
            id="oldest"
            name="close"
            checked={props.closeType === 'oldest'}
            onChange={() => props.setCloseType('oldest')}
        />
        <label htmlFor="oldest" className="label">Oldest</label>
      </div>
      <div>
        <input
            type="radio"
            id="left-most"
            name="close"
            checked={props.closeType  === 'left-most'}
            onChange={() => props.setCloseType('left-most')}
        />
        <label htmlFor="left-most" className="label">Left-most Tab</label>
      </div>
    </form>
  );
};

const mapStateToProps = (state) => ({
  closeType: state.closeType
})

const mapDispatchToProps = (dispatch) => ({
  setCloseType: id => dispatch(closeType(id))
})


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Query);

