import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MemoryRouter } from 'react-router'
import NotFound from './NotFound';
import '../Translation/testData';

configure({ adapter: new Adapter() });

describe('<NotFound />', () => {
  it('Renders without crashing', () => {
    const wrapper = shallow(<NotFound />);
    expect(wrapper).toHaveLength(1);
  });

  it('Matches snapshot', () => {
    expect(renderer.create(<MemoryRouter><NotFound /></MemoryRouter>).toJSON()).toMatchSnapshot();
  });
});
