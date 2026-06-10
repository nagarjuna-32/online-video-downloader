# Contributing to DownloadMedia

We welcome contributions! This document provides guidelines for contributing to the project.

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Help others learn and grow
- Report issues responsibly

## How to Contribute

### 1. Fork the Repository

```bash
git clone https://github.com/yourusername/downloadmedia.git
cd downloadmedia
```

### 2. Create a Feature Branch

```bash
git checkout -b feature/your-feature-name
```

### 3. Make Your Changes

Follow the project's coding standards:

#### Frontend (React/TypeScript)

```typescript
// Use TypeScript for type safety
interface Props {
  title: string
  onClose: () => void
}

// Use functional components with hooks
const MyComponent: React.FC<Props> = ({ title, onClose }) => {
  const [state, setState] = useState('')
  
  return (
    <div>
      <h1>{title}</h1>
      <button onClick={onClose}>Close</button>
    </div>
  )
}

export default MyComponent
```

#### Backend (Python/FastAPI)

```python
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter()

class ItemSchema(BaseModel):
    name: str
    description: str

@router.post("/items/")
async def create_item(item: ItemSchema):
    """Create a new item"""
    try:
        # Your logic here
        return {"status": "success"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
```

### 4. Write Tests

#### Frontend Tests

```typescript
import { render, screen } from '@testing-library/react'
import MyComponent from './MyComponent'

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent title="Test" onClose={() => {}} />)
    expect(screen.getByText('Test')).toBeInTheDocument()
  })
})
```

#### Backend Tests

```python
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_analyze():
    response = client.post("/analyze", json={"url": "https://example.com"})
    assert response.status_code == 200
```

### 5. Commit Your Changes

```bash
git add .
git commit -m "feat: add new feature

- Description of changes
- Additional details"
```

### 6. Push and Create Pull Request

```bash
git push origin feature/your-feature-name
```

Then create a PR on GitHub with:

- Clear title and description
- Reference to any related issues
- Screenshots for UI changes
- Test results

## Coding Standards

### Frontend

- Use TypeScript strict mode
- Follow React best practices
- Use functional components with hooks
- Keep components small and focused
- Write descriptive variable/function names
- Add JSDoc comments for complex functions
- Use Tailwind CSS for styling
- Ensure mobile responsiveness

### Backend

- Follow PEP 8 style guide
- Use type hints
- Write docstrings
- Keep functions focused
- Use async/await for I/O operations
- Add error handling
- Include logging

## Git Commit Messages

Format: `<type>: <subject>`

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Code style changes
- `refactor`: Code refactoring
- `perf`: Performance improvement
- `test`: Tests
- `chore`: Build, CI, dependencies

Example:
```
feat: add download history pagination

- Implement pagination for download history
- Add limit/offset query parameters
- Update API response schema
```

## Pull Request Process

1. **Title**: Clear, descriptive title
2. **Description**: What and why, not just how
3. **Testing**: Describe how you tested
4. **Screenshots**: For UI changes
5. **Checklist**:
   - [ ] Code follows style guide
   - [ ] No console errors
   - [ ] Tests pass
   - [ ] Updated documentation
   - [ ] No breaking changes

## Feature Request

### Suggest a Feature

1. Check if it's already proposed
2. Create GitHub Issue
3. Describe the use case
4. Provide examples
5. Add screenshots/mockups

## Bug Report

### Report a Bug

1. Check if it's already reported
2. Create GitHub Issue with title "Bug: [description]"
3. Include:
   - Steps to reproduce
   - Expected behavior
   - Actual behavior
   - Screenshots
   - Browser/OS info
   - Error logs

## Development Setup

### Clone and Setup

```bash
git clone https://github.com/yourusername/downloadmedia.git
cd downloadmedia

# Frontend
cd frontend
npm install
npm run dev

# Backend (in another terminal)
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python main.py
```

## Testing

### Run Frontend Tests

```bash
cd frontend
npm test
```

### Run Backend Tests

```bash
cd backend
pytest
```

### Coverage Report

```bash
pytest --cov=.
```

## Documentation

- Update README.md for significant changes
- Add comments to complex code
- Update DEVELOPMENT.md for new tools/processes
- Include examples for new features

## Areas to Contribute

### High Priority

- [ ] Performance optimizations
- [ ] Mobile UI improvements
- [ ] Error handling improvements
- [ ] Test coverage
- [ ] Documentation
- [ ] Bug fixes

### Medium Priority

- [ ] New platform support
- [ ] Download options
- [ ] UI enhancements
- [ ] Analytics features

### Low Priority

- [ ] Theme improvements
- [ ] Animation tweaks
- [ ] Code refactoring

## Resources

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [yt-dlp Documentation](https://github.com/yt-dlp/yt-dlp)

## Questions?

- Ask in GitHub Discussions
- Open an Issue for clarification
- Check existing documentation

## Recognition

- Contributors listed in README
- Commit history preserved
- Pull request attribution

Thank you for contributing! 🎉

---

Made with ❤️ by the DownloadMedia Community
