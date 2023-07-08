import React from 'react';
import { Provider} from 'react-redux';
import store from '../src/utils/store';
import Home from './Components/Home';
import "./tailwind.output.css";

function App() {
  return (
    <Provider store={store}>
       <Home/>
    </Provider>
  );
}
export default App;