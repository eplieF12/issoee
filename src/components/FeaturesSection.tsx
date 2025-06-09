
import { Shield, Clock, Star, MessageSquare, CreditCard, MapPin } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Perfis Verificados",
    description: "Todos os freelancers passam por um processo de verificação para garantir qualidade e confiança."
  },
  {
    icon: Clock,
    title: "Contratação Rápida",
    description: "Encontre profissionais disponíveis em questão de minutos para cobrir suas necessidades urgentes."
  },
  {
    icon: Star,
    title: "Sistema de Avaliações",
    description: "Avalie e seja avaliado. Construa sua reputação na plataforma com feedback real dos clientes."
  },
  {
    icon: MessageSquare,
    title: "Chat Integrado",
    description: "Comunicação direta entre freelancers e estabelecimentos com templates pré-definidos."
  },
  {
    icon: CreditCard,
    title: "Pagamentos Seguros",
    description: "Sistema de pagamentos integrado com Pix para transações rápidas e seguras."
  },
  {
    icon: MapPin,
    title: "Geolocalização",
    description: "Encontre profissionais próximos ao seu estabelecimento com check-in automático."
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Porque escolher a <span className="text-gradient">Freeallin</span>?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Uma plataforma completa com todas as ferramentas necessárias para conectar profissionais e estabelecimentos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="group p-6 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
