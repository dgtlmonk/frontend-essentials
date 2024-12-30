/// <reference types="vite/client" />

// Declare module for basic image imports
declare module "*.jpg" {
  const src: string;
  export default src;
}

declare module "*.jpeg" {
  const src: string;
  export default src;
}

declare module "*.png" {
  const src: string;
  export default src;
}

declare module "*.webp" {
  const src: string;
  export default src;
}

declare module "*.avif" {
  const src: string;
  export default src;
}

// Vite-specific image imports with query parameters
declare module "*?url&w=*&h=*&format=*" {
  const src: string;
  export default src;
}
