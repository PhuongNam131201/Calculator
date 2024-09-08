import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Vibration } from 'react-native';
import { Entypo } from '@expo/vector-icons';

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [currentNumber, setCurrentNumber] = useState('');
  const [lastNumber, setLastNumber] = useState('');

  const buttons = [
    'C', 'DEL', '/', '.', 
    '7', '8', '9', '*', 
    '4', '5', '6', '-', 
    '1', '2', '3', '+', 
    '0', '='
  ];

  function calculator() {
    let lastArr = currentNumber[currentNumber.length - 1];

    if (['/', '*', '-', '+', '.'].includes(lastArr)) {
      return;
    } else {
      let result = eval(currentNumber).toString();
      setCurrentNumber(result);
      return;
    }
  }

  function handleInput(buttonPressed) {
    Vibration.vibrate(35);

    if (buttonPressed === 'DEL') {
      setCurrentNumber(currentNumber.slice(0, -1));
      return;
    }

    if (buttonPressed === 'C') {
      setCurrentNumber('');
      return;
    }

    if (buttonPressed === '=') {
      calculator();
      return;
    }

    if (['+', '-', '*', '/'].includes(buttonPressed)) {
      setCurrentNumber(currentNumber + buttonPressed);
      return;
    }

    setCurrentNumber(currentNumber + buttonPressed);
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: darkMode ? '#282f3b' : '#f5f5f5',
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
    results: {
      width: '100%',
      alignItems: 'flex-end',
      padding: 20,
    },
    resultText: {
      color: '#87df2c',
      fontSize: 48,
      marginBottom: 10,
    },
    historyText: {
      color: darkMode ? '#B5B7BB' : '#7c7c7c',
      fontSize: 24,
      marginBottom: 20,
    },
    themeButton: {
      position: 'absolute',
      top: 40,
      right: 20,
      backgroundColor: darkMode ? '#7b8084' : '#e5e5e5',
      alignItems: 'center',
      justifyContent: 'center',
      width: 50,
      height: 50,
      borderRadius: 25,
    },
    buttons: {
      width: '100%',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    button: {
      backgroundColor: '#1040c5',
      alignItems: 'center',
      justifyContent: 'center',
      width: '20%', // Adjusted for better spacing
      height: 70, // Increased height for easier tapping
      margin: '1%',
      borderRadius: 10,
    },
    textButton: {
      color: darkMode ? '#b5b7bb' : '#7c7c7c',
      fontSize: 28,
    },
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.themeButton} onPress={() => setDarkMode(!darkMode)}>
        <Entypo
          name={darkMode ? 'light-up' : 'moon'}
          size={24}
          color={darkMode ? 'white' : 'black'}
        />
      </TouchableOpacity>
      <View style={styles.results}>
        <Text style={styles.historyText}>{lastNumber}</Text>
        <Text style={styles.resultText}>{currentNumber}</Text>
      </View>

      <View style={styles.buttons}>
        {buttons.map((button) => (
          <TouchableOpacity key={button} style={styles.button} onPress={() => handleInput(button)}>
            <Text style={styles.textButton}>{button}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
