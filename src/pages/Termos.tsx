export default function Termos() {
  return (
    <div className="container py-12 md:py-16 max-w-3xl">
      <h1 className="font-display font-black text-4xl md:text-5xl mb-3">
        Termos de <span className="gradient-text">compra</span>
      </h1>
      <p className="text-muted-foreground mb-10">
        Última atualização: {new Date().toLocaleDateString("pt-BR")}
      </p>

      <div className="glass-card rounded-3xl p-7 md:p-10 space-y-7 text-sm md:text-base text-muted-foreground">
        <section>
          <h2 className="font-display font-bold text-xl text-foreground mb-2">1. Entrega dos itens</h2>
          <p>
            Todos os itens são entregues dentro do jogo Murder Mystery 2 (Roblox), via trade
            direto com a sua conta. O prazo padrão de entrega é de até 24h após a confirmação
            do pagamento, podendo ser muito mais rápido em horários comerciais.
          </p>
        </section>

        <section>
          <h2 className="font-display font-bold text-xl text-foreground mb-2">2. Responsabilidade do cliente</h2>
          <p>
            É responsabilidade do cliente fornecer o nome de usuário correto da conta Roblox,
            estar disponível para receber o trade no horário combinado e garantir que sua
            conta tem as condições necessárias (ex.: 13+ dias para trade).
          </p>
        </section>

        <section>
          <h2 className="font-display font-bold text-xl text-foreground mb-2">3. Prazo de envio</h2>
          <p>
            Em casos excepcionais (problemas no Roblox, instabilidade da plataforma) o prazo
            pode se estender. Sempre comunicaremos previamente qualquer atraso.
          </p>
        </section>

        <section>
          <h2 className="font-display font-bold text-xl text-foreground mb-2">4. Regras gerais</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Os preços são fixos e em Reais (BRL).</li>
            <li>Promoções têm tempo limitado e estoque limitado.</li>
            <li>Não nos responsabilizamos por trocas posteriores feitas pelo cliente.</li>
            <li>Reservamo-nos o direito de cancelar pedidos suspeitos ou fraudulentos.</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
