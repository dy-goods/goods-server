import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { observer, Provider } from 'mobx-react';

import store from './stores';
import Routes from './routes';

import './styles/main.scss';
import Alert from './components/Alert';

@observer
export default class App extends React.Component {
  render() {
    return (
      <Provider {...store}>
        <div className="main" id="main">
          <Alert
            show={store.errorStore.error !== null}
            confirmText="知道了"
            noCancel={true}
            noClose={true}
            onClosed={() => store.errorStore.setError(null)}
          >
            {store.errorStore.error && store.errorStore.error.message}
          </Alert>
          <Routes />
        </div>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
