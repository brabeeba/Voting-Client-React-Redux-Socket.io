import React from 'react';
import Winner from './Winner';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Vote from './Vote';

import {connect} from 'react-redux';

import * as actionCreator from '../action_creator';


export const Voting = React.createClass({
  mixins: [PureRenderMixin],
  
  render: function() {
    return <div>
      {this.props.winner ?
        <Winner ref="winner" winner={this.props.winner} /> :
        <Vote {...this.props} />}
    </div>;
  }
});

function mapStateToProps(state) {
  return {
    pair: state.getIn(['vote', 'pair']),
    winner: state.get('winner'),
    hasVoted: state.get('hasVoted')
  };
}

export const VotingContainer = connect(
  mapStateToProps,
  actionCreator
)(Voting);