import React from 'react';
import renderer, { act } from 'react-test-renderer';
import App from '../App';

describe('<App />', () => {
	it('has 2 child', () => {
		const tree = renderer.create(<App />).toJSON();
		expect(tree.children.length).toBe(2);
	});
	it('matches snapshot and renders correctly', () => {
		let tree = renderer.create(<App />);
		expect(tree).toMatchSnapshot();
	});
});

// An old example:
// see https://github.com/callstack/react-native-testing-library/issues/398
//	await renderer.act(async () => {
// expect(tree).toMatchSnapshot();
//	});
