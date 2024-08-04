import React from "react"

export const PlayersList = (playerName: string) => {
  const playersList = new Array(5)

  return <li>{playerName || "Jugador"}</li>
}
