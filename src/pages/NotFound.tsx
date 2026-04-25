import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home as HomeIcon } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="text-center space-y-5 px-4">
        <div className="font-display font-black text-8xl md:text-9xl gradient-text">404</div>
        <h1 className="font-display font-bold text-2xl md:text-3xl">Página não encontrada</h1>
        <p className="text-muted-foreground max-w-sm mx-auto">
          O item que você procura pode ter sido movido ou esgotado. Volte para o início e
          continue explorando.
        </p>
        <Button asChild variant="hero" size="lg">
          <Link to="/"><HomeIcon className="h-4 w-4" /> Voltar ao início</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
