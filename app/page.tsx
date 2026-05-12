import { AnnouncementBar, Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { TradingModels } from '@/components/TradingModels'
import { PayoutsSuccessStories } from '@/components/PayoutsSuccessStories'
import { DiscordCommunity } from '@/components/DiscordCommunity'
import { ProfitCalculator } from '@/components/ProfitCalculator'
import { FAQ } from '@/components/FAQ'
import { Footer } from '@/components/Footer'
import { ComparisonTable } from '@/components/ComparisonTable'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-950">
      <AnnouncementBar />
      <Header />
    <main>
      <Hero />
      <PayoutsSuccessStories />
      <TradingModels />
      <ComparisonTable />
      <DiscordCommunity />
      <ProfitCalculator />
      <FAQ />
    </main>
      <Footer />
    </div>
  )
}
