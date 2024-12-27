import React from "react";

interface ToggleProps {
  children: React.ReactNode;
}

export class Compound extends React.Component<ToggleProps> {
  static Button = ({ children }: { children: React.ReactNode }) => {
    return <button>{children}</button>;
  };

  render() {
    return this.props.children;
  }
}
