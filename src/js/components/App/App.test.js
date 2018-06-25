import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import store from '../../storage/reduxStore';
import App from './App';

configure({ adapter: new Adapter() });

test('<App />: renders without crashing', () => {
  const wrapper = shallow(<Provider store={store}><App /></Provider>);
  expect(wrapper).toHaveLength(1);
});
