import { Shield, Heart, Sparkles } from "lucide-react";

export default function Sobre() {
  return (
    <div className="container py-12 md:py-16 max-w-4xl">
      <h1 className="font-display font-black text-4xl md:text-5xl mb-3">
        Sobre a <span className="gradient-text">Hardy Store</span>
      </h1>
      <p className="text-lg text-muted-foreground mb-10">
        Construindo confiança na comunidade Murder Mystery 2.
      </p>

      <div className="space-y-5">
        <article className="glass-card rounded-3xl p-7">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-brand flex items-center justify-center"><Sparkles className="h-5 w-5 text-white" /></div>
            <h2 className="font-display font-bold text-xl">Nossa missão</h2>
          </div>
          <p className="text-muted-foreground">
            Tornar a compra de itens de MM2 simples, justa e segura para todos os jogadores.
            Acreditamos que cada player merece acesso aos melhores itens sem precisar pagar um
            preço abusivo ou correr risco de golpe.
          </p>
        </article>

        <article className="glass-card rounded-3xl p-7">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-warm flex items-center justify-center"><Shield className="h-5 w-5 text-white" /></div>
            <h2 className="font-display font-bold text-xl">Segurança nas negociações</h2>
          </div>
          <p className="text-muted-foreground">
            Toda transação é acompanhada do início ao fim por um membro da nossa equipe. Você
            só finaliza a compra após receber o item dentro do jogo. Sem stress, sem surpresa.
          </p>
        </article>

        <article className="glass-card rounded-3xl p-7">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-brand flex items-center justify-center"><Heart className="h-5 w-5 text-white" /></div>
            <h2 className="font-display font-bold text-xl">Compromisso com o cliente</h2>
          </div>
          <p className="text-muted-foreground">
            Respostas rápidas, suporte humanizado e um time apaixonado por MM2. Estamos aqui
            para te atender antes, durante e depois da sua compra.
          </p>
        </article>
      </div>
    </div>
  );
}
