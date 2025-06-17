
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { LogIn, ArrowLeft } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabaseClient";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState<"freelancer" | "establishment">("freelancer");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast({ title: "Erro", description: error.message, variant: "destructive" });
      setIsLoading(false);
      return;
    }

    // Fetch profile to verify user type and get name
    let profileName = (data.user?.user_metadata as any)?.name || "";
    let profileType = (data.user?.user_metadata as any)?.user_type as
      | "freelancer"
      | "establishment"
      | undefined;
    if (data.user) {
      const { data: profile, error: profileError } = await supabase
        .from("users")
        .select("name, user_type")
        .eq("id", data.user.id)
        .maybeSingle();

      if (!profileError && profile) {
        profileName = profile.name || profileName;
        profileType = profile.user_type as "freelancer" | "establishment";
      }
    }

    if (profileType && profileType !== userType) {
      await supabase.auth.signOut();
      toast({
        title: "Erro",
        description: "Tipo de usuário incorreto.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    const userData = {
      id: data.user?.id || "",
      name: profileName,
      type: (profileType || userType) as "freelancer" | "establishment",
      email: data.user?.email || email,
    };

    login(userData);

    toast({
      title: "Login realizado com sucesso!",
      description: `Bem-vindo(a) de volta, ${userData.name}!`,
    });

    const destination =
      (profileType || userType) === "freelancer"
        ? "/freelancer-dashboard"
        : "/establishment-dashboard";
    navigate(destination);

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
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
            <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <LogIn className="w-6 h-6 text-blue-600" />
            </div>
            <CardTitle className="text-2xl font-bold">Entrar na sua conta</CardTitle>
            <CardDescription>
              Acesse sua conta FreelanceConnect
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="userType">Tipo de usuário</Label>
                <Select value={userType} onValueChange={(value) => setUserType(value as "freelancer" | "establishment")}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="freelancer">Freelancer</SelectItem>
                    <SelectItem value="establishment">Estabelecimento</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="flex items-center justify-between">
                <Link
                  to="/forgot-password"
                  className="text-sm text-blue-600 hover:text-blue-500"
                >
                  Esqueceu sua senha?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? "Entrando..." : "Entrar"}
              </Button>

              <div className="text-center text-sm">
                <span className="text-gray-600">Não tem uma conta? </span>
                <Link
                  to="/register"
                  className="text-blue-600 hover:text-blue-500 font-medium"
                >
                  Cadastre-se aqui
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
 
export default Login;
