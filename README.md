 QR Code Generator

A beautiful, customizable QR code generator built with React. Create stylish QR codes with custom colors and logo overlays in just a few clicks.

 Features 

- Color Customization - Choose any color for your QR code
- Logo Integration - Add your logo/image in the center
- Multiple Formats - Download as PNG, JPG, or SVG
- Instant Generation - Real-time QR code preview
- Modern UI - Sleek, user-friendly interface


 Live Demo 

[Try it out here!]((https://qr-code-generator-chi-vert.vercel.app/)) 

 Installation 

1. Clone the repository:
   
   git clone https://github.com/Temiloluwa1616/qr-code-generator.git
   
2. Navigate to project directory:
   
   cd qr-code-generator
   
3. Install dependencies:
 
   npm install
    or
   yarn install
  
4. Run development server:
   npm run dev
    or
   yarn dev
   

Usage

1. Enter your URL in the input field
2. Customize the QR code color using the color picker
3. (Optional) Upload a logo/image
4. Click "Generate QR Code"
5. Download in your preferred format (PNG/JPG/SVG)



Tech Stack

- Frontend: React, Vite
- Styling: Tailwind CSS
- QR Generation: qrcode.react
- Icons: Lucide React
- Build Tool: npm/yarn



Customization Options

All configuration options are available in `src/config.js`:
export default {
  defaultColor: '#054080', // Default QR code color
  supportedFormats: ['png', 'jpg', 'svg'], // Download formats
  maxLogoSize: 1024 * 1024, // 1MB max logo size
  qrSize: 256 // Default QR code size in pixels
}


 Contributing 

Contributions are welcome! Please follow these steps:
1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
