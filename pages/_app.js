import { Provider } from 'react-redux';
import '../styles/globals.css';
import store from '../redux/store';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <div className="App">
        <Component {...pageProps} />
      </div>
    </Provider>
  );
}

export default MyApp
