export default function Reembolso() {
  return (
    <div className="container py-12 md:py-16 max-w-3xl">
      <h1 className="font-display font-black text-4xl md:text-5xl mb-3">
        Política de <span className="gradient-text-warm">reembolso</span>
      </h1>
      <p className="text-muted-foreground mb-10">
        Transparência total para você comprar com confiança.
      </p>

      <div className="glass-card rounded-3xl p-7 md:p-10 space-y-7 text-sm md:text-base text-muted-foreground">
        <section>
          <h2 className="font-display font-bold text-xl text-foreground mb-2">Condições válidas</h2>
          <p>
            O reembolso integral é garantido caso o item não seja entregue por motivo
            atribuível à Hardy Store no prazo combinado.
          </p>
        </section>

        <section>
          <h2 className="font-display font-bold text-xl text-foreground mb-2">Prazos</h2>
          <p>
            Solicitações de reembolso devem ser feitas em até 7 dias após o pagamento. O
            estorno é realizado em até 5 dias úteis pelo mesmo método de pagamento utilizado.
          </p>
        </section>

        <section>
          <h2 className="font-display font-bold text-xl text-foreground mb-2">Situações elegíveis</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Item indisponível após o pagamento.</li>
            <li>Atraso superior a 72h sem justificativa.</li>
            <li>Erro de cadastro do produto por parte da loja.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-display font-bold text-xl text-foreground mb-2">Não elegível</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Arrependimento após a entrega do item.</li>
            <li>Erro do cliente ao informar o nome de usuário Roblox.</li>
            <li>Item já entregue e posteriormente perdido em trade pelo próprio cliente.</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
