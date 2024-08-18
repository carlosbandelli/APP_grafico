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

import { colors } from "./src/interface/colors";
import { usePokemonTypeStore } from "./src/store/store";
import TypeButton from "./src/components/typesbutton";

export default function App() {
  const {
    selectedType,
    setSelectedType,
    pokemonTypes,
    setPokemonTypes,
    pieChartData,
    setPieChartData,
  } = usePokemonTypeStore();

  const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);
  const [pokemonStates, setPokemonStates] = useState<{
    [key: string]: boolean;
  }>({});

  const handleReset = () => {
    setSelectedType(null);
  };

  useEffect(() => {
    const fetchPokemonData = async () => {
      const data = await getPokemonData();
      setPokemonData(data);

      // Atualiza a store com os tipos de Pokémon e dados para o gráfico de pizza
      const typeCounts = data.reduce((acc, pokemon) => {
        pokemon.types.forEach((type) => {
          if (acc[type]) {
            acc[type].count += 1;
          } else {
            acc[type] = {
              name: type,
              color: colors[type as keyof typeof colors] || "#000000",
              count: 1,
            };
          }
        });
        return acc;
      }, {} as { [key: string]: { name: string; color: string; count: number } });

      const typesArray = Object.values(typeCounts);
      setPokemonTypes(typesArray);

      const pieData = typesArray.map((type) => ({
        name: type.name,
        population: type.count,
        color: type.color,
        legendFontColor: "#fff",
        legendFontSize: 15,
        margin: 100,
      }));
      setPieChartData(pieData);
    };

    fetchPokemonData();
  }, [setPokemonTypes, setPieChartData]);

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

  return (
    <StyledSafeAreaView>
      <StatusBar backgroundColor="transparent" translucent />
      <MainView>
        <MainText>Tipos de Pokémon da Primeira Geração</MainText>
        <ChartContainer>
          <Text
            style={{ textAlign: "center", fontSize: 16, fontWeight: "bold" }}
          >
            Total de Pokémon:{pokemonData.length}
          </Text>
          <PieChart
            data={pieChartData}
            width={screenWidth - 30}
            height={220}
            chartConfig={chartConfig}
            accessor={"population"}
            backgroundColor={"transparent"}
            paddingLeft={"15"}
            center={[50, 5]}
            absolute
            hasLegend={false}
            avoidFalseZero
          />
        </ChartContainer>
        <MainContainer>
          <FlatList
            style={{ marginTop: 20, height: "30%" }}
            data={pokemonTypes}
            renderItem={({ item }) => (
              <TypeButton
                color={item.color}
                typeName={item.name}
                count={item.count}
                onPress={() => setSelectedType(item.name)}
              />
            )}
            keyExtractor={(item) => item.name}
            horizontal
          />
          <FlatList
            style={{ marginTop: 20, height: "100%" }}
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
        <Button title="Reset" onPress={() => handleReset()} />
      </MainView>
    </StyledSafeAreaView>
  );
}
