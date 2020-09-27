import componentsConfig from './componentConfig';

let components = {};

for (var i = 0; i < componentsConfig.length; i++) {
  let componentConfig = componentsConfig[i];
  // Check if component is not already loaded then load it
  if (components[componentConfig.name] === undefined) {
    components[componentConfig.name] = require(`${componentConfig.path}`).default;
  }
}

export default components;
