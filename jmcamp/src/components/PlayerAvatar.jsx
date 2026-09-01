export default function PlayerAvatar({
  player,
  size = "md",
}) {
  const sizes = {
    sm: "h-9 w-9 rounded-xl text-xs",
    md: "h-11 w-11 rounded-2xl text-sm",
    lg: "h-16 w-16 rounded-2xl text-lg",
    xl: "h-24 w-24 rounded-3xl text-2xl",
  };

  const selectedSize = sizes[size] || sizes.md;

  const fallbackColor =
    player?.color ||
    "from-blue-600 to-violet-600";

  const nickname = player?.nickname || "JM";

  if (player?.avatarUrl) {
    return (
      <img
        src={ player.avatarUrl }
        alt={`Avatar de ${player?.name || "jogador"}`}
        className={`
          ${selectedSize}
          object-cover
        `}
      />
    );
  }

  return (
    <div
      className={`
        ${selectedSize}
        grid shrink-0 place-items-center
        bg-gradient-to-br ${fallbackColor}
        font-black text-white shadow-lg
      `}
      aria-label={`Avatar de ${player?.name || "jogador"}`}
    >
      {nickname}
    </div>
  );
}