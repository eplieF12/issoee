
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator 
} from "@/components/ui/dropdown-menu";
import { Menu, X, User, LogOut, MessageCircle, Bell, Briefcase, Users } from "lucide-react";
import NotificationCenter from "./NotificationCenter";
import { useMessages } from "@/contexts/MessagesContext";
import { useAuth } from "@/contexts/AuthContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { getUnreadCount } = useMessages();

  const unreadMessages = 0; // Forçar para 0 para ocultar alertas

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleMessages = () => {
    navigate("/messages");
  };

  const navigationItems = user ? [
    { name: "Início", href: "/" },
    { name: "Vagas", href: "/browse-jobs" },
    { name: "Freelancers", href: "/freelancers" },
    { 
      name: "Mensagens", 
      href: "/messages",
      badge: undefined // Remover badge
    },
    ...(user.type === "freelancer" ? [{ name: "Meu Dashboard", href: "/freelancer-dashboard" }] : []),
    ...(user.type === "establishment" ? [{ name: "Meu Dashboard", href: "/establishment-dashboard" }] : []),
    ...(user.type === "admin" ? [{ name: "Admin", href: "/admin-dashboard" }] : []),
  ] : [
    { name: "Início", href: "/" },
    { name: "Como Funciona", href: "/how-it-works" },
    { name: "Vagas", href: "/browse-jobs" },
    { name: "Freelancers", href: "/freelancers" },
  ];

  return (
    <header className="fixed w-full top-0 z-50 bg-purple-700 shadow-sm border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <button
              onClick={() => navigate("/")}
              className="flex items-center text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors"
            >
              <img src="/logo.png" alt="Logo" className="h-26 w-24 mr-4" />
              {user && <span className="text-white font-semibold">{user.name}</span>}
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <button
                key={item.name}
                onClick={() => navigate(item.href)}
                className={`relative text-gray-700 hover:text-blue-600 transition-colors font-medium ${
                  location.pathname === item.href ? "text-blue-600" : ""
                }`}
              >
                {item.name}
                {item.badge && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                  >
                    {item.badge}
                  </Badge>
                )}
              </button>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleMessages}
                  className="relative"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Mensagens
                  {unreadMessages > 0 && (
                    <Badge 
                      variant="destructive" 
                      className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                    >
                      {unreadMessages}
                    </Badge>
                  )}
                </Button>
                <NotificationCenter />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuItem onClick={() => navigate("/profile")}>
                      <User className="mr-2 h-4 w-4" />
                      Perfil
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleMessages}>
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Mensagens
                      {unreadMessages > 0 && (
                        <Badge variant="destructive" className="ml-auto h-5 w-5 flex items-center justify-center p-0 text-xs">
                          {unreadMessages}
                        </Badge>
                      )}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Sair
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button variant="outline" onClick={handleLogin}>
                  Entrar
                </Button>
                <Button onClick={() => navigate("/register")}>
                  Cadastrar
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t">
              {navigationItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    navigate(item.href);
                    setIsMenuOpen(false);
                  }}
                  className={`relative block px-3 py-2 text-base font-medium transition-colors w-full text-left ${
                    location.pathname === item.href
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  }`}
                >
                  {item.name}
                  {item.badge && (
                    <Badge 
                      variant="destructive" 
                      className="absolute top-2 right-3 h-5 w-5 flex items-center justify-center p-0 text-xs"
                    >
                      {item.badge}
                    </Badge>
                  )}
                </button>
              ))}
              
              {/* Mobile Actions */}
              <div className="border-t pt-4 space-y-2">
                {user ? (
                  <>
                    <Button
                      variant="outline"
                      className="w-full justify-start relative"
                      onClick={() => {
                        handleMessages();
                        setIsMenuOpen(false);
                      }}
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Mensagens
                      {unreadMessages > 0 && (
                        <Badge 
                          variant="destructive" 
                          className="ml-auto h-5 w-5 flex items-center justify-center p-0 text-xs"
                        >
                          {unreadMessages}
                        </Badge>
                      )}
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => {
                        navigate("/profile");
                        setIsMenuOpen(false);
                      }}
                    >
                      <User className="w-4 h-4 mr-2" />
                      Perfil
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sair
                    </Button>
                  </>
                ) : (
                  <>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => {
                        handleLogin();
                        setIsMenuOpen(false);
                      }}
                    >
                      Entrar
                    </Button>
                    <Button 
                      className="w-full"
                      onClick={() => {
                        navigate("/register");
                        setIsMenuOpen(false);
                      }}
                    >
                      Cadastrar
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
