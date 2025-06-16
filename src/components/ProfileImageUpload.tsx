
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ProfileImageUploadProps {
  currentImage?: string;
  userName: string;
  onImageChange: (imageUrl: string) => void;
}

const ProfileImageUpload = ({ currentImage, userName, onImageChange }: ProfileImageUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Tipo de arquivo inválido",
        description: "Por favor, selecione apenas arquivos de imagem.",
        variant: "destructive"
      });
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Arquivo muito grande",
        description: "Por favor, selecione uma imagem menor que 5MB.",
        variant: "destructive"
      });
      return;
    }

    setIsUploading(true);

    // Simulate upload process
    const reader = new FileReader();
    reader.onload = (e) => {
      setTimeout(() => {
        const imageUrl = e.target?.result as string;
        onImageChange(imageUrl);
        setIsUploading(false);
        toast({
          title: "Foto atualizada!",
          description: "Sua foto de perfil foi atualizada com sucesso.",
        });
      }, 1000);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative">
        <Avatar className="w-24 h-24">
          <AvatarImage src={currentImage} alt={userName} />
          <AvatarFallback className="text-2xl">{userName.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="absolute -bottom-2 -right-2">
          <label htmlFor="profile-image" className="cursor-pointer">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors">
              <Camera className="w-4 h-4" />
            </div>
          </label>
        </div>
      </div>
      
      <input
        id="profile-image"
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
      
      <Button 
        variant="outline" 
        size="sm"
        onClick={() => document.getElementById('profile-image')?.click()}
        disabled={isUploading}
      >
        <Upload className="w-4 h-4 mr-2" />
        {isUploading ? "Enviando..." : "Alterar Foto"}
      </Button>
    </div>
  );
};

export default ProfileImageUpload;
