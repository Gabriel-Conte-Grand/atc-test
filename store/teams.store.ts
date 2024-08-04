import { Player } from "@/types/playerTypes"
import { create } from "zustand"

type Team = {
  name: string
  players: Player[]
}

type StoreState = {
  teamA: Team
  teamB: Team
  setTeamName: (team: "teamA" | "teamB", name: string) => void
  addPlayer: (team: "teamA" | "teamB", player: Player) => void
  removePlayer: (team: "teamA" | "teamB", playerId: string) => void
}

export const useStore = create<StoreState>((set, get) => ({
  teamA: { name: "Team A", players: [] },
  teamB: { name: "Team B", players: [] },
  setTeamName: (team, name) =>
    set((state) => ({
      ...state,
      [team]: { ...state[team], name },
    })),
  addPlayer: (team, player) =>
    set((state) => {
      const otherTeam = team === "teamA" ? "teamB" : "teamA"
      const playerExists =
        state[team].players.some((p) => p.player_id === player.player_id) ||
        state[otherTeam].players.some((p) => p.player_id === player.player_id)

      if (playerExists) {
        console.error(
          "Player with the same ID already exists in one of the teams"
        )
        return state
      }

      return {
        ...state,
        [team]: {
          ...state[team],
          players: [...state[team].players, player].slice(0, 5),
        },
      }
    }),
  removePlayer: (team, playerId) =>
    set((state) => ({
      ...state,
      [team]: {
        ...state[team],
        players: state[team].players.filter((p) => p.player_id !== playerId),
      },
    })),
}))
