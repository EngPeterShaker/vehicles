import React from 'react';
import {Shallow } from 'Enzyme';
import VehiclesList from './VehiclesList';

import {findByTestAttr , checkProps } from '../../utils'

const setUp = (props={}) => {
  const component = shallow(<VehiclesList {...props} />);
  return component;
};

describe('it should be fine ' , () => {

  describe('checking propTypes' ,() =>{

    it('should load props fine' , () => {

      const expectedProps={};
      const propsErr = checkProps( VehiclesList, expectedProps);
      expect(propsErr).toBeUndefined();

    })
  })
});
