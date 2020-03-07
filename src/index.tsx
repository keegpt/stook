import * as React from 'react';

interface IMyContext {
  state: any;
  dispatch: any;
}

const MyContext = React.createContext<IMyContext>({} as IMyContext);
const MyProvider = MyContext.Provider;

export const useCombinedReducers = (combinedReducers: [any, React.DispatchWithoutAction][], initialState: any) => {
  const state = Object.keys(combinedReducers).reduce(
    (acc, key: any) => ({ ...acc, [key]: combinedReducers[key][0] }),
    initialState || {},
  );

  const dispatch = (action: any) =>
    Object.keys(combinedReducers)
      .map((key: any) => combinedReducers[key][1])
      .forEach((fn: any) => fn(action));

  return [state, dispatch];
};

export const connect = (mapStateToProps?: (state: any) => object, mapDispatchToProps?: (dispatch: any) => object) => {
  return function(Component: any) {
    return function(props: any) {
      const { state, dispatch } = React.useContext<IMyContext>(MyContext);
      const stateToProps = mapStateToProps ? mapStateToProps(state) : {};
      const dispatchToProps = mapDispatchToProps ? mapDispatchToProps(dispatch) : {};
      const mergedProps = { ...props, ...stateToProps, ...dispatchToProps };
      return <Component {...mergedProps} />;
    };
  };
};

export const Provider = ({ store, children }: { store: any; children: any }) => {
  const [state, dispatch] = store;

  return <MyProvider value={{ state, dispatch }}>{children}</MyProvider>;
};

export const createStore = (reducers: any) => {
  return reducers;
};
