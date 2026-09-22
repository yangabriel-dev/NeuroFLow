import { useEffect } from 'react'
import api from './services/api'
import { useUserStore } from './store/useUserStore'
import MainLayout from './components/layout/MainLayout'
import Home from './pages/Home'
import FloatingTimer from './components/Timer/FloatingTimer'
import OnboardingModal from './components/Onboarding/OnboardingModal'

function App(): React.JSX.Element | null {
  const user = useUserStore((s) => s.user)
  const setUser = useUserStore((s) => s.setUser)

  useEffect(() => {
    api.user.get().then(setUser)
  }, [setUser])

  if (!user) return null

  if (user.name.trim() === '') {
    return <OnboardingModal onSubmit={(name) => api.user.updateName(name).then(setUser)} />
  }

  return (
    <MainLayout>
      <Home />
      <FloatingTimer />
    </MainLayout>
  )
}

export default App
