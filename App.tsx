import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

// Define types for the components
type NumberArray = number[];

export default function App() {
  const [powerballNumbers, setPowerballNumbers] = useState<NumberArray>([]);
  const [powerballRed, setPowerballRed] = useState<number | null>(null);

  const [megaMillionsNumbers, setMegaMillionsNumbers] = useState<NumberArray>([]);
  const [megaBall, setMegaBall] = useState<number | null>(null);

  // Function to generate random unique numbers
  const generateNumbers = (maxNumber: number, count: number): NumberArray => {
    const numbers = new Set<number>();
    while (numbers.size < count) {
      const num = Math.floor(Math.random() * maxNumber) + 1;
      numbers.add(num);
    }
    return Array.from(numbers).sort((a, b) => a - b);
  };

  // Generate Powerball numbers
  const generatePowerball = () => {
    setPowerballNumbers(generateNumbers(69, 5));
    setPowerballRed(Math.floor(Math.random() * 26) + 1);
  };

  // Generate Mega Millions numbers
  const generateMegaMillions = () => {
    setMegaMillionsNumbers(generateNumbers(70, 5));
    setMegaBall(Math.floor(Math.random() * 25) + 1);
  };

  // Render the number balls
  const renderNumbers = (
    numbers: NumberArray,
    ballColor: string,
    textColor: string
  ) => {
    return numbers.map((num, index) => (
      <View
        key={index}
        style={[styles.numberBall, { backgroundColor: ballColor }]}>
        <Text style={[styles.numberText, { color: textColor }]}>{num}</Text>
      </View>
    ));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Lottery Number Generator</Text>

      {/* Powerball Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Powerball</Text>
        <View style={styles.numbersContainer}>
          {renderNumbers(powerballNumbers, '#ffffff', '#000000')}
          {powerballRed !== null && (
            <View style={[styles.numberBall, { backgroundColor: '#FF0000' }]}>
              <Text style={[styles.numberText, { color: '#FFFFFF' }]}>
                {powerballRed}
              </Text>
            </View>
          )}
        </View>
        <TouchableOpacity style={styles.button} onPress={generatePowerball}>
          <Text style={styles.buttonText}>Generate Powerball Numbers</Text>
        </TouchableOpacity>
      </View>

      {/* Mega Millions Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Mega Millions</Text>
        <View style={styles.numbersContainer}>
          {renderNumbers(megaMillionsNumbers, '#FDB827', '#000000')}
          {megaBall !== null && (
            <View style={[styles.numberBall, { backgroundColor: '#0000FF' }]}>
              <Text style={[styles.numberText, { color: '#FFFFFF' }]}>
                {megaBall}
              </Text>
            </View>
          )}
        </View>
        <TouchableOpacity style={styles.button} onPress={generateMegaMillions}>
          <Text style={styles.buttonText}>Generate Mega Millions Numbers</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 40,
    alignItems: 'center',
    backgroundColor: '#EFEFEF',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  section: {
    width: '90%',
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  numbersContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  numberBall: {
    width: 50,
    height: 50,
    borderRadius: 25,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    elevation: 3,
  },
  numberText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#1E90FF',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    elevation: 2,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});
