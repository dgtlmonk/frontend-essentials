import { Suspense } from "react";
import "./App.css";
import ErrorBoundary from "./ErrorBoundary";
import WithUseHook from "./WithUse";

function App() {
  return (
    <div className="App">
      <ErrorBoundary>
        <Suspense fallback={<div>Loading books data...</div>}>
          <WithUseHook />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default App;
