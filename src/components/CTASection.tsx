
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CTASection = () => {
  const navigate = useNavigate();

  const handleFreelancerClick = () => {
    navigate("/register");
  };

  const handleEstablishmentClick = () => {
    navigate("/register");
  };

  return (
    <section className="py-16 sm:py-20 bg-gradient-primary relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="hidden sm:block absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full"></div>
      <div className="hidden sm:block absolute bottom-10 right-10 w-32 h-32 bg-white/5 rounded-full"></div>
      <div className="hidden sm:block absolute top-1/2 left-1/4 w-16 h-16 bg-white/10 rounded-full"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
          Pronto para começar?
        </h2>
        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          Junte-se a centenas de freelancers e estabelecimentos que já descobriram uma nova forma de trabalhar.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            variant="secondary" 
            className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg group"
            onClick={handleFreelancerClick}
          >
            Cadastrar como Freelancer
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg"
            onClick={handleEstablishmentClick}
          >
            Cadastrar Estabelecimento
          </Button>
        </div>
        
        <p className="text-white/70 text-sm mt-6">
          Cadastro gratuito • Sem taxas de adesão • Comece hoje mesmo
        </p>
      </div>
    </section>
  );
};

export default CTASection;
