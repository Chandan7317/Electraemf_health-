import React, { useState, useEffect } from 'react';
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
  const [currentUser, setCurrentUser] = useState(null);
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
      } else {
        localStorage.removeItem('electraemf_user_photo');
      }
    }
  };

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

  // Modals State
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isCallOpen, setIsCallOpen] = useState(false);
  const [isAssessmentOpen, setIsAssessmentOpen] = useState(false);

  const handleTabChange = (tabId) => {
    setIsSearchOpen(false);
    setSearchQuery('');
    setActiveTab(tabId);
    if (typeof window !== 'undefined') {
      window.location.hash = tabId;
    }
    const container = document.getElementById('phone-content');
    if (container) {
      container.scrollTo({ top: 0, behavior: 'smooth' });
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
      {/* Mobile Header: Expands smoothly into search mode or standard branding; hidden on dedicated Auth screens */}
      {!isAuthView && (
        <Header
          activeTab={activeTab}
          onNavigate={handleTabChange}
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
                onAuthSuccess={(user) => {
                  setCurrentUser(user);
                  handleTabChange('profile');
                }}
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
                onLogout={() => setCurrentUser(null)}
                userPhoto={userPhoto}
                onUpdatePhoto={handleUpdatePhoto}
              />
            )}

            {activeTab === 'notifications' && (
              <NotificationsScreen
                onNavigate={handleTabChange}
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
