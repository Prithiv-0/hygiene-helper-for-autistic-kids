# Hygiene Navigator - Personal Hygiene Learning App for Autistic Children

A React + MongoDB educational web application designed to help autistic children learn and master personal hygiene routines through visual schedules and sensory-friendly design.

## Project Structure

```
autistic kids/
├── server/               # Node.js backend
│   ├── models/          # MongoDB schemas
│   ├── server.js        # API routes and database connection
│   └── package.json
└── client/              # React frontend
    ├── src/
    │   ├── components/
    │   │   ├── forms/   # 5 data collection forms
    │   │   ├── FirstThenTimeline.jsx
    │   │   ├── VisualTimer.jsx
    │   │   ├── CelebrationScreen.jsx
    │   │   └── HomeScreen.jsx
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── style.css    # High-contrast sensory-friendly styles
    ├── index.html
    ├── vite.config.js
    └── package.json
```

## Features

### Core Design Principles
- **First/Then Visual Schedule**: Shows only current and next step to prevent cognitive overload
- **High-Contrast Light Mode**: White background with thick black borders and primary blue/yellow accents
- **Slide-Over Transitions**: Predictable, non-jarring animations
- **Hybrid Progression**: Manual button clicks for preparation tasks, automatic timers for active tasks
- **Simple SVG Animations**: Lightweight motion guides without sensory overload

### 5 MongoDB-Integrated Forms

1. **Caregiver Registration**: Account creation for parents/therapists
2. **Child Profile & Sensory Settings**: Customizable sensory preferences (sound, timer style, high contrast)
3. **Routine Builder**: Create custom step-by-step hygiene sequences
4. **Session Feedback**: Post-routine logging with mood rating and notes
5. **Reward Configuration**: Star-based reward system setup

### Components

- **FirstThenTimeline**: Core activity interface showing current and next steps
- **VisualTimer**: Bubble or bar-style countdown timers (no numbers, visual depletion)
- **CelebrationScreen**: Success animation with stars and checkmark
- **HomeScreen**: Routine selection interface

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account OR local MongoDB installation

### 1. MongoDB Setup

**Option A: MongoDB Atlas (Recommended)**
1. Create free account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Get your connection string
4. Update in `server/server.js` line 6:
   ```javascript
   const MONGO_URI = 'your-mongodb-atlas-connection-string-here';
   ```

**Option B: Local MongoDB**
- Keep the default connection string:
  ```javascript
  const MONGO_URI = 'mongodb://localhost:27017';
  ```

### 2. Install Dependencies

**Server:**
```bash
cd server
npm install mongodb
```

**Client:**
```bash
cd client
npm install react react-dom vite @vitejs/plugin-react
```

### 3. Run the Application

**Terminal 1 - Start Backend:**
```bash
cd server
npm start
```
Server will run on http://localhost:5000

**Terminal 2 - Start Frontend:**
```bash
cd client
npm run dev
```
Frontend will run on http://localhost:5173

### 4. First Time Setup Flow

1. **Register Caregiver**: Create parent/therapist account
2. **Create Child Profile**: Set name and sensory preferences
3. **Build Routine**: Create your first hygiene routine (e.g., "Handwashing")
4. **Configure Rewards**: Set up star-based reward system
5. **Start Activity**: Select routine and begin!

## Usage Flow

### Creating a Routine

1. Navigate to "Add New Routine"
2. Enter routine name (e.g., "Morning Handwashing")
3. Add steps:
   - **Manual steps**: Tasks requiring user confirmation (e.g., "Turn on water")
   - **Timed steps**: Tasks with automatic countdown (e.g., "Scrub hands - 20s")
4. Save routine

### Running an Activity

1. Child selects routine from home screen
2. **First** card shows current task with large icon
3. **Then** card shows next task (smaller, to the right)
4. Progress bar at top shows overall completion
5. Manual tasks require "Done" button click
6. Timed tasks play visual countdown automatically
7. Celebration screen appears on completion
8. Parent provides session feedback

## Technology Stack

- **Frontend**: React 18, Vite
- **Backend**: Node.js (HTTP server, no Express)
- **Database**: MongoDB
- **Styling**: Pure CSS (High-Contrast Light Mode)
- **Animations**: CSS animations and SVG

## Database Collections

- `caregivers`: Parent/therapist accounts
- `childProfiles`: Child-specific settings and sensory preferences
- `routines`: Custom hygiene sequences
- `sessionLogs`: Historical activity data
- `rewardSystems`: Star tracking and reward configuration

## API Endpoints

### Caregivers
- `POST /api/caregivers` - Create caregiver account
- `GET /api/caregivers` - Get all caregivers

### Children
- `POST /api/children` - Create child profile
- `GET /api/children` - Get all children
- `GET /api/children/:id` - Get specific child

### Routines
- `POST /api/routines` - Create new routine
- `GET /api/routines` - Get all routines
- `GET /api/routines/child/:childId` - Get routines for specific child

### Sessions
- `POST /api/sessions` - Log completed session
- `GET /api/sessions/child/:childId` - Get session history

### Rewards
- `POST /api/rewards` - Create/update reward system
- `GET /api/rewards/child/:childId` - Get reward system for child
- `PUT /api/rewards/child/:childId` - Update star count

## Accessibility Features

- **Touch Targets**: Minimum 52px height for all interactive elements
- **High Contrast**: 4:1 contrast ratio or higher
- **Predictable Layouts**: Consistent positioning across screens
- **Clear Visual Hierarchy**: Large primary elements, smaller secondary
- **Sensory-Safe Motion**: No flashing, gentle transitions only
- **Customizable Settings**: Mute sound, choose timer style

## Future Enhancements

- Offline PWA support with Local Storage sync
- Photo-based step instructions
- Voice guidance toggle
- Multi-language support
- Analytics dashboard for caregivers
- Export progress reports

## Troubleshooting

**Backend won't start:**
- Check MongoDB connection string
- Ensure MongoDB is running (if local)
- Check port 5000 is available

**Frontend shows "Cannot connect":**
- Ensure backend is running on port 5000
- Check vite.config.js proxy settings
- Clear browser cache

**Styles look wrong:**
- Check that style.css is imported in main.jsx
- Refresh browser with Ctrl+Shift+R

## License

Educational Project - Full Stack Frameworks Course

## Contact

For questions or support regarding this educational project, please contact your course instructor.
