"use client";

interface GameHUDProps {
  score: number;
  misses: number;
  maxMisses: number;
  timeleft: number;
}

export  function GameHUD({
  score,
  misses,
  maxMisses,
  timeleft,
}: GameHUDProps) {
  return (
    <section className="grid grid-cols-3 gap-3 text-center text-xs sm:text-sm">
      <div className="rounded-xl border border-slate-800 bg-slate-900/70 px-3 py-2">
        <div className="text-slate-900">Score</div>
        <div className="text-lf font-semibold">{score}</div>
      </div>
      <div className="rounded-xl border boroder-slate-800 bg-slate-900/70 px-3 py-2">
        <div className="text-slate-900">Fehler</div>
        <div className="text-lg font-semibold">
          {misses} / {maxMisses}
        </div>
      </div>
      <div className="rounded-xl border boroder-slate-800 bg-slate-900/70 px-3 py-2">
        <div className="text-slate-900">Zeit</div>
        <div className="text-lg font-semibold">{timeleft}s</div>
      </div>
    </section>
  );
}
