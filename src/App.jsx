import React, { useState, useEffect } from 'react';
import { Toaster, toast, useToasterStore } from 'react-hot-toast';
import MobileFrame from './components/MobileFrame';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import HomeDashboard from './components/HomeDashboard';
import ServicesScreen from './components/ServicesScreen';
import ExpertsScreen from './components/ExpertsScreen';
import ReportsScreen from './components/ReportsScreen';
import ProfileScreen from './components/ProfileScreen';
import NotificationsScreen from './components/NotificationsScreen';
import MobileSearchView from './components/MobileSearchView';
import AuthScreen from './components/AuthScreen';

// Modals & Drawers
import QuickCallModal from './components/QuickCallModal';
import ConsultationChatModal from './components/ConsultationChatModal';
import EMFRiskAssessmentModal from './components/EMFRiskAssessmentModal';

export default function App() {
  const getHashTab = () => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const hash = window.location.hash.replace('#', '').trim();
      if (['home', 'services', 'experts', 'reports', 'profile', 'notifications', 'login', 'signup'].includes(hash)) {
        return hash;
      }
    }
    return 'home';
  };

  const [activeTab, setActiveTab] = useState(getHashTab);
  const [unreadCount, setUnreadCount] = useState(2);
  const [currentUser, setCurrentUser] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('electraemf_current_user');
        return saved ? JSON.parse(saved) : null;
      } catch {
        return null;
      }
    }
    return null;
  });
  const [userPhoto, setUserPhoto] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('electraemf_user_photo') || null;
    }
    return null;
  });

  const handleUpdatePhoto = (photoDataUrl) => {
    setUserPhoto(photoDataUrl);
    if (typeof window !== 'undefined') {
      if (photoDataUrl) {
        localStorage.setItem('electraemf_user_photo', photoDataUrl);
        toast.success('Profile photo updated successfully!', { id: 'photo-toast' });
      } else {
        localStorage.removeItem('electraemf_user_photo');
        toast('Profile photo removed', { icon: '🗑️', id: 'photo-toast' });
      }
    }
  };

  const handleAuthSuccess = (user) => {
    setCurrentUser(user);
    if (typeof window !== 'undefined') {
      localStorage.setItem('electraemf_current_user', JSON.stringify(user));
    }
    handleTabChange('profile');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('electraemf_current_user');
    }
    toast('Signed out of client account', { icon: '👋', id: 'auth-toast' });
  };

  const handleUpdateUser = (updatedData) => {
    setCurrentUser(prev => {
      const updated = { ...(prev || {}), ...updatedData };
      if (typeof window !== 'undefined') {
        localStorage.setItem('electraemf_current_user', JSON.stringify(updated));
      }
      return updated;
    });
  };

  // Global toast deduplication: cap simultaneous toasts to 1 to prevent stacking/duplicates in mobile view
  const { toasts } = useToasterStore();
  useEffect(() => {
    toasts
      .filter((t) => t.visible)
      .filter((_, i) => i >= 1)
      .forEach((t) => toast.dismiss(t.id));
  }, [toasts]);

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '').trim();
      if (hash && ['home', 'services', 'experts', 'reports', 'profile', 'notifications', 'login', 'signup'].includes(hash)) {
        setActiveTab(hash);
      }
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Search State
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [tabHistory, setTabHistory] = useState(['home']);

  // Modals State
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isCallOpen, setIsCallOpen] = useState(false);
  const [isAssessmentOpen, setIsAssessmentOpen] = useState(false);

  const handleTabChange = (tabId) => {
    setIsSearchOpen(false);
    setSearchQuery('');
    if (tabId !== activeTab) {
      setTabHistory(prev => {
        // Prevent duplicate consecutive entries
        if (prev[prev.length - 1] === tabId) return prev;
        return [...prev, tabId];
      });
    }
    setActiveTab(tabId);
    if (typeof window !== 'undefined') {
      window.location.hash = tabId;
    }
    const container = document.getElementById('phone-content');
    if (container) {
      container.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (isSearchOpen) {
      setIsSearchOpen(false);
      setSearchQuery('');
      return;
    }

    if (tabHistory.length > 1) {
      const nextHistory = [...tabHistory];
      nextHistory.pop(); // Remove current active tab
      const prevTab = nextHistory[nextHistory.length - 1] || 'home';
      setTabHistory(nextHistory);
      setActiveTab(prevTab);
      if (typeof window !== 'undefined') {
        window.location.hash = prevTab;
      }
      const container = document.getElementById('phone-content');
      if (container) {
        container.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      setActiveTab('home');
      if (typeof window !== 'undefined') {
        window.location.hash = 'home';
      }
    }
  };

  const handleBookService = (service) => {
    setActiveTab('profile');
  };

  const handleNavigateToItem = (item) => {
    setIsSearchOpen(false);
    setSearchQuery('');
    if (item.type === 'service') {
      setActiveTab('services');
    } else if (item.type === 'case-study' || item.type === 'article') {
      setActiveTab('reports');
    } else if (item.type === 'page') {
      if (item.id === 'about' || item.id === 'lawful-experts' || item.id === 'health-consultant') {
        setActiveTab('experts');
      } else if (item.id === 'services' || item.id === 'emf-testing') {
        setActiveTab('services');
      } else if (item.id === 'contact') {
        setActiveTab('profile');
      } else {
        setActiveTab('reports');
      }
    }
  };

  const isAuthView = activeTab === 'login' || activeTab === 'signup';

  return (
    <MobileFrame>
      {/* Global Toast Notification System */}
      <Toaster
        position="top-center"
        containerStyle={{
          top: 14,
          zIndex: 99999
        }}
        toastOptions={{
          duration: 3200,
          style: {
            background: '#0c1f3d',
            color: '#ffffff',
            fontSize: '12px',
            fontWeight: '600',
            borderRadius: '16px',
            padding: '10px 15px',
            boxShadow: '0 12px 28px -4px rgba(12, 31, 61, 0.4), 0 4px 10px -2px rgba(12, 31, 61, 0.3)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            maxWidth: '330px',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#ffffff',
            },
          },
          error: {
            iconTheme: {
              primary: '#f43f5e',
              secondary: '#ffffff',
            },
          },
        }}
      />

      {/* Mobile Header: Expands smoothly into search mode or standard branding; hidden on dedicated Auth screens */}
      {!isAuthView && (
        <Header
          activeTab={activeTab}
          onNavigate={handleTabChange}
          onBack={handleBack}
          isSearchOpen={isSearchOpen}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onOpenSearch={() => setIsSearchOpen(true)}
          onCloseSearch={() => {
            setIsSearchOpen(false);
            setSearchQuery('');
          }}
          onOpenNotifications={() => handleTabChange('notifications')}
          onOpenProfile={() => handleTabChange('profile')}
          unreadCount={unreadCount}
          currentUser={currentUser}
          userPhoto={userPhoto}
        />
      )}

      {/* Main Viewport Container */}
      <main id="phone-content" className={`flex-1 overflow-y-auto no-scrollbar ${isAuthView ? 'p-0' : 'px-4 pt-3 pb-2'}`}>
        {isSearchOpen ? (
          <MobileSearchView
            searchQuery={searchQuery}
            onSelectQuery={(q) => setSearchQuery(q)}
            onNavigateToItem={handleNavigateToItem}
            onClose={() => {
              setIsSearchOpen(false);
              setSearchQuery('');
            }}
          />
        ) : (
          <>
            {/* Dedicated Auth Screen (Login / Create Account matching user reference image) */}
            {isAuthView && (
              <AuthScreen
                initialMode={activeTab === 'signup' ? 'signup' : 'login'}
                onNavigate={handleTabChange}
                onAuthSuccess={handleAuthSuccess}
              />
            )}

            {activeTab === 'home' && (
              <HomeDashboard
                onNavigate={handleTabChange}
                onOpenSearch={(initialQuery = '') => {
                  setSearchQuery(initialQuery);
                  setIsSearchOpen(true);
                }}
                onOpenChat={() => setIsChatOpen(true)}
                onOpenCall={() => setIsCallOpen(true)}
                onSelectService={() => setActiveTab('services')}
                onOpenAssessmentModal={() => setIsAssessmentOpen(true)}
              />
            )}

            {activeTab === 'services' && (
              <ServicesScreen
                onNavigate={handleTabChange}
                onOpenCall={() => setIsCallOpen(true)}
                onBookService={handleBookService}
              />
            )}

            {activeTab === 'experts' && (
              <ExpertsScreen
                onOpenCall={() => setIsCallOpen(true)}
                onNavigate={handleTabChange}
              />
            )}

            {activeTab === 'reports' && (
              <ReportsScreen
                onOpenCall={() => setIsCallOpen(true)}
                onNavigate={handleTabChange}
              />
            )}

            {activeTab === 'profile' && (
              <ProfileScreen
                onOpenCall={() => setIsCallOpen(true)}
                onNavigate={handleTabChange}
                currentUser={currentUser}
                onLogout={handleLogout}
                userPhoto={userPhoto}
                onUpdatePhoto={handleUpdatePhoto}
                onUpdateUser={handleUpdateUser}
              />
            )}

            {activeTab === 'notifications' && (
              <NotificationsScreen
                onNavigate={handleTabChange}
                onBack={handleBack}
                onUnreadChange={setUnreadCount}
              />
            )}
          </>
        )}
      </main>

      {/* Fixed Bottom Navigation: hidden on dedicated Auth screens */}
      {!isAuthView && (
        <BottomNav
          activeTab={isSearchOpen ? '' : activeTab}
          onTabChange={handleTabChange}
        />
      )}

      {/* Global Modals */}
      <QuickCallModal
        isOpen={isCallOpen}
        onClose={() => setIsCallOpen(false)}
      />

      <ConsultationChatModal
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        onOpenCall={() => {
          setIsChatOpen(false);
          setIsCallOpen(true);
        }}
        onNavigateToContact={() => {
          setIsChatOpen(false);
          setActiveTab('profile');
        }}
      />

      <EMFRiskAssessmentModal
        isOpen={isAssessmentOpen}
        onClose={() => setIsAssessmentOpen(false)}
        onNavigateToContact={() => {
          setIsAssessmentOpen(false);
          setActiveTab('profile');
        }}
      />
    </MobileFrame>
  );
}
