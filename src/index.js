import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import SimpleMenu from './components/Menu';
import HttpsRedirect from 'react-https-redirect';

import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <div className="App">
      <SimpleMenu />
      
    </div>,
  document.getElementById('root')
);

serviceWorker.register();
