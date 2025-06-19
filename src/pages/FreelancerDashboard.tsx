import { useState } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Clock, Star, DollarSign, CreditCard, Smartphone, Shield } from "lucide-react";
import JobDetailsModal from "@/components/modals/JobDetailsModal";
import PaymentModal from "@/components/modals/PaymentModal";
import { useToast } from "@/hooks/use-toast";
import { useMessages } from "@/contexts/MessagesContext";

const FreelancerDashboard = () => {
  const [activeTab, setActiveTab] = useState("vagas");
  const [isJobDetailsModalOpen, setIsJobDetailsModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const { toast } = useToast();
  const { sendMessage } = useMessages();

  // Informações do freelancer serão carregadas do backend futuramente
  const currentFreelancer = { id: 1, name: "" };

  const [freelancerPixKey, setFreelancerPixKey] = useState("");
  const [earnings, setEarnings] = useState<any[]>([]);

  const [availableJobs, setAvailableJobs] = useState<any[]>([]);

  const [myJobs, setMyJobs] = useState<any[]>([]);

  const [stats, setStats] = useState({
    monthlyJobs: 0,
    monthlyEarnings: 0,
    averageRating: 0,
    nextJob: ""
  });

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
      description: `Você se candidatou para ${jobToApply.title}. O estabelecimento foi notificado.`,
    });

    if (isJobDetailsModalOpen) {
      setIsJobDetailsModalOpen(false);
    }
  };

  const handleViewMyJobDetails = (job: any) => {
    setSelectedJob(job);
    setIsJobDetailsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-white">
      <Header />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8">
        {/* Header Dashboard */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Olá! 👋
          </h1>
          <p className="text-gray-600">Gerencie suas oportunidades e acompanhe seu progresso</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Trabalhos este mês</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.monthlyJobs}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Ganhos este mês</p>
                  <p className="text-2xl font-bold text-gray-900">R$ {stats.monthlyEarnings}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mr-4">
                  <Star className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Avaliação média</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.averageRating}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                  <Clock className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Próximo trabalho</p>
                  <p className="text-lg font-bold text-gray-900">{stats.nextJob}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
            <button
              onClick={() => setActiveTab("vagas")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === "vagas" 
                  ? "bg-white text-blue-600 shadow-sm" 
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Vagas Disponíveis
            </button>
            <button
              onClick={() => setActiveTab("meus")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === "meus" 
                  ? "bg-white text-blue-600 shadow-sm" 
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Meus Trabalhos
            </button>
            <button
              onClick={() => setActiveTab("pagamentos")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === "pagamentos" 
                  ? "bg-white text-blue-600 shadow-sm" 
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Pagamentos
            </button>
          </div>
        </div>

        {/* Content */}
        {activeTab === "vagas" && (
          <div className="space-y-4">
            {availableJobs.map((job) => (
              <Card key={job.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{job.title}</h3>
                      <p className="text-gray-600 mb-2">{job.establishment}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {job.location}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {job.date}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {job.time}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-green-600 mb-2">{job.payment}</p>
                      {job.urgent && (
                        <Badge variant="destructive" className="mb-2">Urgente</Badge>
                      )}
                      <div className="space-y-2">
                        <Button 
                          size="sm" 
                          className="w-full"
                          onClick={() => handleApplyToJob(job)}
                        >
                          Candidatar-se
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="w-full"
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

            {availableJobs.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  Não há vagas disponíveis no momento. Continue verificando para novas oportunidades!
                </p>
              </div>
            )}
          </div>
        )}

        {activeTab === "meus" && (
          <div className="space-y-4">
            {myJobs.map((job) => (
              <Card key={job.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{job.title}</h3>
                      <p className="text-gray-600 mb-2">{job.establishment}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {job.date}
                        </div>
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          Confirmado
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-green-600 mb-2">{job.payment}</p>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleViewMyJobDetails(job)}
                      >
                        Ver Detalhes
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {activeTab === "pagamentos" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="w-5 h-5 mr-2" />
                  Configurações PIX
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Sua chave PIX cadastrada:</p>
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 p-3 bg-gray-50 rounded-lg">
                        <p className="font-mono">{freelancerPixKey}</p>
                      </div>
                      <Button 
                        variant="outline"
                        onClick={() => setIsPaymentModalOpen(true)}
                      >
                        Editar
                      </Button>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">Como funciona o pagamento:</h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Receba seus pagamentos no mesmo dia via PIX</li>
                      <li>• A plataforma retém 10% como taxa de serviço</li>
                      <li>• Você recebe 90% do valor acordado</li>
                      <li>• Pagamentos são processados automaticamente após confirmação</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Histórico de Ganhos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {earnings.map((earning) => (
                    <div key={earning.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-900">{earning.jobTitle}</h3>
                          <p className="text-sm text-gray-600">{earning.establishment}</p>
                          <p className="text-sm text-gray-500">{earning.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-green-600">{earning.amount}</p>
                          <p className="text-xs text-gray-500">Taxa: {earning.platformFee}</p>
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            Recebido
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
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

      {/* Payment Modal */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        type="freelancer"
        pixKey={freelancerPixKey}
      />
    </div>
  );
};

export default FreelancerDashboard;
