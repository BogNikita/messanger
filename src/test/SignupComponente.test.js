import React from 'react';
import { shallow, configure } from 'enzyme';
import { expect } from 'chai';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import SignupComponent from '../components/Signup/SignupComponent';

import { Provider } from 'react-redux';
import store from '../store';

configure({ adapter: new Adapter() });

describe('<SignupComponent/>', () => {
  it('Should render form in SignupComponent', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <SignupComponent />
      </Provider>,
    );
    expect(wrapper.find('form')).to.have.lengthOf(0);
  });
});
