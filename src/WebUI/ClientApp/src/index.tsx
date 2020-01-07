import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import App from './containers/App';
import Language from './containers/Language';
import * as serviceWorker from './serviceWorker';
import { translationMessages } from './containers/Language/i18n';

ReactDOM.render(
  <Router>
    <Language messages={translationMessages}>
      <HelmetProvider>
        <Helmet>
          <meta name="description" content="" />
        </Helmet>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <App />
        </MuiPickersUtilsProvider>
      </HelmetProvider>
    </Language>
  </Router>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
