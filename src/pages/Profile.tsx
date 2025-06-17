
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Star,
  MapPin,
  Calendar,
  Edit,
  Briefcase,
  DollarSign,
  CheckCircle
} from "lucide-react";
import ProfileImageUpload from "@/components/ProfileImageUpload";
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
      .update({
        name: profile.name,
        email: profile.email,
        phone: profile.phone,
        city: profile.city,
        description: profile.description,
      })
      .eq("id", user.id);

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

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8">
        {/* Profile Header */}
        <Card className="overflow-hidden mb-8">
          <div className="relative">
            <div className="h-24 bg-gradient-to-r from-blue-600 to-purple-600" />
            <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 md:left-8 md:translate-x-0">
              <ProfileImageUpload
                currentImage="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
                userName={profile.name || "Usuário"}
                onImageChange={() => {}}
              />
            </div>
          </div>
          <CardContent className="pt-16 flex flex-col md:flex-row items-center justify-between">
            <div className="text-center md:text-left md:ml-36 flex-1">
              <h2 className="text-2xl font-bold text-gray-900">{profile.name || "Novo Usuário"}</h2>
              <p className="text-gray-600 flex items-center justify-center md:justify-start">
                <MapPin className="w-4 h-4 mr-1" />
                {profile.city || "Localização"}
              </p>
              <div className="flex items-center justify-center md:justify-start mt-2">
                <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                <span className="font-medium">{userStats.rating}</span>
                <span className="text-gray-500 text-sm ml-1">({userStats.totalJobs} avaliações)</span>
              </div>
            </div>

            <div className="mt-4 md:mt-0 flex items-center space-x-4">
              <span className="text-sm text-gray-600">Disponível para trabalhar</span>
              <Switch checked={isAvailable} onCheckedChange={setIsAvailable} />
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                <CheckCircle className="w-4 h-4 mr-1" /> Perfil Verificado
              </Badge>
              <Button variant="outline" onClick={() => setIsEditing(!isEditing)}>
                <Edit className="w-4 h-4 mr-2" />
                {isEditing ? "Cancelar" : "Editar"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                <Briefcase className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Trabalhos realizados</p>
                <p className="text-2xl font-bold text-gray-900">{userStats.totalJobs}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                <Star className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Taxa de conclusão</p>
                <p className="text-2xl font-bold text-gray-900">{userStats.completionRate}%</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 flex items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                <DollarSign className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Ganhos totais</p>
                <p className="text-2xl font-bold text-gray-900">R$ {userStats.earnings}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
                  {recentJobs.length > 0 ? (
                    recentJobs.map((job) => (
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
                    ))
                  ) : (
                    <p className="text-gray-600">Nenhum trabalho recente encontrado.</p>
                  )}
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
