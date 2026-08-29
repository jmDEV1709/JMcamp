export default function PlayerAvatar({
  player,
  size = "md",
}) {
  const sizes = {
    sm: "h-9 w-9 text-xs rounded-xl",
    md: "h-11 w-11 text-sm rounded-2xl",
    lg: "h-16 w-16 text-lg rounded-2xl",
  };

  return (
    <div
      className={`
        ${sizes[size]}
        grid shrink-0 place-items-center
        bg-gradient-to-br ${player.color}
        font-black text-white shadow-lg
      `}
    >
      {player.nickname}
    </div>
  );
}
