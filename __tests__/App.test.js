import React from 'react';
import renderer, {act} from 'react-test-renderer';
import App from '../App';
 

 
describe('<App /> Basics', () => {
	it('has 1 child', () => {
	  let tree
	 // renderer.act(()=>{
		 tree = renderer.create(<App />)
	//  })
	  expect(tree).toMatchSnapshot();
	});
  });

 /*
describe('<App />', () => {
 
	it('renders correctly', async () => {
		const tree = await renderer.create(<App />).toJSON();

		// see https://github.com/callstack/react-native-testing-library/issues/398
		await act(() => {
			expect(tree).toMatchSnapshot();
		});
	});
});
 */

 

 
