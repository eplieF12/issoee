
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { UserPlus, ArrowLeft } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

const Register = () => {
  const [userType, setUserType] = useState<"freelancer" | "establishment">("freelancer");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    city: "",
    category: "",
    description: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Erro",
        description: "As senhas não coincidem.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    const { data: signUpData, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          name: formData.name,
          phone: formData.phone,
          city: formData.city,
          category: formData.category,
          description: formData.description,
          user_type: userType,
        },
      },
    });

    if (error) {
      toast({ title: "Erro", description: error.message, variant: "destructive" });
      setIsLoading(false);
      return;
    }

    if (signUpData.user) {
      const { error: insertError } = await supabase.from("profiles").insert({
        id: signUpData.user.id,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        city: formData.city,
        category: formData.category,
        description: formData.description,
        user_type: userType,
      });

      if (insertError) {
        toast({
          title: "Erro ao salvar perfil",
          description: insertError.message,
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }
    }

    toast({
      title: "Conta criada com sucesso!",
      description: `Bem-vindo(a) à FreelanceConnect, ${formData.name}!`,
    });

    navigate("/login");
    setIsLoading(false);
  };

  const categories = [
    "Garçom",
    "Atendente", 
    "Promoter",
    "Barman",
    "Auxiliar de Eventos",
    "Cozinheiro",
    "Recepcionista",
    "Segurança"
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar ao início
        </Button>
        
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <UserPlus className="w-6 h-6 text-green-600" />
            </div>
            <CardTitle className="text-2xl font-bold">Criar conta</CardTitle>
            <CardDescription>
              Junte-se à FreelanceConnect hoje mesmo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <Label htmlFor="userType">Tipo de conta</Label>
                <Select value={userType} onValueChange={(value) => setUserType(value as "freelancer" | "establishment")}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="freelancer">Sou Freelancer</SelectItem>
                    <SelectItem value="establishment">Sou Estabelecimento</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="name">
                  {userType === "freelancer" ? "Nome completo" : "Nome do estabelecimento"}
                </Label>
                <Input
                  id="name"
                  placeholder={userType === "freelancer" ? "João Silva" : "Restaurante Exemplo"}
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="phone">Telefone</Label>
                <Input
                  id="phone"
                  placeholder="(11) 99999-9999"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="city">Cidade</Label>
                <Input
                  id="city"
                  placeholder="São Paulo, SP"
                  value={formData.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  required
                />
              </div>

              {userType === "freelancer" && (
                <div>
                  <Label htmlFor="category">Categoria</Label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione sua área" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div>
                <Label htmlFor="description">
                  {userType === "freelancer" ? "Descrição profissional" : "Descrição do estabelecimento"}
                </Label>
                <Textarea
                  id="description"
                  placeholder={userType === "freelancer" 
                    ? "Conte um pouco sobre sua experiência..."
                    : "Descreva seu estabelecimento..."
                  }
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="confirmPassword">Confirmar senha</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? "Criando conta..." : "Criar conta"}
              </Button>

              <div className="text-center text-sm">
                <span className="text-gray-600">Já tem uma conta? </span>
                <Link
                  to="/login"
                  className="text-blue-600 hover:text-blue-500 font-medium"
                >
                  Entre aqui
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register;
