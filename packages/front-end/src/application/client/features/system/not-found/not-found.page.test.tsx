import * as React from 'react';
import { shallow } from 'enzyme';
import 'jest-styled-components';
import NotFound from './not-found.page';

test('NotFound page basic render', () => {
  const page = shallow(<NotFound />);
  expect(page.text()).toEqual('Not found page');
  expect(page).toMatchSnapshot();
});
