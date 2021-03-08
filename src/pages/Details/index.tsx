import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";

interface ParamTypes {
  id: string;
}

interface Pokemon {
  id?: number;
  name?: string;
  abilities?: string;
  types?: string[];
  moves?: string[];
  stats?: {
    name?: string;
    value?: number;
  }[];
}

const Details: React.FC = () => {
  const { id } = useParams<ParamTypes>();

  const [pokemon, setPokemon] = useState<Pokemon>();
  const [loading, setLoading] = useState(false);

  const getPokemon = async (id: string) => {
    setLoading(true);
    try {
      const { data } = await api.get(`pokemon/${id}`);
      setPokemon({
        ...pokemon,
        id: data.id,
        name: data.name,
        abilities: data.abilities.map((ability: any) => ability.ability.name),
        moves: data.moves.map((move: any) => move.move.name),
        types: data.types.map((type: any) => type.type.name),
        stats: data.stats.map((stats: any) => {
          return {
            name: stats.stat.name,
            value: stats.base_stat,
          };
        }),
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getPokemon(id);
  }, [id]);

  useEffect(() => {
    console.log(pokemon);
  }, [pokemon]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  return <div>Detalhes</div>;
};

export default Details;
