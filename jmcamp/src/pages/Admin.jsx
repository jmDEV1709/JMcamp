import {
  Gamepad2,
  Plus,
  Settings,
  Trophy,
  Users,
} from "lucide-react";
import PageHeader from "../components/PageHeader";

const options = [
  {
    title: "Cadastrar jogador",
    description: "Adicionar participante ao campeonato.",
    icon: Users,
  },
  {
    title: "Registrar resultado",
    description: "Informar o placar de uma partida.",
    icon: Gamepad2,
  },
  {
    title: "Criar rodada",
    description: "Montar os próximos confrontos.",
    icon: Plus,
  },
  {
    title: "Gerenciar campeonato",
    description: "Alterar nome, formato e situação.",
    icon: Trophy,
  },
];

export default function Admin() {
  return (
    <div className="space-y-7">
      <PageHeader
        title="Administração"
        description="Central de gerenciamento do JMcamp."
      >
        <span className="inline-flex items-center gap-2 rounded-xl bg-amber-500/10 px-4 py-2 text-xs font-bold text-amber-400">
          <Settings size={15} />
          Modo demonstração
        </span>
      </PageHeader>

      <section className="grid gap-4 sm:grid-cols-2">
        {options.map((option) => {
          const Icon = option.icon;

          return (
            <button
              key={option.title}
              className="group rounded-2xl border border-slate-800 bg-slate-900/70 p-5 text-left transition duration-300 hover:-translate-y-1 hover:border-blue-500/40"
            >
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-blue-500/10 text-blue-400">
                <Icon size={21} />
              </div>

              <h2 className="mt-5 font-black text-white group-hover:text-blue-400">
                {option.title}
              </h2>

              <p className="mt-2 text-sm text-slate-400">
                {option.description}
              </p>
            </button>
          );
        })}
      </section>

      <div className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-5">
        <strong className="text-blue-400">
          Próxima integração
        </strong>
        <p className="mt-2 text-sm leading-6 text-slate-400">
          Os botões ainda são visuais. Na próxima parte,
          cada formulário será ligado ao Supabase com
          autenticação de administrador.
        </p>
      </div>
    </div>
  );
}