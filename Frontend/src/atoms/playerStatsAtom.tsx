import { atom } from "recoil";

interface PlayerStats {
  gamesPlayed: number;
  wins: number;
  losses: number;
  draws: number;
  rating: number;
}

export const playerStatsAtom = atom<PlayerStats | null>({
  key: "playerStatsAtom",
  default: null,
});
