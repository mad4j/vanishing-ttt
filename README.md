# Vanishing Tic-Tac-Toe PWA

A Progressive Web App implementation of Vanishing Tic-Tac-Toe, based on the [rustedbytes-tris](https://github.com/mad4j/rustedbytes-tris) repository.

![Game Screenshot](https://github.com/user-attachments/assets/6cbc94d8-694c-4191-b2fb-171162e3b67b)

## About the Game

Vanishing Tic-Tac-Toe is a twist on the classic game with an added challenge: **each player can only have three symbols on the board at any time**. 

### Game Rules

- Play on a standard 3×3 grid
- Players alternate placing X (blue) and O (red) symbols
- Once a player has placed their third symbol, every new move causes their **oldest symbol to vanish**
- First player to get 3 in a row (horizontal, vertical, or diagonal) wins
- Play against an intelligent AI opponent

### AI Strategy

The AI uses a three-step decision-making process:
1. **Win if possible** - Check for a winning move
2. **Block opponent** - Prevent player from winning
3. **Random move** - Choose a random available cell

This makes the AI challenging but beatable, ensuring engaging gameplay.

## Features

✅ **Progressive Web App** - Install and play offline  
✅ **Responsive Design** - Works perfectly on desktop and mobile  
✅ **Smooth Animations** - Visual feedback for moves and vanishing pieces  
✅ **AI Opponent** - Smart computer player with strategic moves  
✅ **Touch-Friendly** - Optimized for mobile devices  
✅ **No Dependencies** - Pure HTML, CSS, and JavaScript  

## Screenshots

### Desktop View
![Desktop Gameplay](https://github.com/user-attachments/assets/6cbc94d8-694c-4191-b2fb-171162e3b67b)

### Win State
![Win State](https://github.com/user-attachments/assets/98f1033f-bc24-4342-a433-102c16f5685b)

### Mobile View
![Mobile View](https://github.com/user-attachments/assets/f2dcef30-a7ba-48f7-aa6e-b7e11e6d5188)

## How to Play

1. **Click on a cell** to place your X
2. The AI (Player O) will automatically make its move
3. Continue playing until someone wins
4. Click **New Game** to reset the board
5. Install the app for offline play using the browser's install prompt

## Installation & Deployment

### Local Development

1. Clone the repository:
```bash
git clone https://github.com/mad4j/vanishing-ttt.git
cd vanishing-ttt
```

2. Serve the files using any HTTP server:

**Python:**
```bash
python3 -m http.server 8000
```

**Node.js (with http-server):**
```bash
npx http-server -p 8000
```

**PHP:**
```bash
php -S localhost:8000
```

3. Open your browser and navigate to `http://localhost:8000`

### Deployment Options

#### GitHub Pages

1. Go to your repository settings
2. Navigate to "Pages" section
3. Select the branch (e.g., `main`) as the source
4. Your site will be published at `https://yourusername.github.io/vanishing-ttt`

#### Netlify

1. Connect your GitHub repository to Netlify
2. No build command needed
3. Set publish directory to `/` (root)
4. Deploy!

#### Vercel

1. Import your GitHub repository
2. No build settings required
3. Deploy!

#### Any Static Host

Simply upload all files to your web host. The app requires no server-side processing.

## PWA Installation

When you visit the site on a supported browser, you'll see an install prompt. Click "Install" to:

- Add the app to your home screen
- Use it offline
- Enjoy a native app-like experience

### Supported Browsers

- ✅ Chrome/Edge (Desktop & Mobile)
- ✅ Safari (iOS 11.3+)
- ✅ Firefox (Desktop & Mobile)
- ✅ Opera
- ✅ Samsung Internet

## File Structure

```
vanishing-ttt/
├── index.html          # Main HTML file
├── styles.css          # Styling and animations
├── game.js            # Core game logic and AI
├── app.js             # UI interactions and PWA setup
├── service-worker.js  # Service worker for offline support
├── manifest.json      # Web app manifest
└── icons/            # PWA icons
    ├── icon-192x192.png
    └── icon-512x512.png
```

## Technology Stack

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with animations and responsive design
- **Vanilla JavaScript** - No frameworks, pure ES6+
- **Service Worker** - Offline functionality
- **Web App Manifest** - PWA configuration

## Browser Compatibility

The game works on all modern browsers that support:
- ES6 JavaScript
- CSS Grid
- Service Workers (for PWA features)

## Credits

- Original Rust implementation: [rustedbytes-tris](https://github.com/mad4j/rustedbytes-tris)
- PWA implementation: This repository
- Game concept: Vanishing Tic-Tac-Toe variant

## License

This project is licensed under the GNU General Public License v3.0 - see the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests

## Author

Created as a PWA implementation of the original Rust-based game.

---

**Enjoy playing Vanishing Tic-Tac-Toe! 🎮**
