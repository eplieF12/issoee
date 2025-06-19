import { useState } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Calendar, Clock, DollarSign, Filter, Heart } from "lucide-react";
import JobDetailsModal from "@/components/modals/JobDetailsModal";
import AdvancedFilters from "@/components/AdvancedFilters";
import { useToast } from "@/hooks/use-toast";
import { useMessages } from "@/contexts/MessagesContext";
import { useFavorites } from "@/contexts/FavoritesContext";

const BrowseJobs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedCity, setSelectedCity] = useState("all");
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState<any>({});
  const [isJobDetailsModalOpen, setIsJobDetailsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const { toast } = useToast();
  const { sendMessage } = useMessages();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();

  // Simulando freelancer logado
  const currentFreelancer = { id: 1, name: "João Silva" };

  const [availableJobs, setAvailableJobs] = useState([
    {
      id: 1,
      title: "Garçom para Evento Corporativo",
      establishment: "Hotel Marriott",
      location: "São Paulo, SP",
      date: "15 de Janeiro",
      time: "18:00 - 23:00",
      payment: "R$ 120",
      type: "Garçom",
      urgent: true,
      description: "Procuramos garçom experiente para evento corporativo em hotel de luxo. Será responsável pelo atendimento de 150 convidados durante jantar executivo.",
      requirements: "Experiência mínima de 1 ano em eventos corporativos, boa apresentação pessoal, disponibilidade para trabalhar em fins de semana."
    },
    {
      id: 2,
      title: "Promoter para Lançamento de Produto",
      establishment: "Shopping Iguatemi",
      location: "São Paulo, SP",
      date: "18 de Janeiro",
      time: "14:00 - 20:00",
      payment: "R$ 200",
      type: "Promoter",
      urgent: false,
      description: "Ativação de marca para lançamento de novo produto tecnológico. Interação com público, demonstração do produto e distribuição de brindes.",
      requirements: "Carisma, facilidade de comunicação, experiência em ativações de marca."
    },
    {
      id: 3,
      title: "Barman para Bar Temático",
      establishment: "Boteco da Esquina",
      location: "Rio de Janeiro, RJ",
      date: "20 de Janeiro",
      time: "19:00 - 02:00",
      payment: "R$ 180",
      type: "Barman",
      urgent: false,
      description: "Bar temático procura barman para noite especial de coquetéis. Conhecimento em drinks clássicos e criatividade para novos sabores.",
      requirements: "Experiência comprovada como barman, conhecimento de coquetelaria, disponibilidade para trabalhar até tarde."
    }
  ]);

  const filteredJobs = availableJobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.establishment.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || job.type === selectedCategory;
    const matchesCity = selectedCity === "all" || job.location.includes(selectedCity);
    
    // Apply advanced filters
    if (appliedFilters.location && !job.location.toLowerCase().includes(appliedFilters.location.toLowerCase())) {
      return false;
    }
    if (appliedFilters.category && appliedFilters.category !== "all" && job.type !== appliedFilters.category) {
      return false;
    }
    
    return matchesSearch && matchesCategory && matchesCity;
  });

  const handleToggleFavorite = (job: any) => {
    if (isFavorite(job.id, 'job')) {
      removeFromFavorites(job.id, 'job');
      toast({
        title: "Removido dos favoritos",
        description: `${job.title} foi removido da sua lista de favoritos.`,
      });
    } else {
      addToFavorites({
        id: job.id,
        type: 'job',
        name: job.title,
        location: job.location,
        category: job.type
      });
      toast({
        title: "Adicionado aos favoritos",
        description: `${job.title} foi adicionado à sua lista de favoritos.`,
      });
    }
  };

  const handleViewJobDetails = (job: any) => {
    setSelectedJob(job);
    setIsJobDetailsModalOpen(true);
  };

  const handleApplyToJob = (job?: any) => {
    const jobToApply = job || selectedJob;
    if (!jobToApply) return;

    // Remove job from available jobs
    setAvailableJobs(prev => prev.filter(j => j.id !== jobToApply.id));

    // Send message to establishment
    const conversationId = `conv_${jobToApply.id}_${currentFreelancer.id}`;
    sendMessage({
      fromId: currentFreelancer.id,
      fromName: currentFreelancer.name,
      fromType: "freelancer",
      toId: jobToApply.id,
      toName: jobToApply.establishment,
      toType: "establishment",
      subject: `Candidatura para ${jobToApply.title}`,
      message: `Olá! Me candidatei para a vaga de ${jobToApply.title}. Tenho interesse em trabalhar neste projeto. Podemos conversar sobre os detalhes?`,
      read: false,
      conversationId
    });

    toast({
      title: "Candidatura enviada!",
      description: `Você se candidatou para ${jobToApply.title}. O estabelecimento foi notificado e você pode acompanhar na página de Mensagens.`,
    });

    if (isJobDetailsModalOpen) {
      setIsJobDetailsModalOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-white">
      <Header />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Vagas Disponíveis
          </h1>
          <p className="text-gray-600">Encontre oportunidades que combinam com seu perfil</p>
        </div>

        {/* Basic Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Buscar vagas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as categorias</SelectItem>
                  <SelectItem value="Garçom">Garçom</SelectItem>
                  <SelectItem value="Atendente">Atendente</SelectItem>
                  <SelectItem value="Promoter">Promoter</SelectItem>
                  <SelectItem value="Barman">Barman</SelectItem>
                  <SelectItem value="Auxiliar de Eventos">Auxiliar de Eventos</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedCity} onValueChange={setSelectedCity}>
                <SelectTrigger>
                  <SelectValue placeholder="Cidade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as cidades</SelectItem>
                  <SelectItem value="São Paulo">São Paulo</SelectItem>
                  <SelectItem value="Rio de Janeiro">Rio de Janeiro</SelectItem>
                  <SelectItem value="Belo Horizonte">Belo Horizonte</SelectItem>
                  <SelectItem value="Salvador">Salvador</SelectItem>
                </SelectContent>
              </Select>

              <Button 
                variant="outline" 
                className="flex items-center"
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              >
                <Filter className="w-4 h-4 mr-2" />
                Filtros Avançados
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Advanced Filters */}
        <AdvancedFilters
          isOpen={showAdvancedFilters}
          onToggle={() => setShowAdvancedFilters(!showAdvancedFilters)}
          onApplyFilters={setAppliedFilters}
        />

        {/* Lista de Vagas */}
        <div className="space-y-4">
          {filteredJobs.map((job) => (
            <Card key={job.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <h3 className="text-xl font-semibold text-gray-900 mr-3">{job.title}</h3>
                      {job.urgent && (
                        <Badge variant="destructive">Urgente</Badge>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="ml-2"
                        onClick={() => handleToggleFavorite(job)}
                      >
                        <Heart 
                          className={`w-4 h-4 ${
                            isFavorite(job.id, 'job') 
                              ? 'fill-red-500 text-red-500' 
                              : 'text-gray-400'
                          }`} 
                        />
                      </Button>
                    </div>
                    <p className="text-gray-600 mb-3">{job.establishment}</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        {job.location}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        {job.date}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        {job.time}
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="w-4 h-4 mr-2" />
                        {job.payment}
                      </div>
                    </div>
                  </div>
                  <div className="ml-6 text-right">
                    <p className="text-3xl font-bold text-green-600 mb-4">{job.payment}</p>
                    <div className="space-y-2">
                      <Button 
                        className="w-full min-w-[120px]"
                        onClick={() => handleApplyToJob(job)}
                      >
                        Candidatar-se
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full min-w-[120px]"
                        onClick={() => handleViewJobDetails(job)}
                      >
                        Ver Detalhes
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              Nenhuma vaga encontrada com os filtros aplicados.
            </p>
          </div>
        )}
      </div>

      {/* Job Details Modal */}
      <JobDetailsModal
        isOpen={isJobDetailsModalOpen}
        onClose={() => setIsJobDetailsModalOpen(false)}
        job={selectedJob || {}}
        onApply={() => handleApplyToJob()}
        userType="freelancer"
      />
    </div>
  );
};

export default BrowseJobs;
