
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Star, MapPin, Calendar, Edit, Camera, Award } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "@/contexts/AuthContext";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true);
  const { toast } = useToast();
  const { user, login } = useAuth();
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    description: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      const { data, error } = await supabase
        .from("users")
        .select("name, email, phone, city, description")
        .eq("id", user.id)
        .maybeSingle();

      if (!error && data) {
        setProfile({
          name: data.name || "",
          email: data.email || "",
          phone: data.phone || "",
          city: data.city || "",
          description: data.description || "",
        });
      }
    };

    fetchProfile();
  }, [user]);

  const userStats = {
    totalJobs: 0,
    rating: 0,
    completionRate: 0,
    earnings: 0
  };

  const recentJobs: any[] = [];

  const handleSaveProfile = async () => {
    if (!user) return;

    const { error } = await supabase
      .from("users")
      .upsert({
        id: user.id,
        name: profile.name,
        email: profile.email,
        phone: profile.phone,
        city: profile.city,
        description: profile.description,
      });

    if (error) {
      toast({ title: "Erro", description: error.message, variant: "destructive" });
      return;
    }

    login({ ...user, name: profile.name, email: profile.email });

    toast({
      title: "Perfil atualizado!",
      description: "Suas informações foram salvas com sucesso.",
    });
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="relative mb-4">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover mx-auto border-4 border-white shadow-md"
                  />
                  <button className="absolute bottom-0 right-1/2 transform translate-x-6 translate-y-2 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors">
                    <Camera className="w-4 h-4" />
                  </button>
                </div>
                
                <h2 className="text-xl font-bold text-gray-900 mb-1">Novo Usuário</h2>
                <p className="text-gray-600 mb-2">Profissão</p>
                <div className="flex items-center justify-center mb-4">
                  <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                  <span className="font-medium">{userStats.rating}</span>
                  <span className="text-gray-500 text-sm ml-1">({userStats.totalJobs} avaliações)</span>
                </div>
                
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <span className="text-sm text-gray-600">Disponível para trabalhar</span>
                  <Switch checked={isAvailable} onCheckedChange={setIsAvailable} />
                </div>

                <Badge variant="secondary" className="bg-green-100 text-green-800 mb-4">
                  ✓ Perfil Verificado
                </Badge>

                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  <Edit className="w-4 h-4 mr-2" />
                  {isEditing ? "Cancelar" : "Editar Perfil"}
                </Button>
              </CardContent>
            </Card>

            {/* Stats Card */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Estatísticas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Trabalhos realizados</span>
                    <span className="font-semibold">{userStats.totalJobs}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Taxa de conclusão</span>
                    <span className="font-semibold text-green-600">{userStats.completionRate}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Ganhos totais</span>
                    <span className="font-semibold text-blue-600">R$ {userStats.earnings}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle>Informações Pessoais</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
                    <Input
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <Input
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
                    <Input
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Localização</label>
                    <Input
                      value={profile.city}
                      onChange={(e) => setProfile({ ...profile, city: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sobre mim</label>
                  <Textarea
                    value={profile.description}
                    onChange={(e) => setProfile({ ...profile, description: e.target.value })}
                    disabled={!isEditing}
                    rows={3}
                  />
                </div>

                {isEditing && (
                  <div className="flex space-x-2">
                    <Button className="bg-gradient-primary text-white" onClick={handleSaveProfile}>Salvar Alterações</Button>
                    <Button variant="outline" onClick={() => setIsEditing(false)}>Cancelar</Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Experience & Skills */}
            <Card>
              <CardHeader>
                <CardTitle>Experiência e Habilidades</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Áreas de atuação</label>
                    <div className="flex flex-wrap gap-2" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Experiência</label>
                    <Input defaultValue="" disabled={!isEditing} />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Certificações</label>
                  <div className="space-y-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Jobs */}
            <Card>
              <CardHeader>
                <CardTitle>Trabalhos Recentes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentJobs.map((job) => (
                    <div key={job.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium text-gray-900">{job.title}</h4>
                          <p className="text-gray-600">{job.establishment}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-green-600">{job.earnings}</p>
                          <div className="flex items-center">
                            {[...Array(job.rating)].map((_, i) => (
                              <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="w-4 h-4 mr-1" />
                        {job.date}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
