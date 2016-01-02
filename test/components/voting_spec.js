import {Voting} from '../../src/components/Voting';
import React from 'react/addons';
import ReactDom from 'react-dom';
import Vote from '../../src/components/Vote';
import {List} from 'immutable';

import {expect} from 'chai';

const {renderIntoDocument, scryRenderedDOMComponentsWithTag, Simulate} = React.addons.TestUtils;

describe('Voting', () => {
	it('render two buttons', () => {
		const component = renderIntoDocument(
      		<Voting pair={["1", "2"]} />
    	);

    	const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

    	expect(buttons.length).to.equal(2);
    	expect(buttons[0].textContent).to.equal('1');
    	expect(buttons[1].textContent).to.equal('2');
	});

	it('invoke callback when button is clicked', () => {
		let vote;
		const voting = (entry) => vote = entry;
		const component = renderIntoDocument(
      		<Voting pair={["1", "2"]} vote = {voting} />
    	);

    	const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
    	Simulate.click(buttons[0]);

    	expect(vote).to.equal('1');
	});

	it('disables buttons when user has voted', () => {
	  const component = renderIntoDocument(
	    <Voting pair={["Trainspotting", "28 Days Later"]}
	            voted="Trainspotting" />
	  );
	  const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

	  expect(buttons.length).to.equal(2);
	  expect(buttons[0].hasAttribute('disabled')).to.equal(true);
	  expect(buttons[1].hasAttribute('disabled')).to.equal(true);
	});

	it('adds label to the voted entry', () => {
	  const component = renderIntoDocument(
	    <Voting pair={["Trainspotting", "28 Days Later"]}
	            voted="Trainspotting" />
	  );
	  const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

	  expect(buttons[0].textContent).to.contain('Voted');
	});

	it('renders just the winner when there is one', () => {
	  const component = renderIntoDocument(
	    <Voting winner="Trainspotting" />
	  );
	  const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
	  expect(buttons.length).to.equal(0);

	  const winner = ReactDom.findDOMNode(component.refs.winner);
	  expect(winner).to.be.ok;
	  expect(winner.textContent).to.contain('Trainspotting');
	});

	it('renders as a pure component', () => {
	  const pair = ['Trainspotting', '28 Days Later'];
	  const component = renderIntoDocument(
	    <Voting pair={pair} />
	  );

	  const componentDom = ReactDom.findDOMNode(component);

	  let firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
	  expect(firstButton.textContent).to.equal('Trainspotting');

	  pair[0] = 'Sunshine';
	  ReactDom.render(<Voting pair={pair} />, componentDom.parentNode);
	  firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
	  expect(firstButton.textContent).to.equal('Trainspotting');
	});

	it('does update DOM when prop changes', () => {
	    const pair = List.of('Trainspotting', '28 Days Later');
	    const component = renderIntoDocument(
	      <Voting pair={pair} />
	    );

	    const componentDom = ReactDom.findDOMNode(component);

	    let firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
	    expect(firstButton.textContent).to.equal('Trainspotting');

	    const newPair = pair.set(0, 'Sunshine');

	    ReactDom.render(<Voting pair={newPair} />, componentDom.parentNode);
	  
	    firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
	    expect(firstButton.textContent).to.equal('Sunshine');
	  });
});