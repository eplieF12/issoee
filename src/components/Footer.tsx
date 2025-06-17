
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm"><img src="/public/favicon.ico" /></span>
              </div>
              {/* Show text on larger screens and logo on mobile */}
              <span className="hidden sm:block text-xl font-bold">GarçomMatch</span>
              <img
                src="/logo.png"
                srcSet="/logo.svg 2x"
                alt="GarçomMatch logo"
                className="block sm:hidden h-8 w-auto"
              />
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              A plataforma que conecta freelancers qualificados a estabelecimentos que precisam de profissionais para eventos e serviços temporários.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Instagram</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">LinkedIn</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Twitter</a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Para Freelancers</h3>
            <ul className="space-y-2">
              <li><Link to="/browse-jobs" className="text-gray-400 hover:text-white transition-colors">Buscar Vagas</Link></li>
              <li><Link to="/profile" className="text-gray-400 hover:text-white transition-colors">Meu Perfil</Link></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Como Funciona</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Dicas de Sucesso</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Para Estabelecimentos</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Publicar Vaga</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Buscar Freelancers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Preços</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Suporte</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 GarçomMatch. Todos os direitos reservados.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Termos de Uso</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Política de Privacidade</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Contato</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
