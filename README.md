# ChipIQ Website (Production)

This folder contains only the essential runtime files needed to run the ChipIQ website.

## Structure

```
chip-iq-dot-com/
├── index.html           # Main website page
├── assets/
│   ├── css/
│   │   └── main.css     # Styles
│   ├── js/
│   │   └── main.js      # JavaScript functionality
│   ├── favicon/         # Favicon files
│   └── images/
│       └── logo/        # Logo files
└── README.md
```

## Running Locally

**Option 1: Direct file access**
Simply open `index.html` in your browser, or point your browser to:
```
file:///path/to/chip-iq-dot-com/index.html
```

**Option 2: Local server (recommended to see server logs)**
```bash
# Python
python -m http.server 8000

# Node.js
npx http-server

# PHP
php -S localhost:8000
```

Then point your browser to: `http://localhost:8000`

## Deployment

This is a static website. Simply upload all files to your web hosting service or use platforms like:
- GitHub Pages
- Netlify
- Vercel
- AWS S3 + CloudFront
- Any static hosting provider
