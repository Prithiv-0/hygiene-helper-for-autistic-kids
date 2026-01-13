# Hygiene Helper - Hygiene Routine App for Autistic Children

A React web application designed to help autistic children learn and practice personal hygiene routines through visual schedules, timers, and positive reinforcement.

## Quick Start

```bash
# Install dependencies
cd client
npm install

# Run the app
npm run dev
```

App runs on **http://localhost:5173**

## Features

- **12 Built-in Routines**: Handwashing, brushing teeth, showering, and more
- **Visual Progress Tracking**: See completion rates and earned points
- **Timed Steps**: Automatic countdowns for focused practice (20-30 seconds)
- **Achievement System**: 8 unlockable badges based on progress
- **Dark Mode**: Comfortable viewing in any light condition
- **Dashboard & Analytics**: Track daily progress and streaks
- **Sound & Motion Toggle**: Customize sensory experience
- **LocalStorage Persistence**: All data saved locally on device


## Project Structure

```
client/
├── src/
│   ├── pages/
│   │   ├── HomePage.jsx          # Routine selection
│   │   ├── ActivityPage.jsx       # Step-by-step execution with timer
│   │   ├── DashboardPage.jsx      # Stats and progress
│   │   ├── RewardsPage.jsx        # Achievement badges
│   │   ├── ProgressPage.jsx       # Completed routines
│   │   └── SettingsPage.jsx       # Sound, motion, dark mode
│   ├── components/
│   │   └── Navigation.jsx         # Bottom navigation bar
│   ├── App.jsx                    # State management
│   ├── style.css                  # All styling (light & dark mode)
│   └── main.jsx
├── index.html
├── vite.config.js
└── package.json
```

## The 12 Routines

1. Wash Your Hands
2. Brush Your Teeth
3. Wash Your Face
4. Comb Your Hair
5. Take a Shower
6. Floss Your Teeth
7. Trim Your Nails
8. Change Your Clothes
9. Eat Your Breakfast
10. Eat Your Lunch
11. Get Ready for Bed
12. Play Outdoor Games (Homework)

## How It Works

1. **Select a Routine** - Pick from the home page
2. **Follow Steps** - See one step at a time with emoji guides
3. **Timer Runs** - Automatic 20-30 second countdowns for timed steps
4. **Skip Option** - Jump to next step anytime (button appears during timer)
5. **Earn Points** - Get 1 star per completed routine
6. **Unlock Badges** - Earn achievements at star milestones

## Settings

- **Sound Effects**: Toggle audio feedback
- **Motion Effects**: Toggle animations and transitions
- **Dark Mode**: Switch between light and dark themes
