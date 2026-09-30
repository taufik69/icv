// Beams on the hero's 48px blueprint grid: each sits on a grid line (a multiple of 48px) and loops
// across it with a glowing head. Full class strings so Tailwind sees them; hidden for reduced motion.
const beams = [
  {
    axis: "x",
    at: "top-[192px]",
    run: "animate-[beam-x_9s_linear_infinite_both] [animation-delay:0.5s]",
  },
  {
    axis: "x",
    at: "top-[384px]",
    run: "animate-[beam-x_12s_linear_infinite_both] [animation-delay:4s]",
  },
  {
    axis: "x",
    at: "top-[528px]",
    run: "animate-[beam-x_10s_linear_infinite_both] [animation-delay:7s]",
  },
  {
    axis: "y",
    at: "left-[288px]",
    run: "animate-[beam-y_8s_linear_infinite_both] [animation-delay:2s]",
  },
  {
    axis: "y",
    at: "left-[672px]",
    run: "animate-[beam-y_11s_linear_infinite_both] [animation-delay:5.5s]",
  },
  {
    axis: "y",
    at: "left-[1056px]",
    run: "animate-[beam-y_9s_linear_infinite_both] [animation-delay:1s]",
  },
];

const shape = {
  x: "left-0 h-px w-28 bg-linear-to-r",
  y: "top-0 w-px h-28 bg-linear-to-b",
};
const head = {
  x: "top-1/2 right-0 translate-x-1/2 -translate-y-1/2",
  y: "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2",
};

export function GridBeams() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 @container-size motion-reduce:hidden"
    >
      {beams.map(({ axis, at, run }) => (
        <span
          key={axis + at}
          className={`absolute ${at} ${shape[axis]} from-transparent to-white/35 ${run}`}
        >
          <span
            className={`absolute ${head[axis]} size-1 rounded-full bg-white/60 shadow-[0_0_6px_1px_var(--color-white)] opacity-50`}
          />
        </span>
      ))}
    </div>
  );
}
