# Stook

A react store with hooks!

## Install
```sh
npm install @keegpt/stook --save
```

## Usage
```js
import React from 'react';
import { Provider, useCombinedReducers, createStore } from 'react-stook';

// App.js

import Content from './components/Content';

function App() {

    const elementReducer = (state, action) => {
        switch (action.type) {
            case 'ADD_ONE':
                // action.payload is available here
                return {
                    count: state.count + 1,
                    list: [...state.list, { name: `Element: ${state.count + 1}`}]
                };
            default:
                return state;
            }
    };

    const reducers = useCombinedReducers({
        elements: React.useReducer(elementReducer, { count: 0, list: [] })
        // another: React.useReducer(anotherReducer, initialState)
    });

    return (
        <>
            <Provider store={createStore(reducers)}>
                <Content />
            </Provider>
        </>
    );
}

// Content.js

import React from 'react';
import { connect } from 'react-stook';

function Content({ elements, addElement }) {

    React.useEffect(() => {
        addElement({ random: 1 });
    }, []);

    return (
        <>
            <span>Counter of elements: {elements.count}</span>
        </>
    );
}

function mapStateToProps(state) {
    return {
        elements: state.elements
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addElement: (payload) => dispatch({ type: 'ADD_ONE', payload })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Content);
```