# Sky Simulator - 空をシミュレートする

An interactive sky simulation experience inspired by Tokyo's beautiful day-night cycle, combining Japanese and Korean design aesthetics.

## Features

✨ **Dynamic Sky Transitions** - Smooth gradient transitions from sunrise to sunset to night
🌅 **Tokyo Cityscape** - Iconic Tokyo Tower and Japanese temple silhouettes
🎚️ **Interactive Time Slider** - Control time from 00:00 to 24:00
📱 **Responsive Design** - Works seamlessly on desktop and mobile devices
🎨 **Beautiful UI** - Glass-morphism control panel with soft, calming colors
⭐ **Bilingual** - Japanese and Korean text throughout

## Technologies Used

- **React 18** - UI framework
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **SVG** - Custom graphics for sun, moon, clouds, and cityscape

## Installation & Setup

### Prerequisites
- Node.js 14+ 
- npm or yarn

### Steps

1. **Extract the project**
```bash
unzip sky-simulator-project.zip
cd sky-simulator-project
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

The application will open at `http://localhost:3000`

4. **Build for production**
```bash
npm run build
```

Output files will be in the `dist/` directory

## Project Structure

```
sky-simulator-project/
├── src/
│   ├── components/
│   │   ├── SkyBackground.jsx      # Dynamic sky with gradients and elements
│   │   ├── ControlPanel.jsx       # Time slider and preview cards
│   │   └── Header.jsx              # Title and instructions
│   ├── pages/
│   │   └── SkySimulatorPage.jsx   # Main page component
│   ├── styles/
│   │   └── globals.css             # Global styles and animations
│   ├── App.jsx                     # App wrapper
│   └── main.jsx                    # Entry point
├── index.html                      # HTML template
├── package.json                    # Dependencies
├── tailwind.config.js             # Tailwind configuration
├── vite.config.js                 # Vite configuration
└── README.md                       # This file
```

## Usage

1. **Drag the time slider** to change the time of day (00:00 - 24:00)
2. **Click preview cards** to jump to specific times:
   - 早朝 (Early Morning) - 05:00
   - 朝 (Morning) - 07:15
   - 昼 (Noon) - 12:00
   - 夕方 (Evening) - 17:45
   - 夜 (Night) - 20:30
   - 深夜 (Deep Night) - 23:15

3. **Watch the sky change** as you move through the day:
   - Night sky with stars and moon
   - Purple/orange dawn
   - Beautiful sunrise
   - Blue daytime
   - Golden sunset
   - Purple dusk

## Key Features Explained

### Dynamic Sky
- Time-based color gradients using CSS
- Smooth 1.2s transitions between phases
- Realistic sun and moon positioning

### Elements
- **Sun**: Appears 05:00-18:00, changes vertical position based on time
- **Moon**: Appears 20:00-05:00 in upper right
- **Clouds**: Continuously drift across the screen
- **Stars**: Twinkle in and out during night hours
- **Mountains & Temple**: Silhouettes with Tokyo Tower for iconic Tokyo feel

### Control Panel
- Glass-morphic design with backdrop blur
- Large time display (HH:MM format)
- Gradient-colored slider from red → orange → yellow → blue → purple
- 6 preview cards showing different times with emoji icons
- "Real Time" button (placeholder for system time integration)

## Customization

### Change Starting Time
Edit `src/pages/SkySimulatorPage.jsx`:
```javascript
const [time, setTime] = useState(13.75); // Change this number (0-24)
```

### Modify Colors
Edit `src/components/SkyBackground.jsx` - the `getGradient()` function contains all Tailwind gradient classes

### Add More Preview Times
Edit `src/components/ControlPanel.jsx` - expand the `previewCards` array

## Browser Compatibility

- Chrome/Chromium 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance

- Optimized CSS animations (GPU-accelerated)
- Efficient React rendering with useState
- No unnecessary re-renders
- Smooth 60fps animations

## License

MIT

## Credits

Inspired by the beautiful Tokyo skyline and Japanese aesthetics.
UI/UX design combining Japanese (日本語) and Korean (한국어) languages.

---

**Enjoy exploring the sky! 🌅**
