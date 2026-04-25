import { Button } from '../components/ui/button'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="bg-black/50 backdrop-blur-md border-b border-purple-500/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="text-2xl">🐺</div>
              <h1 className="text-xl font-bold text-purple-400">Hardy Store</h1>
            </div>
            <div className="flex gap-4">
              <Button variant="ghost" className="text-white hover:text-purple-400">Produtos</Button>
              <Button variant="ghost" className="text-white hover:text-purple-400">Sobre</Button>
              <Button className="bg-purple-600 hover:bg-purple-700">Comprar</Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="space-y-8">
          <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-600 to-purple-400 animate-pulse">
            Hardy Store
          </div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            🐺 Fanix é um híbrido humano-lobo que representa o equilíbrio perfeito entre instinto afiado e estratégia precisa.
          </p>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Como fundador e responsável pela Hardy Store, Fanix atua como curador de experiências premium dentro do universo de Murder Mystery 2. 
            Com profundo conhecimento do mercado e visão estratégica, constrói uma loja que vai muito além de simples transações.
          </p>
          <div className="flex gap-4 justify-center pt-8">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white text-lg px-8">Explorar Loja</Button>
            <Button size="lg" variant="outline" className="border-purple-400 text-purple-400 hover:bg-purple-400/10 text-lg px-8">Saiba Mais</Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-8 hover:border-purple-400/60 transition">
            <div className="text-4xl mb-4">🎭</div>
            <h3 className="text-lg font-bold text-purple-300 mb-2">Experiências Premium</h3>
            <p className="text-gray-400">Curadas especialmente para os jogadores de Murder Mystery 2</p>
          </div>
          <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-8 hover:border-purple-400/60 transition">
            <div className="text-4xl mb-4">🔐</div>
            <h3 className="text-lg font-bold text-purple-300 mb-2">Segurança Total</h3>
            <p className="text-gray-400">Confiança para quem compra e liberdade para quem vende</p>
          </div>
          <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-8 hover:border-purple-400/60 transition">
            <div className="text-4xl mb-4">❤️</div>
            <h3 className="text-lg font-bold text-purple-300 mb-2">Amável & Acessível</h3>
            <p className="text-gray-400">Uma experiência única e confusamente atratente</p>
          </div>
        </div>
      </section>

      {/* About Fanix Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-lg border border-purple-500/20 mb-16">
        <div className="text-center space-y-6">
          <h2 className="text-4xl font-bold text-purple-300">Sobre Fanix</h2>
          <div className="text-6xl">🐺</div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Sua abordagem combina carisma natural com profissionalismo sólido, transmitindo segurança para quem compra e liberdade para quem deseja vender ou expor seus produtos. 
            Para Fanix, uma loja vai muito além de transações comerciais.
          </p>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Sempre atento às tendências e às demandas dos jogadores, ele trabalha continuamente para evoluir a Hardy Store, mantendo um padrão visual marcante, navegação intuitiva e uma experiência única.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/50 border-t border-purple-500/20 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-gray-400">
          <p>Desenvolvido com ❤️ por Fanix | Hardy Store © 2026</p>
        </div>
      </footer>
    </div>
  )
}
