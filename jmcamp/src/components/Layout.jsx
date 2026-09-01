import {
  Gamepad2,
  Home,
  Medal,
  Menu,
  Settings,
  Shield,
  Trophy,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

const navigation = [
  { to: "/", label: "Início", icon: Home },
  {
    to: "/campeonato",
    label: "Campeonato",
    icon: Trophy,
  },
  {
    to: "/jogadores",
    label: "Jogadores",
    icon: Users,
  },
  {
    to: "/partidas",
    label: "Partidas",
    icon: Gamepad2,
  },
  {
    to: "/classificacao",
    label: "Tabela",
    icon: Medal,
  },
  {
    to: "/chaveamento",
    label: "Mata-mata",
    icon: Shield,
  },
  {
    to: "/ranking-x1",
    label: "Ranking X1",
    icon: Medal,
  },
  
];

function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-blue-600 to-violet-600 font-black text-white shadow-lg shadow-blue-950/40">
        JM
      </div>

      <div>
        <p className="text-lg font-black text-white">
          JM<span className="text-blue-400">camp</span>
        </p>
        <p className="text-[11px] text-slate-500">
          EFootball League
        </p>
      </div>
    </div>
  );
}

function MenuLink({ item, onClick }) {
  const Icon = item.icon;

  return (
    <NavLink
      to={item.to}
      end={item.to === "/"}
      onClick={onClick}
      className={({ isActive }) =>
        `flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition ${
          isActive
            ? "bg-blue-600 text-white shadow-lg shadow-blue-950/40"
            : "text-slate-400 hover:bg-slate-800 hover:text-white"
        }`
      }
    >
      <Icon size={19} />
      {item.label}
    </NavLink>
  );
}

export default function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);

  return (
    <div className="min-h-screen bg-[#070b14] text-white">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-slate-800 bg-[#090e19] p-5 lg:block">
        <Logo />

        <nav className="mt-10 space-y-1">
          {navigation.map((item) => (
            <MenuLink key={item.to} item={item} />
          ))}
        </nav>

        <NavLink
          to="/admin"
          className="absolute bottom-6 left-5 right-5 flex items-center gap-3 rounded-xl border border-slate-800 px-3 py-3 text-sm font-semibold text-slate-400 transition hover:border-blue-500/40 hover:text-white"
        >
          <Settings size={19} />
          Administração
        </NavLink>
      </aside>

      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        >
          <aside
            className="h-full w-[82%] max-w-80 border-r border-slate-800 bg-[#090e19] p-5"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <Logo />

              <button
                onClick={() => setMobileMenuOpen(false)}
                className="grid h-10 w-10 place-items-center rounded-xl bg-slate-800 text-slate-300"
                aria-label="Fechar menu"
              >
                <X size={20} />
              </button>
            </div>

            <nav className="mt-10 space-y-1">
              {navigation.map((item) => (
                <MenuLink
                  key={item.to}
                  item={item}
                  onClick={() =>
                    setMobileMenuOpen(false)
                  }
                />
              ))}

              <MenuLink
                item={{
                  to: "/admin",
                  label: "Administração",
                  icon: Settings,
                }}
                onClick={() => setMobileMenuOpen(false)}
              />
            </nav>
          </aside>
        </div>
      )}

      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-800 bg-[#070b14]/85 px-4 backdrop-blur-xl lg:hidden">
        <Logo />

        <button
          onClick={() => setMobileMenuOpen(true)}
          className="grid h-10 w-10 place-items-center rounded-xl bg-slate-800 text-white"
          aria-label="Abrir menu"
        >
          <Menu size={21} />
        </button>
      </header>

      <main className="min-h-screen lg:ml-64">
        <div className="mx-auto max-w-7xl p-4 pb-28 sm:p-6 lg:p-8 lg:pb-8">
          <Outlet />
        </div>
      </main>

      <nav className="fixed inset-x-3 bottom-3 z-40 grid grid-cols-5 rounded-2xl border border-slate-700 bg-slate-900/95 p-1.5 shadow-2xl backdrop-blur-xl lg:hidden">
        {navigation.slice(0, 5).map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                `flex min-w-0 flex-col items-center gap-1 rounded-xl py-2 text-[10px] font-bold transition ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-slate-500"
                }`
              }
            >
              <Icon size={18} />
              <span className="max-w-full truncate">
                {item.label}
              </span>
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
}