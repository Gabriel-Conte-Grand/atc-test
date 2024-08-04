import { SearchPlayerForm } from "@/components/SearchPlayerForm"
import { Player } from "@/types/playerTypes"
import { NextPage } from "next"
import React, { useEffect, useRef, useState } from "react"

export type Team = {
  name: string
  players: Player[]
}

const HomePage: NextPage = () => {
  const [teamA, setTeamA] = useState<Team | null>(null)
  const [teamB, setTeamB] = useState<Team | null>(null)

  const pitidoAudio = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Crear el objeto de audio solo en el lado del cliente
      pitidoAudio.current = new Audio("/pitido.wav")
    }
  }, [])

  const createTeam = () => {
    if (teamA && teamB) return alert("Solo pueden haber dos equipos")

    if (!teamA) {
      setTeamA({
        name: "Equipo1",
        players: [],
      })
    } else {
      setTeamB({
        name: "Equipo2",
        players: [],
      })
    }

    if (pitidoAudio.current) {
      pitidoAudio.current.play()
    }
  }

  const deletePlayer = (team: "teamA" | "teamB", playerID: string) => {
    if (team === "teamA") {
      setTeamA((prev) => ({
        ...prev!,
        players: prev!.players.filter(
          (player) => player.player_id !== playerID
        ),
      }))
    }

    if (team === "teamB") {
      setTeamB((prev) => ({
        ...prev!,
        players: prev!.players.filter(
          (player) => player.player_id !== playerID
        ),
      }))
    }
  }

  const deleteTeam = (team: "teamA" | "teamB") => {
    if (team === "teamA") {
      setTeamA(null)
    }

    if (team === "teamB") {
      setTeamB(null)
    }
  }

  return (
    <div className='flex text-white flex-col  pb-12    md:pb-8 gap-5 p-2 items-center bg-gray-100 md:w-3/5 md:h-max md:mx-auto'>
      <h1 className='font-poppins tracking-wide mt-6 font-semibold text-3xl text-green-700 leading-loose uppercase'>
        ⭐ Dream <span className='text-green-700'>Match</span> ⭐
      </h1>
      <div className='= w-3/5 flex justify-center'>
        <button
          onClick={createTeam}
          className='p-2 hover:shadow-xl duration-75 w-full border py-3 font-medium uppercase font-poppins shadow-lg bg-white text-lg text-gray-600 rounded'
        >
          Crear Equipo
        </button>
      </div>
      <div className='text-lg font-inter  py-3 px-1  flex gap-2 justify-between mt-4  w-full'>
        <div className='flex  flex-col gap-6 text-center w-1/2'>
          {teamA && (
            <input
              type='text'
              value={teamA?.name}
              onChange={({ target }) => {
                setTeamA((prev) => ({ ...prev!, name: target.value }))
              }}
              className='bg-transparent text-center p-1   flex justify-center font-semibold text-red-400'
            />
          )}
          <ul className='flex squad-ul-1 font-inter items-center flex-col gap-4 '>
            {teamA
              ? new Array(5).fill(undefined).map((player, idx) => {
                  if (teamA.players[idx] === undefined) {
                    return (
                      <li key={idx}>{idx === 0 ? "Arquero" : "Jugador"}</li>
                    )
                  }
                  const currentPlayer = teamA?.players[idx]
                  return (
                    <li key={currentPlayer.player_id}>
                      {currentPlayer.player_name}
                      <button
                        onClick={() =>
                          deletePlayer("teamA", currentPlayer.player_id)
                        }
                        className='absolute  text-gray-600 bg-white -left-7 border rounded text-base shadow-lg  px-2'
                      >
                        x
                      </button>
                    </li>
                  )
                })
              : null}
          </ul>
          {teamA ? (
            teamA?.players.length === 5 ? (
              <div className='bg-transparent text-green-500 font-medium text-xs md:text-sm p-1 text-left md:justify-center pl-2 items-center flex mx-4 rounded-full'>
                ({teamA?.players.length || 0}/5) Equipo completo
              </div>
            ) : (
              <div className=' text-yellow-500 bg-transparent font-medium text-xs md:text-sm p-1 text-left md:justify-center pl-2 items-center flex mx-4 rounded-full'>
                ({teamA?.players.length || 0}/5) Equipo incompleto
              </div>
            )
          ) : null}

          {teamA && (
            <button
              onClick={() => deleteTeam("teamA")}
              className='bg-white shadow-lg text-red-500 rounded p-1 w-4/5 mx-auto border  text-sm'
            >
              Eliminar equipo
            </button>
          )}
        </div>
        <div className='flex  flex-col gap-6 text-center w-1/2'>
          {teamB && (
            <input
              type='text'
              value={teamB?.name}
              onChange={({ target }) => {
                setTeamB((prev) => ({ ...prev!, name: target.value }))
              }}
              className='bg-transparent text-center p-1 flex justify-center font-semibold text-blue-400'
            />
          )}
          <ul className='flex squad-ul-2 font-inter items-center flex-col gap-4 '>
            {teamB
              ? new Array(5).fill(undefined).map((player, idx) => {
                  if (teamB.players[idx] === undefined) {
                    return (
                      <li key={idx}>{idx === 0 ? "Arquero" : "Jugador"}</li>
                    )
                  }
                  const currentPlayer = teamB.players[idx]
                  return (
                    <li key={currentPlayer.player_id}>
                      {currentPlayer.player_name}

                      <button
                        onClick={() =>
                          deletePlayer("teamB", currentPlayer.player_id)
                        }
                        className='absolute  text-gray-600 bg-white -left-7 border rounded text-base shadow-lg  px-2'
                      >
                        x
                      </button>
                    </li>
                  )
                })
              : null}
          </ul>
          {teamB ? (
            teamB?.players.length === 5 ? (
              <div className='bg-transparent text-green-500 font-medium text-xs md:text-sm p-1 text-left md:justify-center pl-2 items-center flex mx-4 rounded-full'>
                ({teamB?.players.length || 0}/5) Equipo completo
              </div>
            ) : (
              <div className=' text-yellow-500 bg-transparent font-medium text-xs md:text-sm p-1 text-left md:justify-center pl-2 items-center flex mx-4 rounded-full'>
                ({teamB?.players.length || 0}/5) Equipo incompleto
              </div>
            )
          ) : null}
          {teamB && (
            <button
              onClick={() => deleteTeam("teamB")}
              className='bg-white shadow-lg text-blue-500 rounded p-1 w-4/5 mx-auto border  text-sm'
            >
              Eliminar equipo
            </button>
          )}
        </div>
      </div>

      {teamA || teamB ? (
        <SearchPlayerForm
          setTeamA={setTeamA}
          setTeamB={setTeamB}
          teamA={teamA}
          teamB={teamB}
        />
      ) : null}
    </div>
  )
}

export default HomePage
