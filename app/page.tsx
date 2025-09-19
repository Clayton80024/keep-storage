'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import { Cloud, Shield, Zap, Users, ArrowRight, Check, Menu, X, Upload, Download, FolderOpen, Star } from 'lucide-react'

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const router = useRouter()
  const { isSignedIn } = useAuth()

  const handleStartForFree = () => {
    if (isSignedIn) {
      router.push('/files')
    }
  }

  const features = [
    {
      icon: Shield,
      title: 'Segurança Avançada',
      description: 'Seus arquivos são protegidos com criptografia de ponta a ponta e backups automáticos.'
    },
    {
      icon: Zap,
      title: 'Velocidade Extrema',
      description: 'Upload e download ultrarrápidos com nossa infraestrutura global otimizada.'
    },
    {
      icon: Users,
      title: 'Colaboração Simples',
      description: 'Compartilhe arquivos e pastas facilmente com sua equipe ou clientes.'
    }
  ]

  const plans = [
    {
      name: 'Gratuito',
      price: 'R$ 0',
      period: '/mês',
      storage: '5 GB',
      features: [
        '5 GB de armazenamento',
        'Sincronização básica',
        'Suporte por email',
        'Acesso via web e mobile'
      ]
    },
    {
      name: 'Pro',
      price: 'R$ 19',
      period: '/mês',
      storage: '1 TB',
      popular: true,
      features: [
        '1 TB de armazenamento',
        'Sincronização avançada',
        'Suporte prioritário',
        'Colaboração em equipe',
        'Versionamento de arquivos',
        'Backup automático'
      ]
    },
    {
      name: 'Business',
      price: 'R$ 49',
      period: '/mês',
      storage: '5 TB',
      features: [
        '5 TB de armazenamento',
        'Usuários ilimitados',
        'Suporte 24/7',
        'Administração avançada',
        'Integração com APIs',
        'Relatórios detalhados'
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200/60 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4 lg:py-6">
            <div className="flex items-center">
              <Cloud className="h-8 w-8 text-teal-600 mr-3" />
              <span className="text-xl font-bold text-gray-900 tracking-tight">KeepStorage</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <a href="#features" className="text-gray-700 hover:text-teal-600 font-medium transition-colors">Recursos</a>
              <a href="#pricing" className="text-gray-700 hover:text-teal-600 font-medium transition-colors">Preços</a>
              <a href="#about" className="text-gray-700 hover:text-teal-600 font-medium transition-colors">Sobre</a>
            </nav>

            <div className="hidden lg:flex items-center space-x-4">
              {isSignedIn ? (
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => router.push('/files')}
                    className="text-gray-700 hover:text-gray-900 font-semibold px-4 py-2 rounded-lg transition-colors"
                  >
                    Meus Arquivos
                  </button>
                  <UserButton afterSignOutUrl="/" />
                </div>
              ) : (
                <>
                  <SignInButton mode="modal">
                    <button className="text-gray-700 hover:text-gray-900 font-semibold px-4 py-2 rounded-lg transition-colors">
                      Entrar
                    </button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <button className="bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold px-6 py-2.5 rounded-lg hover:from-teal-600 hover:to-teal-700 transition-all duration-200 shadow-lg shadow-teal-600/30">
                      Começar Grátis
                    </button>
                  </SignUpButton>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="lg:hidden pb-4 border-t border-gray-200/60 pt-4">
              <nav className="flex flex-col space-y-3">
                <a href="#features" className="text-gray-700 hover:text-teal-600 font-medium py-2 transition-colors">Recursos</a>
                <a href="#pricing" className="text-gray-700 hover:text-teal-600 font-medium py-2 transition-colors">Preços</a>
                <a href="#about" className="text-gray-700 hover:text-teal-600 font-medium py-2 transition-colors">Sobre</a>
                <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200/60">
                  {isSignedIn ? (
                    <div className="flex flex-col space-y-2">
                      <button
                        onClick={() => router.push('/files')}
                        className="text-gray-700 hover:text-gray-900 font-semibold px-4 py-2 rounded-lg transition-colors text-left"
                      >
                        Meus Arquivos
                      </button>
                      <div className="px-4 py-2">
                        <UserButton afterSignOutUrl="/" />
                      </div>
                    </div>
                  ) : (
                    <>
                      <SignInButton mode="modal">
                        <button className="text-gray-700 hover:text-gray-900 font-semibold px-4 py-2 rounded-lg transition-colors text-left w-full">
                          Entrar
                        </button>
                      </SignInButton>
                      <SignUpButton mode="modal">
                        <button className="bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold px-6 py-2.5 rounded-lg hover:from-teal-600 hover:to-teal-700 transition-all duration-200 shadow-lg shadow-teal-600/30 w-full">
                          Começar Grátis
                        </button>
                      </SignUpButton>
                    </>
                  )}
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-50 via-white to-teal-50/30 px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight mb-8">
              Seu armazenamento na nuvem
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-teal-600">
                simples e seguro
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
              Armazene, sincronize e compartilhe seus arquivos com segurança total.
              Acesse de qualquer lugar, a qualquer momento.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              {isSignedIn ? (
                <button
                  onClick={() => router.push('/files')}
                  className="w-full sm:w-auto bg-gradient-to-r from-teal-500 to-teal-600 text-white font-bold px-8 py-4 rounded-xl hover:from-teal-600 hover:to-teal-700 transition-all duration-200 shadow-xl shadow-teal-600/30 hover:shadow-teal-700/40 hover:scale-105 flex items-center justify-center"
                >
                  <Upload className="h-5 w-5 mr-2" />
                  Acessar Meus Arquivos
                </button>
              ) : (
                <SignUpButton mode="modal">
                  <button className="w-full sm:w-auto bg-gradient-to-r from-teal-500 to-teal-600 text-white font-bold px-8 py-4 rounded-xl hover:from-teal-600 hover:to-teal-700 transition-all duration-200 shadow-xl shadow-teal-600/30 hover:shadow-teal-700/40 hover:scale-105 flex items-center justify-center">
                    <Upload className="h-5 w-5 mr-2" />
                    Começar Agora - Grátis
                  </button>
                </SignUpButton>
              )}
              <button className="w-full sm:w-auto border-2 border-gray-300 text-gray-700 font-semibold px-8 py-4 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 flex items-center justify-center">
                Ver Demo
                <ArrowRight className="h-5 w-5 ml-2" />
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-2">500K+</div>
                <div className="text-gray-600 font-medium">Usuários ativos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-2">50M+</div>
                <div className="text-gray-600 font-medium">Arquivos armazenados</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-2">99.9%</div>
                <div className="text-gray-600 font-medium">Uptime garantido</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Por que escolher o KeepStorage?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Recursos poderosos e simplicidade em uma única plataforma
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div key={index} className="bg-gray-50/50 rounded-2xl p-8 hover:bg-white hover:shadow-xl transition-all duration-300 border border-gray-200/40">
                  <div className="h-16 w-16 bg-gradient-to-br from-teal-100 to-teal-200 rounded-xl flex items-center justify-center mb-6">
                    <Icon className="h-8 w-8 text-teal-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              )
            })}
          </div>

          {/* Additional Features Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <FolderOpen className="h-6 w-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Organização</h4>
              <p className="text-sm text-gray-600">Pastas inteligentes</p>
            </div>
            <div className="text-center">
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Download className="h-6 w-6 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Sincronização</h4>
              <p className="text-sm text-gray-600">Tempo real</p>
            </div>
            <div className="text-center">
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="h-6 w-6 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Privacidade</h4>
              <p className="text-sm text-gray-600">Criptografia total</p>
            </div>
            <div className="text-center">
              <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Star className="h-6 w-6 text-orange-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Qualidade</h4>
              <p className="text-sm text-gray-600">5 estrelas</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 lg:py-32 bg-gradient-to-br from-gray-50 to-teal-50/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Planos simples e transparentes
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Escolha o plano ideal para suas necessidades
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div key={index} className={`relative bg-white rounded-2xl p-8 shadow-sm border transition-all duration-300 hover:shadow-xl ${plan.popular ? 'border-teal-200 ring-2 ring-teal-100' : 'border-gray-200'}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-teal-500 to-teal-600 text-white px-4 py-1.5 rounded-full text-sm font-semibold shadow-lg">
                      Mais Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-600 ml-1">{plan.period}</span>
                  </div>
                  <p className="text-teal-600 font-semibold mt-2">{plan.storage}</p>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="h-5 w-5 text-teal-600 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                {isSignedIn ? (
                  <button
                    onClick={() => router.push('/files')}
                    className={`w-full font-semibold py-3 px-6 rounded-xl transition-all duration-200 ${
                      plan.popular
                        ? 'bg-gradient-to-r from-teal-500 to-teal-600 text-white hover:from-teal-600 hover:to-teal-700 shadow-lg shadow-teal-600/30 hover:scale-105'
                        : 'border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400'
                    }`}
                  >
                    Acessar Dashboard
                  </button>
                ) : (
                  <SignUpButton mode="modal">
                    <button className={`w-full font-semibold py-3 px-6 rounded-xl transition-all duration-200 ${
                      plan.popular
                        ? 'bg-gradient-to-r from-teal-500 to-teal-600 text-white hover:from-teal-600 hover:to-teal-700 shadow-lg shadow-teal-600/30 hover:scale-105'
                        : 'border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400'
                    }`}>
                      Escolher {plan.name}
                    </button>
                  </SignUpButton>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-r from-teal-500 to-teal-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Pronto para começar?
          </h2>
          <p className="text-xl text-teal-100 mb-10 leading-relaxed">
            Junte-se a milhares de usuários que já confiam no KeepStorage para armazenar seus arquivos com segurança.
          </p>
          {isSignedIn ? (
            <button
              onClick={() => router.push('/files')}
              className="bg-white text-teal-600 font-bold px-8 py-4 rounded-xl hover:bg-gray-50 transition-all duration-200 shadow-xl hover:scale-105 inline-flex items-center"
            >
              <Upload className="h-5 w-5 mr-2" />
              Acessar Meus Arquivos
            </button>
          ) : (
            <SignUpButton mode="modal">
              <button className="bg-white text-teal-600 font-bold px-8 py-4 rounded-xl hover:bg-gray-50 transition-all duration-200 shadow-xl hover:scale-105 inline-flex items-center">
                <Upload className="h-5 w-5 mr-2" />
                Criar Conta Grátis
              </button>
            </SignUpButton>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <div className="flex items-center mb-6">
                <Cloud className="h-8 w-8 text-teal-400 mr-3" />
                <span className="text-xl font-bold">KeepStorage</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                A plataforma de armazenamento em nuvem mais segura e confiável do Brasil.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Produto</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Recursos</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Preços</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Segurança</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Empresa</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Sobre</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contato</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Suporte</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Central de Ajuda</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 KeepStorage. Todos os direitos reservados.
            </p>
            <div className="flex space-x-6 mt-4 sm:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Privacidade</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Termos</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
