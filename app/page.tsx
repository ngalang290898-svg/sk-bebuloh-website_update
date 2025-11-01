import HomeLayout from './layouts/HomeLayout'
import HeroSection from './components/home/HeroSection'
import WelcomeSection from './components/home/WelcomeSection'
import VisionMissionSection from './components/home/VisionMissionSection'
import StaffHighlight from './components/home/StaffHighlight'
import PKPreviewSection from './components/home/PKPreviewSection'
import AchievementsSection from './components/home/AchievementsSection'
import NewsSection from './components/home/NewsSection'
import ContactSection from './components/home/ContactSection'

export default function Home() {
  return (
    <HomeLayout>
      <HeroSection />
      <WelcomeSection />
      <VisionMissionSection />
      <StaffHighlight />
      <PKPreviewSection />
      <AchievementsSection />
      <NewsSection />
      <ContactSection />
    </HomeLayout>
  )
}
