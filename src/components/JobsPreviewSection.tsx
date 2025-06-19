import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Clock, DollarSign } from "lucide-react";

interface Job {
  id: number;
  title: string;
  establishment: string;
  location: string;
  date: string;
  time: string;
  payment: string;
  type: string;
  urgent?: boolean;
}

const initialJobs: Job[] = [
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
  },
];

const JobsPreviewSection = () => {
  const [jobs] = useState<Job[]>(initialJobs);
  const navigate = useNavigate();

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 via-purple-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Vagas Disponíveis</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Confira algumas oportunidades recentes para freelancers
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {jobs.map(job => (
            <Card key={job.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col h-full justify-between">
                  <div>
                    <div className="flex items-center mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 mr-2">
                        {job.title}
                      </h3>
                      {job.urgent && <Badge variant="destructive">Urgente</Badge>}
                    </div>
                    <p className="text-gray-600 mb-2">{job.establishment}</p>
                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
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
                      <div className="flex items-center">
                        <DollarSign className="w-4 h-4 mr-1" />
                        {job.payment}
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <Button
                      className="w-full"
                      onClick={() => navigate('/browse-jobs')}
                    >
                      Ver Detalhes
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-10">
          <Button onClick={() => navigate('/browse-jobs')}>Ver todas as vagas</Button>
        </div>
      </div>
    </section>
  );
};

export default JobsPreviewSection;
