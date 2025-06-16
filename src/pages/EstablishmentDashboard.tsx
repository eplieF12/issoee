import { useState } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Clock, Star, DollarSign, Users, Briefcase, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import CreateJobModal from "@/components/modals/CreateJobModal";
import ApplicantsModal from "@/components/modals/ApplicantsModal";

const EstablishmentDashboard = () => {
  const [activeTab, setActiveTab] = useState("vagas");
  const [isCreateJobModalOpen, setIsCreateJobModalOpen] = useState(false);
  const [isApplicantsModalOpen, setIsApplicantsModalOpen] = useState(false);
  const [selectedJobTitle, setSelectedJobTitle] = useState("");
  const [selectedApplicants, setSelectedApplicants] = useState<any[]>([]);
  const { toast } = useToast();

  const [stats, setStats] = useState({
    activeJobs: 0,
    monthlySpent: 0,
    avgRating: 0,
    totalHires: 0
  });

  const [myJobs, setMyJobs] = useState<any[]>([]);

  const [applications, setApplications] = useState<any[]>([]);

  const handleCreateJob = (jobData: any) => {
    setMyJobs(prev => [jobData, ...prev]);
    setStats(prev => ({ ...prev, activeJobs: prev.activeJobs + 1 }));
  };

  const handleViewApplications = (jobId: number) => {
    const job = myJobs.find((j) => j.id === jobId);
    setSelectedJobTitle(job ? job.title : "");
    setSelectedApplicants(applications.filter((app) => app.jobId === jobId));
    setIsApplicantsModalOpen(true);
  };

  const handleApproveApplication = (appId: number) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === appId ? { ...app, status: "approved" } : app
      )
    );
    setSelectedApplicants((prev) =>
      prev.map((app) =>
        app.id === appId ? { ...app, status: "approved" } : app
      )
    );
    toast({
      title: "Candidatura aprovada!",
      description: "O freelancer foi notificado.",
    });
  };

  const handleRejectApplication = (appId: number) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === appId ? { ...app, status: "rejected" } : app
      )
    );
    setSelectedApplicants((prev) =>
      prev.map((app) =>
        app.id === appId ? { ...app, status: "rejected" } : app
      )
    );
    toast({
      title: "Candidatura rejeitada",
      description: "O freelancer foi notificado.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Dashboard */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Dashboard do Estabelecimento
          </h1>
          <p className="text-gray-600">Gerencie suas vagas e contratações</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <Briefcase className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Vagas ativas</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.activeJobs}</p>
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
                  <p className="text-sm text-gray-600">Gasto este mês</p>
                  <p className="text-2xl font-bold text-gray-900">R$ {stats.monthlySpent}</p>
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
                  <p className="text-2xl font-bold text-gray-900">{stats.avgRating}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total contratações</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalHires}</p>
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
              Minhas Vagas
            </button>
            <button
              onClick={() => setActiveTab("candidaturas")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === "candidaturas" 
                  ? "bg-white text-blue-600 shadow-sm" 
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Candidaturas
            </button>
            <button
              onClick={() => setActiveTab("contratados")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === "contratados" 
                  ? "bg-white text-blue-600 shadow-sm" 
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Contratados
            </button>
          </div>
        </div>

        {/* Content */}
        {activeTab === "vagas" && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Suas Vagas Publicadas</h2>
              <Button onClick={() => setIsCreateJobModalOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Nova Vaga
              </Button>
            </div>
            
            {myJobs.map((job) => (
              <Card key={job.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{job.title}</h3>
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
                      <Badge 
                        variant={job.status === "active" ? "default" : "secondary"}
                        className="mb-2"
                      >
                        {job.status === "active" ? "Ativa" : "Preenchida"}
                      </Badge>
                      <div className="space-y-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="w-full"
                          onClick={() => handleViewApplications(job.id)}
                        >
                          Ver Candidaturas ({job.applicants})
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {activeTab === "candidaturas" && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Candidaturas Recebidas</h2>
            
            {applications.map((app) => (
              <Card key={app.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{app.freelancerName}</h3>
                      <p className="text-gray-600 mb-2">{app.jobTitle}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 mr-1 text-yellow-500" />
                          {app.rating}
                        </div>
                        <span>Experiência: {app.experience}</span>
                      </div>
                    </div>
                    <div className="text-right space-y-2">
                      {app.status === "pending" ? (
                        <>
                          <Button 
                            size="sm" 
                            onClick={() => handleApproveApplication(app.id)}
                          >
                            Aprovar
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="w-full"
                          >
                            Ver Perfil
                          </Button>
                        </>
                      ) : (
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          Aprovado
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {activeTab === "contratados" && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              Funcionalidade em desenvolvimento
            </p>
          </div>
        )}
      </div>

      {/* Create Job Modal */}
      <CreateJobModal
        isOpen={isCreateJobModalOpen}
        onClose={() => setIsCreateJobModalOpen(false)}
        onSubmit={handleCreateJob}
      />

      {/* Applicants Modal */}
      <ApplicantsModal
        isOpen={isApplicantsModalOpen}
        onClose={() => setIsApplicantsModalOpen(false)}
        jobTitle={selectedJobTitle}
        applicants={selectedApplicants}
        onApprove={handleApproveApplication}
        onReject={handleRejectApplication}
      />
    </div>
  );
};

export default EstablishmentDashboard;
