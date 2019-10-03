import * as React from 'react';
import { shallow } from 'enzyme';
import NotFound from './not-found.component';

test('NotFound page basic render', () => {
  const page = shallow(<NotFound />);
  expect(page.text()).toEqual('Not found page');
  expect(page).toMatchSnapshot();
});
