import React from 'react';
import renderer from 'react-test-renderer';
import App from '../App';
import { act } from 'react-test-renderer';

describe('<App />', () => {
	//it('has 1 child', () => {
	//	const tree = renderer.create(<App />).toJSON();
	//	expect(tree.children.length).toBe(1);
	//});
	it('renders correctly', async () => {
		const tree = renderer.create(<App />).toJSON();

		// see https://github.com/callstack/react-native-testing-library/issues/398
		await act(async () => {
			expect(tree).toMatchSnapshot();
		});
	});
});

/*
describe('<App /> Basics', () => {
  it('has 1 child', async () => {
    let tree
    renderer.act(()=>{
       tree = renderer.create(<App />)
    })
    expect(tree).toMatchSnapshot();
  });
})
*/
