import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MemoryRouter } from 'react-router'
import NotFoundLayout from './NotFoundLayout';
import '../../components/Translation/testData';

configure({ adapter: new Adapter() });


describe('<NotFoundLayout />', () => {
  test('Renders without crashing', () => {
    const wrapper = shallow(<NotFoundLayout />);
    expect(wrapper).toHaveLength(1);
  });

  test('Matches snapshot', () => {
    expect(renderer.create(<MemoryRouter><NotFoundLayout /></MemoryRouter>).toJSON()).toMatchSnapshot();
  });
});
