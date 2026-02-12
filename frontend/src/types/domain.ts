

export interface Cardprops{
    domain: string;
    isselected: boolean;
    onClick: ()=>void;
    icon?: React.ComponentType<{color?:string}>;
}

export function formatTime(totalSeconds: number): string {
  if (!Number.isFinite(totalSeconds) || totalSeconds < 0) return "00:00"

  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = Math.floor(totalSeconds % 60)

  const pad = (n: number) => n.toString().padStart(2, "0")

  if (hours > 0) {
    return `${pad(hours)}h ${pad(minutes)}min ${pad(seconds)}s`
  }

  return `${pad(minutes)}min ${pad(seconds)}s`
}



