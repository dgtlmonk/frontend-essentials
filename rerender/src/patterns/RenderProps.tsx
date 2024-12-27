import { useState } from "react";

// render props
export default function RenderProps({
  children,
}: {
  children: (value: number) => React.ReactNode;
}) {
  const [value, setValue] = useState(0);

  return (
    <>
      <input
        type="number"
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        placeholder="Temp in °C"
      />
      {children(value)}
    </>
  );
}
