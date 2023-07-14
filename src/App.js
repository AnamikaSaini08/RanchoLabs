import React from 'react';
import { Provider} from 'react-redux';
import store from '../src/utils/store';
import Home from './Components/Home';
import "./tailwind.output.css";

function App() {
  return (
    <Provider store={store}>
    <div className='overflow-y-hidden h-screen w-screen absolute'>
    <Home/>
    </div>
    </Provider>
  );
}
export default App;