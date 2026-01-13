import { useState } from 'react';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import ActivityPage from './pages/ActivityPage';
import ProgressPage from './pages/ProgressPage';
import SettingsPage from './pages/SettingsPage';
import RewardsPage from './pages/RewardsPage';
import DashboardPage from './pages/DashboardPage';

const ROUTINES = [
  {
    id: 'handwash',
    name: 'Wash Your Hands',
    emoji: '🖐️',
    color: '#FF6B9D',
    character: '🧼',
    steps: [
      { id: 1, text: 'Turn on the water', emoji: '💧', duration: 0 },
      { id: 2, text: 'Wet your hands', emoji: '💦', duration: 0 },
      { id: 3, text: 'Put soap on hands', emoji: '🧼', duration: 0 },
      { id: 4, text: 'Scrub for 20 seconds', emoji: '🫧', duration: 20 },
      { id: 5, text: 'Rinse with water', emoji: '💧', duration: 0 },
      { id: 6, text: 'Dry with towel', emoji: '🧻', duration: 0 }
    ]
  },
  {
    id: 'brushteeth',
    name: 'Brush Your Teeth',
    emoji: '🦷',
    color: '#4ECDC4',
    character: '🪥',
    steps: [
      { id: 1, text: 'Get your toothbrush', emoji: '🪥', duration: 0 },
      { id: 2, text: 'Put toothpaste on brush', emoji: '🧴', duration: 0 },
      { id: 3, text: 'Brush top teeth', emoji: '🦷', duration: 15 },
      { id: 4, text: 'Brush bottom teeth', emoji: '🦷', duration: 15 },
      { id: 5, text: 'Rinse your mouth', emoji: '💧', duration: 0 },
      { id: 6, text: 'Rinse your brush', emoji: '🚰', duration: 0 }
    ]
  },
  {
    id: 'washface',
    name: 'Wash Your Face',
    emoji: '😊',
    color: '#FFE66D',
    character: '🧽',
    steps: [
      { id: 1, text: 'Wet your face', emoji: '💦', duration: 0 },
      { id: 2, text: 'Put soap on hands', emoji: '🧼', duration: 0 },
      { id: 3, text: 'Rub face gently', emoji: '✨', duration: 10 },
      { id: 4, text: 'Rinse with water', emoji: '💧', duration: 0 },
      { id: 5, text: 'Pat dry with towel', emoji: '🧻', duration: 0 }
    ]
  },
  {
    id: 'combhair',
    name: 'Comb Your Hair',
    emoji: '💇',
    color: '#A8E6CF',
    character: '🪮',
    steps: [
      { id: 1, text: 'Get your comb', emoji: '🪮', duration: 0 },
      { id: 2, text: 'Start at the top', emoji: '⬆️', duration: 0 },
      { id: 3, text: 'Comb down slowly', emoji: '⬇️', duration: 10 },
      { id: 4, text: 'Do the sides too', emoji: '↔️', duration: 10 },
      { id: 5, text: 'Check in mirror', emoji: '🪞', duration: 0 }
    ]
  },
  {
    id: 'shower',
    name: 'Take a Shower',
    emoji: '🚿',
    color: '#6BCF7F',
    character: '💦',
    steps: [
      { id: 1, text: 'Get your towel ready', emoji: '🧼', duration: 0 },
      { id: 2, text: 'Turn on shower water', emoji: '💧', duration: 0 },
      { id: 3, text: 'Wet your entire body', emoji: '🌊', duration: 0 },
      { id: 4, text: 'Apply body soap', emoji: '🧼', duration: 0 },
      { id: 5, text: 'Scrub your body', emoji: '🫧', duration: 30 },
      { id: 6, text: 'Rinse off soap', emoji: '💦', duration: 0 },
      { id: 7, text: 'Wash your hair', emoji: '🧴', duration: 20 },
      { id: 8, text: 'Rinse your hair', emoji: '💧', duration: 0 }
    ]
  },
  {
    id: 'floss',
    name: 'Floss Your Teeth',
    emoji: '✨',
    color: '#FFB6C1',
    character: '🧵',
    steps: [
      { id: 1, text: 'Get dental floss', emoji: '🧵', duration: 0 },
      { id: 2, text: 'Cut about 18 inches', emoji: '✂️', duration: 0 },
      { id: 3, text: 'Floss upper teeth', emoji: '😁', duration: 15 },
      { id: 4, text: 'Floss lower teeth', emoji: '😁', duration: 15 },
      { id: 5, text: 'Rinse your mouth', emoji: '💧', duration: 0 }
    ]
  },
  {
    id: 'nails',
    name: 'Trim Your Nails',
    emoji: '💅',
    color: '#DDA0DD',
    character: '✂️',
    steps: [
      { id: 1, text: 'Get nail clippers', emoji: '✂️', duration: 0 },
      { id: 2, text: 'Look at nail length', emoji: '👀', duration: 0 },
      { id: 3, text: 'Trim nails carefully', emoji: '✂️', duration: 20 },
      { id: 4, text: 'File edges smooth', emoji: '📁', duration: 10 },
      { id: 5, text: 'Wash your hands', emoji: '💧', duration: 0 }
    ]
  },
  {
    id: 'clothes',
    name: 'Change Your Clothes',
    emoji: '👕',
    color: '#87CEEB',
    character: '👔',
    steps: [
      { id: 1, text: 'Pick clean clothes', emoji: '👕', duration: 0 },
      { id: 2, text: 'Remove old clothes', emoji: '👖', duration: 0 },
      { id: 3, text: 'Put on new shirt', emoji: '👔', duration: 0 },
      { id: 4, text: 'Put on new pants', emoji: '👖', duration: 0 },
      { id: 5, text: 'Check in mirror', emoji: '🪞', duration: 0 }
    ]
  },
  {
    id: 'breakfast',
    name: 'Eat Your Breakfast',
    emoji: '🥣',
    color: '#FFD700',
    character: '🥄',
    steps: [
      { id: 1, text: 'Wash your hands', emoji: '💧', duration: 0 },
      { id: 2, text: 'Get your food', emoji: '🥘', duration: 0 },
      { id: 3, text: 'Sit down at table', emoji: '🪑', duration: 0 },
      { id: 4, text: 'Eat your breakfast slowly', emoji: '😋', duration: 30 },
      { id: 5, text: 'Drink your water', emoji: '💧', duration: 0 },
      { id: 6, text: 'Clean up your plate', emoji: '🧹', duration: 0 }
    ]
  },
  {
    id: 'sleep',
    name: 'Get Ready for Bed',
    emoji: '😴',
    color: '#4B0082',
    character: '🛏️',
    steps: [
      { id: 1, text: 'Put on pajamas', emoji: '🛏️', duration: 0 },
      { id: 2, text: 'Brush your teeth', emoji: '🪥', duration: 0 },
      { id: 3, text: 'Use the bathroom', emoji: '🚽', duration: 0 },
      { id: 4, text: 'Get into bed', emoji: '🛏️', duration: 0 },
      { id: 5, text: 'Relax and sleep', emoji: '😴', duration: 0 }
    ]
  },
  {
    id: 'outdoor',
    name: 'Prepare for Outdoors',
    emoji: '🌞',
    color: '#FF8C00',
    character: '☀️',
    steps: [
      { id: 1, text: 'Apply sunscreen', emoji: '☀️', duration: 0 },
      { id: 2, text: 'Put on your clothes', emoji: '👕', duration: 0 },
      { id: 3, text: 'Put on your shoes', emoji: '👟', duration: 0 },
      { id: 4, text: 'Get a hat or cap', emoji: '🧢', duration: 0 },
      { id: 5, text: 'Bring water bottle', emoji: '💧', duration: 0 }
    ]
  },
  {
    id: 'lunch',
    name: 'Eat Your Lunch',
    emoji: '🥗',
    color: '#228B22',
    character: '🍽️',
    steps: [
      { id: 1, text: 'Wash your hands', emoji: '💧', duration: 0 },
      { id: 2, text: 'Get your lunch ready', emoji: '🥘', duration: 0 },
      { id: 3, text: 'Sit down at table', emoji: '🪑', duration: 0 },
      { id: 4, text: 'Eat your lunch slowly', emoji: '😋', duration: 30 },
      { id: 5, text: 'Drink your water', emoji: '💧', duration: 0 },
      { id: 6, text: 'Clean your area', emoji: '🧹', duration: 0 }
    ]
  },
  {
    id: 'homework',
    name: 'Do Your Homework',
    emoji: '📚',
    color: '#1E90FF',
    character: '✏️',
    steps: [
      { id: 1, text: 'Gather your materials', emoji: '📚', duration: 0 },
      { id: 2, text: 'Find a quiet space', emoji: '🤫', duration: 0 },
      { id: 3, text: 'Review the assignment', emoji: '👀', duration: 0 },
      { id: 4, text: 'Work on your homework', emoji: '✏️', duration: 45 },
      { id: 5, text: 'Review your work', emoji: '✅', duration: 0 },
      { id: 6, text: 'Pack everything away', emoji: '📦', duration: 0 }
    ]
  }
];

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedRoutine, setSelectedRoutine] = useState(null);
  const [stars, setStars] = useState(parseInt(localStorage.getItem('stars') || '0'));
  const [completedToday, setCompletedToday] = useState(JSON.parse(localStorage.getItem('completedToday') || '[]'));
  const [completedRoutines, setCompletedRoutines] = useState(JSON.parse(localStorage.getItem('completedRoutines') || '[]'));
  const [soundEnabled, setSoundEnabled] = useState(JSON.parse(localStorage.getItem('soundEnabled') || 'true'));
  const [animationEnabled, setAnimationEnabled] = useState(JSON.parse(localStorage.getItem('animationEnabled') || 'true'));
  const [darkMode, setDarkMode] = useState(JSON.parse(localStorage.getItem('darkMode') || 'false'));

  const handleSelectRoutine = (routine) => {
    setSelectedRoutine(routine);
    setCurrentPage('activity');
  };

  const handleActivityComplete = (starsEarned = 1) => {
    const newStars = stars + starsEarned;
    const newCompleted = [...completedToday, selectedRoutine.id];
    const allCompleted = [...completedRoutines, selectedRoutine.id];
    
    setStars(newStars);
    setCompletedToday(newCompleted);
    setCompletedRoutines(allCompleted);
    
    localStorage.setItem('stars', newStars.toString());
    localStorage.setItem('completedToday', JSON.stringify(newCompleted));
    localStorage.setItem('completedRoutines', JSON.stringify(allCompleted));
    
    setSelectedRoutine(null);
    setCurrentPage('home');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <HomePage 
            routines={ROUTINES} 
            onSelectRoutine={handleSelectRoutine}
            stars={stars}
            completedToday={completedToday}
          />
        );
      case 'activity':
        return (
          <ActivityPage
            routine={selectedRoutine}
            onComplete={handleActivityComplete}
            onBack={() => setCurrentPage('home')}
          />
        );
      case 'dashboard':
        return (
          <DashboardPage
            stars={stars}
            completedToday={completedToday}
            completedRoutines={completedRoutines}
            routines={ROUTINES}
          />
        );
      case 'progress':
        return (
          <ProgressPage
            stars={stars}
            completedRoutines={completedRoutines}
            totalRoutines={ROUTINES.length}
            routines={ROUTINES}
          />
        );
      case 'rewards':
        return (
          <RewardsPage
            stars={stars}
            completedRoutines={completedRoutines}
            totalRoutines={ROUTINES.length}
          />
        );
      case 'settings':
        return (
          <SettingsPage
            soundEnabled={soundEnabled}
            animationEnabled={animationEnabled}
            darkMode={darkMode}
            onSoundToggle={() => {
              const newValue = !soundEnabled;
              setSoundEnabled(newValue);
              localStorage.setItem('soundEnabled', JSON.stringify(newValue));
            }}
            onAnimationToggle={() => {
              const newValue = !animationEnabled;
              setAnimationEnabled(newValue);
              localStorage.setItem('animationEnabled', JSON.stringify(newValue));
            }}
            onDarkModeToggle={() => {
              const newValue = !darkMode;
              setDarkMode(newValue);
              localStorage.setItem('darkMode', JSON.stringify(newValue));
            }}
          />
        );
      default:
        return <HomePage routines={ROUTINES} onSelectRoutine={handleSelectRoutine} stars={stars} />;
    }
  };

  return (
    <div className={`app-container ${darkMode ? 'dark-mode' : ''}`}>
      {renderPage()}
      <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
    </div>
  );
}

export default App;
