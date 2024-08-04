import { Player } from "@/types/playerTypes"
import classNames from "classnames"
import React, { FC, useState } from "react"

type Props = {
  player: Player
  chosenPlayer: Player
  setChosenPlayer: React.Dispatch<React.SetStateAction<Player | null>>
}

export const PlayerTab: FC<Props> = ({
  player,
  chosenPlayer,
  setChosenPlayer,
}) => {
  const [isChosen, setIsChosen] = useState(
    player.player_id === chosenPlayer?.player_id &&
      player.team_name === chosenPlayer?.team_name
  )

  const tabStyle = classNames(
    `text-gray-500 hover:cursor-pointer bg-white h-16 truncate  border font-medium border-black flex flex-col justify-center items-center   rounded-lg`,
    {
      "bg-green-500 ": isChosen,
    }
  )

  return (
    <li
      onClick={() => {
        setChosenPlayer(player)
        setIsChosen(true)
      }}
      id={player.player_id}
      className={tabStyle}
    >
      <p>{player.player_name}</p>
      <p className='text-sm'> ({player.team_name})</p>
    </li>
  )
}
