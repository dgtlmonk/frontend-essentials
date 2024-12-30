// @ts-ignore
import webp_nerd from "./assets/sample.jpg?w=250&h=250&format=webp";

// @ts-ignore
import avif_nerd from "./assets/sample.jpg?w=250&h=250&format=avif";

// @ts-ignore
import jpeg_nerd from "./assets/sample.jpg?w=250&h=250&format=jpeg";

// @ts-ignore
import png_nerd from "./assets/sample.jpg?w=250&h=250&format=png";

import "./App.css";

function App() {
  return (
    <div style={{ display: "flex", gap: "1rem" }}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        WebP
        <img src={webp_nerd} alt="nerd" />
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        AVIF
        <img src={avif_nerd} alt="nerd" />
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        JPEG
        <img src={jpeg_nerd} alt="nerd" />
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        PNG
        <img src={png_nerd} alt="nerd" />
      </div>
    </div>
  );
}

export default App;
