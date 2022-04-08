import "./App.css";
import React from "react";
import { Observer, useLocalObservable } from "mobx-react";

const StoreContext = React.createContext();

const StoreProvider = ({ children }) => {
  const store = useLocalObservable(() => ({
    bugs: ["centiped"],
    addBug: (bug) => {
      store.bugs.push(bug);
    },
    get bugsCount() {
      return store.bugs.length;
    },
  }));

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

const BugHeader = () => {
  const store = React.useContext(StoreContext);
  return <Observer>{() => <h1>Bug Count {store.bugsCount}</h1>}</Observer>;
};

const BugList = () => {
  const store = React.useContext(StoreContext);
  return (
    <Observer>
      {() => (
        <ul>
          {store.bugs.map((bug) => (
            <li key={bug}>{bug}</li>
          ))}
        </ul>
      )}
    </Observer>
  );
};

const BugsForm = () => {
  const store = React.useContext(StoreContext);
  const [bug, setBug] = React.useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        store.addBug(bug);
        setBug("");
      }}
    >
      <input
        type="text"
        value={bug}
        onChange={(e) => setBug(e.target.value)}
      ></input>
      <button type="submit">Add</button>
    </form>
  );
};

function App() {
  return (
    <StoreProvider>
      <div className="App">
        <h1>Bugs</h1>
        <BugHeader />
        <BugList />
        <BugsForm />
      </div>
    </StoreProvider>
  );
}

export default App;
