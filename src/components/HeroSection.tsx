
import { Button } from "@/components/ui/button";
import { Search, MapPin, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const HeroSection = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleFreelancerClick = () => {
    navigate("/register-freelancer");
  };

  const handleEstablishmentClick = () => {
    navigate("/register-establishment");
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-white overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-50 animate-float"></div>
      <div className="absolute top-40 right-20 w-16 h-16 bg-purple-200 rounded-full opacity-50 animate-float" style={{animationDelay: '1s'}}></div>
      <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-indigo-200 rounded-full opacity-50 animate-float" style={{animationDelay: '2s'}}></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 animate-fade-in">
            Conecte-se aos melhores
            <span className="block text-gradient">profissionais do setor</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto animate-fade-in" style={{animationDelay: '0.2s'}}>
            Plataforma confiável para contratar garçons, promoters e especialistas em eventos de forma ágil e segura.
          </p>

          {!user && (
            <div
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in"
              style={{ animationDelay: "0.4s" }}
            >
              <Button
                size="lg"
                className="bg-gradient-primary text-white px-8 py-4 text-lg hover:scale-105 transition-transform"
                onClick={handleFreelancerClick}
              >
                Sou Freelancer
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-blue-600 text-blue-600 px-8 py-4 text-lg hover:bg-blue-50 hover:scale-105 transition-all"
                onClick={handleEstablishmentClick}
              >
                Sou Estabelecimento
              </Button>
            </div>
          )}

          {/* Quick stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto animate-fade-in" style={{animationDelay: '0.6s'}}>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">500+</h3>
              <p className="text-gray-600">Profissionais ativos</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">50+</h3>
              <p className="text-gray-600">Cidades atendidas</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">24h</h3>
              <p className="text-gray-600">Tempo médio de resposta</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
