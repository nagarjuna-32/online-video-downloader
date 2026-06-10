# DownloadMedia Frontend

A modern React TypeScript frontend for downloading videos from public sources.

## Tech Stack
- React 18
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Zustand (State Management)
- Axios (HTTP Client)

## Development

### Install Dependencies
```bash
npm install
```

### Start Development Server
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## Project Structure

```
src/
├── components/       # React components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── URLInput.tsx
│   ├── MetadataPreview.tsx
│   ├── Features.tsx
│   ├── FAQ.tsx
│   ├── PlatformBadges.tsx
│   └── PrivacyNotice.tsx
│
├── pages/           # Page components
│   ├── Home.tsx
│   └── AdminDashboard.tsx
│
├── hooks/           # Custom hooks
│   └── useGoogleAnalytics.ts
│
├── stores/          # Zustand state stores
│   └── appStore.ts
│
├── utils/           # Utility functions
│   ├── api.ts
│   ├── constants.ts
│   └── helpers.ts
│
├── types/           # TypeScript type definitions
│   └── index.ts
│
├── App.tsx          # Main app component
├── main.tsx         # App entry point
└── index.css        # Global styles
```

## Configuration

### Environment Variables
Create a `.env` file (or use Vercel env panel):

```
VITE_API_URL=http://localhost:8000/api
```

### Tailwind CSS
Configured in `tailwind.config.ts` with:
- Light/Dark mode support
- Custom color palette (Primary, Secondary, Accent, etc.)
- Extended utilities

## Features Implemented

- [x] Modern, responsive UI
- [x] Dark mode support
- [x] Animated components (Framer Motion)
- [x] URL input and validation
- [x] Metadata preview cards
- [x] Download format selection
- [x] Download history
- [x] Platform badges
- [x] FAQ section
- [x] Privacy notice
- [x] Admin dashboard
- [x] Mobile optimization

## Performance

- Code splitting with Vite
- Lazy loading components
- Image optimization
- Smooth animations
- Mobile-first design

## Deployment

### Vercel
1. Connect GitHub repository
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push

```bash
# Deploy manually
vercel
```

### Docker
```bash
docker build -t downloadmedia-frontend .
docker run -p 3000:3000 downloadmedia-frontend
```

## Browser Support
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers

## Troubleshooting

### CORS Issues
Ensure backend API URL is correct and backend CORS is configured properly.

### Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Port Already in Use
```bash
# Change port in vite.config.ts or use:
npm run dev -- --port 3001
```

## Contributing
Follow these guidelines:
1. Use TypeScript for type safety
2. Follow existing code style
3. Keep components small and focused
4. Add comments for complex logic
5. Test responsive design

## License
Educational and personal use only.

---

Made with ❤️ by DownloadMedia Team
