export default function PageHeader({
  eyebrow = "JMcamp",
  title,
  description,
  children,
}) {
  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-xs font-black uppercase tracking-[0.28em] text-blue-400">
          {eyebrow}
        </p>

        <h1 className="mt-2 text-2xl font-black tracking-tight text-white sm:text-3xl">
          {title}
        </h1>

        {description && (
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
            {description}
          </p>
        )}
      </div>

      {children}
    </header>
  );
}