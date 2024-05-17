import "./App.css";
import FilterPanel from "./components/FilterPanel";
import InfiniteScroll from "./components/InfiniteScroll";

function App() {
  return (
    <>
      <div className="heading">
        <h1>React-redux filter component</h1>
      </div>
      <FilterPanel />
      <InfiniteScroll />
    </>
  );
}

export default App;
