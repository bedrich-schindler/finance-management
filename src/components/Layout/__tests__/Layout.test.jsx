import React from 'react';
import { shallow } from 'enzyme';
import { Layout } from '..';

describe('rendering', () => {
  it('renders correctly', () => {
    const tree = shallow(
      <Layout>
        <p>Content</p>
      </Layout>,
    );

    expect(tree).toMatchSnapshot();
  });
});
