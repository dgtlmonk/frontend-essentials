import React, { useState } from "react";
// date-fns
import "./App.css";
import RenderProps from "./patterns/RenderProps";
import { Compound } from "./patterns/Compound";

const Container = ({ children }: { children: React.ReactNode }) => {
  const [count, setCount] = useState(0);

  return (
    <div>
      Container Counter:
      <button onClick={() => setCount((count) => count + 1)}>
        count is: {count}
      </button>
      <div>{children}</div>
    </div>
  );
};

const Component = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      Component Counter:
      <button onClick={() => setCount((count) => count + 1)}>
        count is: {count}
      </button>
    </div>
  );
};

function Kelvin({ value }: { value: number }) {
  return <div className="temp">{(value || 0) + 273.15}K</div>;
}

function Fahrenheit({ value }: { value: number }) {
  return <div className="temp">{((value || 0) * 9) / 5 + 32}°F</div>;
}

const FancyCounter = () => {
  const [isFancy, setIsFancy] = useState(false);

  // Try toggling the 'Use fancy styling' checkbox
  // notice the state of the counter doesn't change

  // Takeaway
  // without the 'key' props, the counter state stays the same because
  // of the same structure and
  // the same Counter component instance stays at the same location (1st item) in the render tree,

  if (isFancy) {
    return (
      // <div key="fancy">>
      <div>
        <Counter isFancy={true} />
        <label>
          <input
            type="checkbox"
            checked={isFancy}
            onChange={(e) => {
              setIsFancy(e.target.checked);
            }}
          />
          Use fancy styling
        </label>
      </div>
    );
  }

  return (
    <div>
      <Counter isFancy={false} />
      <label>
        <input
          type="checkbox"
          checked={isFancy}
          onChange={(e) => {
            setIsFancy(e.target.checked);
          }}
        />
        Use fancy styling
      </label>
    </div>
  );
};

function Counter({ isFancy }: { isFancy: boolean }) {
  const [score, setScore] = useState(0);
  const [hover, setHover] = useState(false);

  let className = "counter";
  if (hover) {
    className += " hover";
  }
  if (isFancy) {
    className += " fancy";
  }

  return (
    <div
      className={className}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <h1>{score}</h1>
      <button onClick={() => setScore(score + 1)}>Add one</button>
    </div>
  );
}

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button onClick={() => setCount((count) => count + 1)}>
        parent counter : {count}
      </button>

      <FancyCounter />

      <Container>
        <Component />
      </Container>

      <RenderProps>
        {(value: number) => (
          <>
            <Kelvin value={value} />
            <Fahrenheit value={value} />
          </>
        )}
      </RenderProps>

      <Compound>
        <Compound.Button>I'm a compound button</Compound.Button>
      </Compound>
    </div>
  );
}

export default App;
