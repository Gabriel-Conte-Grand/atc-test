import React, { FC, FormEvent, useState } from "react"
import Image from "next/image"
import { Player } from "@/types/playerTypes"
import { Team } from "@/pages/home"
import classNames from "classnames"
import { Spinner } from "./Spinner"

type Props = {
  teamA: Team | null
  teamB: Team | null
  setTeamA: React.Dispatch<React.SetStateAction<Team | null>>
  setTeamB: React.Dispatch<React.SetStateAction<Team | null>>
}

export const SearchPlayerForm: FC<Props> = ({
  teamA,
  teamB,
  setTeamA,
  setTeamB,
}) => {
  const [searchedPlayer, setSearchedPlayer] = useState("")
  const [playerList, setPlayerList] = useState<Player[]>([])

  const [isSearching, setIsSearching] = useState(false)

  const [chosenPlayer, setChosenPlayer] = useState<null | Player>(null)

  const handleSubmit = async (event: FormEvent) => {
    setIsSearching(true)

    try {
      event.preventDefault()

      const resp = await fetch(
        `https://apiv3.apifootball.com/?action=get_players&player_name=${searchedPlayer}&APIkey=${process.env.NEXT_PUBLIC_API_KEY_FOOTBALL}`
      )

      const data: Player[] = await resp.json()

      if (!data.length) {
        throw new Error()
      }

      setPlayerList(data)
      setIsSearching(false)
    } catch (error) {
      setIsSearching(false)
      alert("No se encontraron jugadores con el nombre ingresado")
    }
  }

  const addPlayerToTeam = (team: "teamA" | "teamB", newPlayer: Player) => {
    if (
      teamA?.players.find(
        (prevPlayer) => prevPlayer.player_id === newPlayer.player_id
      ) ||
      teamA?.players.find(
        (prevPlayer) => prevPlayer.player_id === newPlayer.player_id
      )
    ) {
      return alert(`${newPlayer.player_name} ya está en uso.`)
    }

    if (team === "teamA") {
      if (teamA?.players.length === 5)
        return alert(
          `Ya esta completo el equipo ${teamA.name}. Debes borrar un jugador`
        )
      setTeamA((prev) => ({ ...prev!, players: [...prev!.players, newPlayer] }))
    }
    if (team === "teamB") {
      if (teamB?.players.length === 5)
        return alert(
          `Ya esta completo el equipo ${teamB.name}. Debes borrar un jugador`
        )
      setTeamB((prev) => ({ ...prev!, players: [...prev!.players, newPlayer] }))
    }
  }

  return (
    <div className='flex flex-col  w-full'>
      <h4 className='text-lg font-poppins text-gray-700 font-semibold'>
        Buscar Jugador
      </h4>
      <div className=' bg-gray-200 gap-4 rounded  p-2 py-3 shadow  flex font-inter flex-col  items-center w-full'>
        <div className='relative w-full  flex justify-center'>
          <Image
            src={"/search-icon.svg"}
            alt=''
            height={25}
            width={25}
            className='bg-white absolute top-2 left-10 md:left-20'
          />
          <form onSubmit={handleSubmit} className='w-full flex justify-center'>
            <input
              type='text'
              placeholder='Insertar jugador..'
              className='rounded-full p-2 text-black  pl-10  w-10/12 items-center'
              value={searchedPlayer}
              onChange={({ target }) => setSearchedPlayer(target.value)}
            />
          </form>
        </div>
        <ul className='search-ul overflow-y-scroll  max-h-80  min-h-20  w-full grid gap-5 grid-cols-[repeat(auto-fill,minmax(160px,1fr))]'>
          {!isSearching ? (
            playerList.length > 0 ? (
              playerList?.map((player) => {
                const isSamePlayer =
                  player.player_id === chosenPlayer?.player_id &&
                  player.team_name === chosenPlayer.team_name

                const tabStyle = classNames(
                  `text-gray-500 hover:cursor-pointer bg-white h-16 truncate  border font-medium border-black flex flex-col justify-center items-center   rounded-lg`,
                  {
                    "text-green-500 border-green-500 font-bold": isSamePlayer,
                  }
                )

                return (
                  <li
                    onClick={() => {
                      setChosenPlayer({ ...player })
                    }}
                    id={player.player_id}
                    className={tabStyle}
                    key={player.player_id}
                  >
                    <p>{player.player_name}</p>
                    <p className='text-sm'> ({player.team_name})</p>
                  </li>
                )
              })
            ) : null
          ) : (
            <div className='flex md:ml-80 justify-center ml-24 items-center w-full  '>
              <Spinner />
            </div>
          )}
        </ul>
        <div className='flex gap-7 mt-3 h-14 w-full'>
          {teamA && (
            <button
              disabled={!chosenPlayer}
              onClick={() => addPlayerToTeam("teamA", chosenPlayer!)}
              className='w-1/2 disabled:bg-opacity-60 shadow-lg rounded bg-red-400 border p-2 hover:bg-opacity-85 duration-75'
            >
              Agregar a {teamA.name}
            </button>
          )}
          {teamB && (
            <button
              disabled={!chosenPlayer}
              onClick={() => addPlayerToTeam("teamB", chosenPlayer!)}
              className=' w-1/2 disabled:bg-opacity-60 shadow-lg rounded bg-blue-400 border p-2 hover:bg-opacity-85 duration-75'
            >
              Agregar a {teamB.name}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
