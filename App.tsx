import { StatusBar } from "expo-status-bar";
import {
  Button,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import GifImage from "@lowkey/react-native-gif";

import { PieChart } from "react-native-chart-kit";
import { Pokemon, getPokemonData } from "./src/utils";
import AudioPlayer from "./src/components/AudioPlayer";
import {
  ButtonText,
  Card,
  ChartContainer,
  InfoContainer,
  MainContainer,
  MainText,
  MainView,
  PokemonId,
  PokemonImage,
  PokemonName,
  PokemonType,
  StyledSafeAreaView,
  ToggleButton,
  ToggleButtonText,
} from "./src/components";
export default function App() {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);
  const [pieChartData, setPieChartData] = useState<any[]>([]);
  const [pokemonStates, setPokemonStates] = useState<{
    [key: string]: boolean;
  }>({});
  // const fetchPokemonData = async () => {
  //   const data = await getPokemonData();
  //   setPokemonData(data);
  // };

  useEffect(() => {
    const fetchPokemonData = async () => {
      const data = await getPokemonData();
      setPokemonData(data);

      const pieData = Array.from(
        new Set(data.flatMap((pokemon: Pokemon) => pokemon.types))
      ).map((type) => ({
        name: type,
        population: data.filter((pokemon: Pokemon) =>
          pokemon.types.includes(type)
        ).length,
        color: `#${Math.floor(Math.random() * 16777215).toString(16)}`, // Cor aleatória
        legendFontColor: "#fff",
        legendFontSize: 15,
      }));
      setPieChartData(pieData);
    };

    fetchPokemonData();
  }, []);

  // Filtrar Pokémon com base no tipo selecionado
  const filteredPokemon = selectedType
    ? pokemonData.filter((pokemon) => pokemon.types.includes(selectedType))
    : pokemonData;

  // Preparar dados para o gráfico de pizza
  const screenWidth = Dimensions.get("window").width;
  const chartConfig = {
    backgroundColor: "#000",
    backgroundGradientFrom: "#000",
    backgroundGradientTo: "#000",
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    strokeWidth: 100,
    propsForLabels: {
      fontSize: 14,
      fontWeight: "bold",
      color: "white",
    },
  };

  const handlePieChartPress = (selectedItem: any) => {
    const { name } = selectedItem;
    setSelectedType(name === selectedType ? null : name); // Reset selectedType when the same segment is pressed again
  };

  return (
    <StyledSafeAreaView>
      <StatusBar backgroundColor="transparent" translucent />
      <MainView>
        <MainText>Tipos de Pokémon da Primeira Geração</MainText>
        <ChartContainer>
          <PieChart
            data={pieChartData}
            width={screenWidth - 30}
            height={220}
            chartConfig={chartConfig}
            accessor={"population"}
            backgroundColor={"transparent"}
            paddingLeft={"15"}
            center={[10, 20]}
            absolute
            hasLegend
            avoidFalseZero
          />
          <Text>Total de Pokémon: {filteredPokemon.length}</Text>
        </ChartContainer>
        <MainContainer>
          <FlatList
            style={{ marginTop: 20 }}
            data={filteredPokemon}
            renderItem={({ item }: { item: Pokemon }) => {
              return (
                <Card>
                  <GifImage
                    source={{
                      uri: pokemonStates[item.id]
                        ? item.gifUrlBack
                        : item.gifUrlFront,
                    }}
                    style={{ width: 100, height: 100 }}
                  />
                  <InfoContainer>
                    <PokemonName>{item.name}</PokemonName>
                    <PokemonId>ID: {item.id}</PokemonId>
                    <PokemonType>Tipo: {item.types.join(", ")}</PokemonType>
                    <ToggleButton
                      item={item}
                      showFront={pokemonStates[item.id]}
                      onPress={() => {
                        setPokemonStates((prevStates) => ({
                          ...prevStates,
                          [item.id]: !prevStates[item.id],
                        }));
                      }}
                    >
                      <ToggleButtonText>
                        {!pokemonStates[item.id]
                          ? "Mostrar Traseira"
                          : "Mostrar Frontal"}
                      </ToggleButtonText>
                    </ToggleButton>
                  </InfoContainer>
                  <AudioPlayer audioUrl={item.cry} />
                </Card>
              );
            }}
            keyExtractor={(item) => item.id.toString()}
            horizontal
          />
        </MainContainer>
      </MainView>
    </StyledSafeAreaView>
  );
}
