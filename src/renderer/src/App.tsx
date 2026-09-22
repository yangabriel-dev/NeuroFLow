import { useEffect } from 'react'
import api from './services/api'
import { useUserStore } from './store/useUserStore'
import { useNavStore } from './store/useNavStore'
import MainLayout from './components/layout/MainLayout'
import Home from './pages/Home'
import Routine from './pages/Routine'
import Stats from './pages/Stats'
import ComingSoon from './pages/ComingSoon'
import FloatingTimer from './components/Timer/FloatingTimer'
import OnboardingModal from './components/Onboarding/OnboardingModal'

function App(): React.JSX.Element | null {
  const user = useUserStore((s) => s.user)
  const setUser = useUserStore((s) => s.setUser)
  const activeView = useNavStore((s) => s.activeView)

  useEffect(() => {
    api.user.get().then(setUser)
  }, [setUser])

  if (!user) return null

  if (user.name.trim() === '') {
    return <OnboardingModal onSubmit={(name) => api.user.updateName(name).then(setUser)} />
  }

  return (
    <MainLayout>
      {activeView === 'home' && <Home />}
      {activeView === 'routine' && <Routine />}
      {activeView === 'stats' && <Stats />}
      {activeView === 'methods' && <ComingSoon title="🧠 Métodos de Aprendizado" />}
      {activeView === 'settings' && <ComingSoon title="⚙️ Configurações" />}
      <FloatingTimer />
    </MainLayout>
  )
}

export default App
