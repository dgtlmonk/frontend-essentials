# Dynamic Image Format Comparison with Vite

This project demonstrates the usage of different image formats (JPEG, PNG, WebP, and AVIF) using Vite's image optimization capabilities through the vite-imagetools plugin. It serves as a practical comparison of file sizes and quality across common web image formats.

![image](https://github.com/user-attachments/assets/7e1df82f-8e27-407c-a9f6-9f76adc1c3c3)

## Image Formats Overview

### JPEG

- **Best for**: Photographs and complex images with many colors
- **Compression**: Lossy
- **Browser Support**: Universal
- **Typical Use Case**: Photography, large background images
- **Pros**: Small file size for photographs
- **Cons**: Loses quality with high compression, no transparency

### PNG

- **Best for**: Images requiring transparency or precise reproduction
- **Compression**: Lossless
- **Browser Support**: Universal
- **Typical Use Case**: Logos, icons, images with text
- **Pros**: Lossless quality, supports transparency
- **Cons**: Larger file size compared to modern formats

### WebP

- **Best for**: Web graphics combining transparency and compression
- **Compression**: Both lossy and lossless
- **Browser Support**:
  - Chrome (version 17+)
  - Firefox (version 65+)
  - Edge (version 18+)
  - Safari (version 14+)
- **Typical Use Case**: General web images, replacement for both JPEG and PNG
- **Pros**: Smaller file size than JPEG/PNG while maintaining quality
- **Cons**: Limited support in older browsers

### AVIF

- **Best for**: Modern web applications prioritizing performance
- **Compression**: Both lossy and lossless
- **Browser Support**:
  - Chrome (version 85+)
  - Firefox (version 93+)
  - Edge (version 95+)
  - Safari (version 16.4+)
- **Typical Use Case**: Next-gen image format for web content
- **Pros**: Superior compression, maintains high quality
- **Cons**: Limited browser support, slower encoding

## Project Setup

This project uses Vite with the vite-imagetools plugin to dynamically generate different image formats. The plugin automatically handles image transformations based on URL parameters.

### Key Features

- Dynamic image format conversion
- Automatic image optimization
- Width and height transformations
- Multiple format support

### Usage Example

```typescript
import image from "./image.jpg?w=250&h=250&format=webp";
```

Query Parameters:

- `w`: Width in pixels
- `h`: Height in pixels
- `format`: Output format (webp, avif, png, jpeg)

## Best Practices

1. **Progressive Enhancement**

   - Use JPEG/PNG as fallback formats
   - Serve WebP/AVIF to modern browsers
   - Implement picture element for multiple sources

2. **Performance Optimization**

   - Choose appropriate format based on content type
   - Use responsive images for different viewport sizes
   - Consider lazy loading for below-the-fold images

3. **Format Selection Guide**
   - Photographs → JPEG/WebP
   - Icons/Logos → PNG/WebP
   - Modern sites → AVIF with WebP fallback
   - Legacy support → Include JPEG/PNG fallback

## Development

1. Install dependencies:

```bash
bun install
```

2. Run development server:

```bash
bun run dev
```

3. Build for production:

```bash
bun run build
```

## References

- [Vite Image Tools Documentation](https://github.com/JonasKruckenberg/imagetools)
- [MDN Web Docs - Image File Type Comparison](https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types)
- [Can I Use - WebP Support](https://caniuse.com/webp)
- [Can I Use - AVIF Support](https://caniuse.com/avif)
