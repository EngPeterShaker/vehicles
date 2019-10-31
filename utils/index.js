import { checkPropTypes } from "prop-types";

export const findByTestAttr = (component, attr) => {
  const wrapper = component.find(`[data-test='${attr}']`);
  return wrapper;
};


export const checkProps =(component , expectedProps)=>{
  const {propTypes , name} = component;
const propErr = checkPropTypes(propTypes,expectedProps , 'props', name);
return propErr ;
}