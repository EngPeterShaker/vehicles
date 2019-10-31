import React from 'react';
// import ReactDOM from 'react-dom';
import { shallow } from "enzyme";
import App from './App';
import { findByTestAttr } from '../utils';

const setUp = (props={}) => {
  const component = shallow(<App {...props} />);
  return component;
};

describe('App Component', () => {
  let component;
    beforeEach(() => {
        component = setUp();
    });

    it('Should render without errors', () => {
        const wrapper = findByTestAttr(component, 'AppComponent');
        console.log('wrapper', wrapper)
        expect(wrapper.length).toBe(1);
    });
  });


// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<App />, div);
//   ReactDOM.unmountComponentAtNode(div);
// });