import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import "./App.css";
import { createPortal } from "react-dom";

// pure typescript debounce function

function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number = 5
): (...args: Parameters<T>) => void {
  let timeout: number;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      func(...args);
    };

    clearTimeout(timeout);
    timeout = window.setTimeout(later, wait);
  };
}

const BUTTON_MENU_SPACING = 4;

function Menu({
  buttonEl,
  ref,
}: {
  buttonEl: HTMLElement | null;
  ref: React.RefObject<HTMLDivElement | null>;
}) {
  // const menuRef = useRef<HTMLDivElement>(null);
  const [menuHeight, setMenuHeight] = useState(0);
  const [, setForceUpdate] = useState(0);

  // See https://beta.reactjs.org/reference/react/useLayoutEffect
  useLayoutEffect(() => {
    const { height } = ref.current!.getBoundingClientRect();
    setMenuHeight(height);
  }, []);

  function calculatePosition() {
    if (!buttonEl) {
      return { top: 0, left: 0 }; // Return default position if buttonEl is null
    }

    const windowHeight = window.innerHeight;
    const buttonElRect = buttonEl.getBoundingClientRect();
    const buttonAndMenu = buttonElRect.y + buttonEl.offsetHeight + menuHeight;

    const isWithinWindow = windowHeight > buttonAndMenu;

    const coord = {
      top: isWithinWindow
        ? buttonEl.offsetTop + buttonEl.offsetHeight + BUTTON_MENU_SPACING
        : buttonEl.offsetTop - menuHeight - BUTTON_MENU_SPACING,
      left: buttonEl.offsetLeft,
    };

    return coord;
  }

  useEffect(() => {
    function updateMenuPosition() {
      setForceUpdate((count) => count + 1);
    }

    // Debounce the listener for better
    // scroll performance.
    // Should also listen for window resize events.
    window.addEventListener("scroll", updateMenuPosition);
    window.addEventListener("resize", updateMenuPosition);

    return () => {
      window.removeEventListener("scroll", updateMenuPosition);
      window.addEventListener("resize", debounce(updateMenuPosition));
    };
  }, []);

  const menuCoord = calculatePosition();

  return createPortal(
    <div
      ref={ref}
      className="menu-list"
      role="menu"
      style={{
        top: 0,
        left: 0,
        transform: `translate(${menuCoord?.left}px, ${menuCoord?.top}px)`,
      }}
    >
      <div>New File</div>
      <div>Save</div>
      <div>Delete</div>
    </div>,
    document.body
  );
}

function DropdownMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  function clickOutsideListener(event) {
    // Clicked element is a descendant of
    // the menu or button.
    if (
      buttonRef.current?.contains(event.target) ||
      menuRef.current == null ||
      menuRef.current?.contains(event.target)
    ) {
      console.log("clicked inside ", event);
      console.log("buttonRef.current", buttonRef.current);
      console.log("menuRef.current", menuRef.current);

      return;
    }

    setIsOpen(false);
  }

  useEffect(() => {
    document.addEventListener("mousedown", clickOutsideListener);
    document.addEventListener("touchstart", clickOutsideListener);

    return () => {
      document.removeEventListener("mousedown", clickOutsideListener);
      document.removeEventListener("touchstart", clickOutsideListener);
    };
  }, []);

  return (
    <>
      <button
        ref={buttonRef}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        Actions
      </button>
      {isOpen ? <Menu ref={menuRef} buttonEl={buttonRef.current} /> : null}
    </>
  );
}

function App() {
  return (
    <>
      <div>
        <DropdownMenu />
      </div>
    </>
  );
}

export default App;
