import { RefObject, useEffect, useRef, useState } from "react";
import "./App.css";
import { createPortal } from "react-dom";

function DropdownMenu({ buttonRef, menuRef }: 
  { buttonRef: HTMLElement | null, 
    menuRef: RefObject<HTMLDivElement>| null }) {
  const [, setForceUpdate] = useState(0);


  function calculateCoords() {
    {
      let top = 0,
        left = 0;

      if (!buttonRef) {
        return { top: 0, left: 0 };
      }

      const buttonRect = buttonRef.getBoundingClientRect();
      left = buttonRect.x;
      top = buttonRect.y + buttonRect.height;

      return {
        left,
        top,
      };
    }
  }

  const menuCoords = calculateCoords();

  useEffect(() => {
    function update() {
      setForceUpdate((prev) => prev + 1);
    }
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update);

    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update);
    };
  }, []);

  return createPortal(
    <div
      ref={menuRef}
      role="navigation"
      style={{
        position: "absolute",
        display: "flex",
        top: menuCoords.top,
        left: menuCoords.left,
      }}
    >
      <ul
        style={{
          backgroundColor: "white",
          color: "black",
          listStyle: "none",
          textAlign: "left",
          margin: 0,
          padding: ".5rem",
        }}
      >
        <li>Home</li>
        <li>Settings</li>
        <li>Help</li>
      </ul>
    </div>,
    document.body
  );
}

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef= useRef<HTMLDivElement>(null);

  function onClickOutside(e){

   if( menuRef.current?.contains(e.target) || buttonRef.current?.contains(e.target) ) {
      return
    }

    setIsOpen(false)
    
  }

  useEffect(() => {
    document.addEventListener("mousedown", onClickOutside)
    document.addEventListener("touchstart", onClickOutside)
    return () => {
      document.removeEventListener("mousedown", onClickOutside)
      document.removeEventListener("touchstart", onClickOutside)
      
    }
  }, [])

  return (
    <>
      <button ref={buttonRef} onClick={() => setIsOpen(!isOpen)}>
        Open Menu
      </button>
      {isOpen ? <DropdownMenu buttonRef={buttonRef.current} menuRef={menuRef} /> : null}
    </>
  );
}

export default App;
