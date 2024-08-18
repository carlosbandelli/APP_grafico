import { create } from 'zustand';


interface PokemonTypeStore {
  selectedType: string | null;
  setSelectedType: (type: string | null) => void;
  pokemonTypes: { name: string; color: string; count: number }[];
  setPokemonTypes: (types: { name: string; color: string; count: number }[]) => void;
  pieChartData: any[];
  setPieChartData: (data: any[]) => void;
}

export const usePokemonTypeStore = create<PokemonTypeStore>((set) => ({
  selectedType: null,
  setSelectedType: (type) => set({ selectedType: type }),
  pokemonTypes: [],
  setPokemonTypes: (types) => set({ pokemonTypes: types }),
  pieChartData: [],
  setPieChartData: (data) => set({ pieChartData: data }),
}));