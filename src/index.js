//entry
const element = document.createElement('div');
element.setAttribute("id","root");
document.body.appendChild(element);

//import fresh from './todos'

import fresh from './todomvc'
fresh(element);
