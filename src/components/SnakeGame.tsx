import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

const GRID = 20;
const CELL = 14; // px

type Pos = { x: number; y: number };
type Dir = "up" | "down" | "left" | "right";

const DIRS: Record<Dir, Pos> = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
};

const OPPOSITE: Record<Dir, Dir> = { up: "down", down: "up", left: "right", right: "left" };

function randomFood(snake: Pos[]): Pos {
  while (true) {
    const f = { x: Math.floor(Math.random() * GRID), y: Math.floor(Math.random() * GRID) };
    if (!snake.some((s) => s.x === f.x && s.y === f.y)) return f;
  }
}

/** Mini-game de cobrinha — usado quando o usuário está offline. */
export function SnakeGame() {
  const [snake, setSnake] = useState<Pos[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Pos>({ x: 5, y: 5 });
  const [dir, setDir] = useState<Dir>("right");
  const [running, setRunning] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(() => Number(localStorage.getItem("hardy-snake-best") ?? 0));
  const dirRef = useRef(dir);
  dirRef.current = dir;

  // Keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      const next: Dir | null =
        k === "arrowup" || k === "w" ? "up" :
        k === "arrowdown" || k === "s" ? "down" :
        k === "arrowleft" || k === "a" ? "left" :
        k === "arrowright" || k === "d" ? "right" : null;
      if (next && next !== OPPOSITE[dirRef.current]) setDir(next);
      if (k === " " && !running && !gameOver) setRunning(true);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [running, gameOver]);

  // Tick
  useEffect(() => {
    if (!running || gameOver) return;
    const id = setInterval(() => {
      setSnake((prev) => {
        const head = prev[0];
        const d = DIRS[dirRef.current];
        const next: Pos = { x: head.x + d.x, y: head.y + d.y };
        // wall
        if (next.x < 0 || next.x >= GRID || next.y < 0 || next.y >= GRID) {
          setGameOver(true);
          setRunning(false);
          return prev;
        }
        // self
        if (prev.some((s) => s.x === next.x && s.y === next.y)) {
          setGameOver(true);
          setRunning(false);
          return prev;
        }
        const ate = next.x === food.x && next.y === food.y;
        const newSnake = [next, ...prev];
        if (!ate) newSnake.pop();
        else {
          setFood(randomFood(newSnake));
          setScore((s) => {
            const ns = s + 1;
            if (ns > best) {
              setBest(ns);
              localStorage.setItem("hardy-snake-best", String(ns));
            }
            return ns;
          });
        }
        return newSnake;
      });
    }, 110);
    return () => clearInterval(id);
  }, [running, gameOver, food, best]);

  const reset = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood(randomFood([{ x: 10, y: 10 }]));
    setDir("right");
    setScore(0);
    setGameOver(false);
    setRunning(true);
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex items-center gap-4 text-sm">
        <div className="px-3 py-1 rounded-full glass border border-brand-pink/30">
          <span className="text-muted-foreground">Pontos:</span>{" "}
          <span className="font-display font-black text-brand-pink">{score}</span>
        </div>
        <div className="px-3 py-1 rounded-full glass border border-brand-orange/30">
          <span className="text-muted-foreground">Recorde:</span>{" "}
          <span className="font-display font-black text-brand-orange">{best}</span>
        </div>
      </div>

      <div
        className="relative rounded-2xl bg-background/60 border border-border/40 p-2 shadow-elevated"
        style={{ width: GRID * CELL + 16, height: GRID * CELL + 16 }}
      >
        <div className="relative" style={{ width: GRID * CELL, height: GRID * CELL }}>
          {snake.map((s, i) => (
            <div
              key={i}
              className="absolute rounded-sm"
              style={{
                left: s.x * CELL,
                top: s.y * CELL,
                width: CELL - 2,
                height: CELL - 2,
                background: i === 0 ? "hsl(var(--pink))" : `hsl(var(--purple) / ${0.85 - i * 0.015})`,
                boxShadow: i === 0 ? "0 0 8px hsl(var(--pink) / 0.7)" : undefined,
              }}
            />
          ))}
          <div
            className="absolute rounded-full animate-glow-pulse"
            style={{
              left: food.x * CELL,
              top: food.y * CELL,
              width: CELL - 2,
              height: CELL - 2,
              background: "hsl(var(--orange))",
              boxShadow: "0 0 10px hsl(var(--orange) / 0.8)",
            }}
          />
          {(!running || gameOver) && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm rounded-md">
              <div className="text-center space-y-2 p-4">
                {gameOver ? (
                  <>
                    <div className="font-display font-black text-2xl gradient-text">Game Over</div>
                    <p className="text-xs text-muted-foreground">Pontuação: {score}</p>
                  </>
                ) : (
                  <div className="text-xs text-muted-foreground">Pressione iniciar</div>
                )}
                <Button variant="hero" size="sm" onClick={reset}>
                  {gameOver ? "Jogar de novo" : "Começar"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile dpad */}
      <div className="grid grid-cols-3 gap-2 md:hidden">
        <div />
        <button
          className="h-10 w-10 rounded-xl glass-card active:scale-95 transition-transform"
          onClick={() => dirRef.current !== "down" && setDir("up")}
          aria-label="Cima"
        >▲</button>
        <div />
        <button
          className="h-10 w-10 rounded-xl glass-card active:scale-95 transition-transform"
          onClick={() => dirRef.current !== "right" && setDir("left")}
          aria-label="Esquerda"
        >◀</button>
        <button
          className="h-10 w-10 rounded-xl glass-card active:scale-95 transition-transform"
          onClick={() => dirRef.current !== "up" && setDir("down")}
          aria-label="Baixo"
        >▼</button>
        <button
          className="h-10 w-10 rounded-xl glass-card active:scale-95 transition-transform"
          onClick={() => dirRef.current !== "left" && setDir("right")}
          aria-label="Direita"
        >▶</button>
      </div>
      <p className="text-[11px] text-muted-foreground text-center">Use ↑ ↓ ← → ou WASD no teclado.</p>
    </div>
  );
}
