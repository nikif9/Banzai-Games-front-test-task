import React from 'react';
import { Provider } from 'react-redux';
import Main from './components/Main';
import store from './redux/store';

const App = () => {
    
    return (
        <Provider store={store}>
            <div className="App">
                <Main />
            </div>
        </Provider>
    );
};

export default App;
