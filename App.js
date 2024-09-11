import React, { useState, useCallback } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Vibration, ScrollView, TouchableHighlight } from 'react-native';
import { Entypo } from '@expo/vector-icons';

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [currentNumber, setCurrentNumber] = useState('');
  const [lastNumber, setLastNumber] = useState('');
  const [history, setHistory] = useState([]);

  const buttons = [
    'C', 'DEL', '√', '^',
    '7', '8', '9', '*', 
    '4', '5', '6', '-', 
    '1', '2', '3', '+', 
    '0',  '/', '.','=', 
    '!' // Add factorial button here
  ];
  

  const calculator = useCallback(() => {
    let lastArr = currentNumber[currentNumber.length - 1];

    if (['/', '*', '-', '+', '.', '^', '√'].includes(lastArr)) {
      return;
    } else {
      try {
        // Handle square root separately
        let expression = currentNumber.replace(/√/g, 'Math.sqrt').replace(/\^/g, '**');
        
        // Evaluate the expression
        let result = eval(expression).toString();
        
        // Save to history
        setHistory(prevHistory => [{ expression: currentNumber, result }, ...prevHistory.slice(0, 9)]);
        setLastNumber(currentNumber);
        setCurrentNumber(result);
      } catch (error) {
        setCurrentNumber('Error');
      }
    }
  }, [currentNumber]);

  const handleFactorial = (num) => {
    if (num < 0) return 'Error'; // Factorial of negative numbers is not defined
    if (num === 0 || num === 1) return '1'; // Factorial of 0 and 1 is 1
    let fact = 1;
    for (let i = 2; i <= num; i++) {
      fact *= i;
    }
    return fact.toString();
  };
  
  const handleInput = (buttonPressed) => {
    Vibration.vibrate(25);
  
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
  
    if (buttonPressed === '√') {
      if (currentNumber) {
        const sqrtResult = Math.sqrt(parseFloat(currentNumber)).toString();
        setHistory(prevHistory => [{ expression: `√${currentNumber}`, result: sqrtResult }, ...prevHistory.slice(0, 9)]);
        setLastNumber(currentNumber);
        setCurrentNumber(sqrtResult);
      }
      return;
    }
  
    if (buttonPressed === '!') {
      if (currentNumber) {
        const factorialResult = handleFactorial(parseInt(currentNumber));
        setHistory(prevHistory => [{ expression: `${currentNumber}!`, result: factorialResult }, ...prevHistory.slice(0, 9)]);
        setLastNumber(currentNumber);
        setCurrentNumber(factorialResult);
      }
      return;
    }
  
    if (['+', '-', '*', '/', '^'].includes(buttonPressed)) {
      setCurrentNumber(currentNumber + buttonPressed);
      return;
    }
  
    setCurrentNumber(currentNumber + buttonPressed);
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: darkMode ? '#282f3b' : '#c5c6c7',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding:10,
    },
    results: {
      width: '100%',
      alignItems: 'flex-end',
      padding: 20,
    },
    resultText: {
      color: darkMode ? '#87df2c': '#ee4c7c',
      fontSize: 48,
      marginBottom: 10,
    },
    historyText: {
      color: darkMode ? '#B5B7BB' : '#f13c20',
      fontSize: 24,
      marginBottom: 20,
    },
    themeButton: {
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
      backgroundColor: '#D79922',
      alignItems: 'center',
      justifyContent: 'center',
      width: '20%',
      height: 70,
      margin: '1%',
      borderRadius: 100,
      borderWidth: 2,
      borderColor: darkMode ?'#f2f2f2':'#222629'
    },
    textButton: {
      color: darkMode ? '#c5c6c7' : '#1f2833',
      fontSize: 28,
      fontWeight:'bold',
    },
    historyContainer: {
      width: '100%',
      maxHeight: 100,
      padding: 10,
      backgroundColor: darkMode ? '#3a3f47' : '#ffffff',
      borderRadius: 10,
      marginBottom: 20,
      overflow: 'hidden',
    },
    historyItem: {
      color: darkMode ? '#B5B7BB' : '#333333',
      fontSize: 18,
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

      <ScrollView style={styles.historyContainer}>
        {history.map((item, index) => (
          <Text key={index} style={styles.historyItem}>
            {item.expression} = {item.result}
          </Text>
        ))}
      </ScrollView>

      <ScrollView style={{ flexGrow: 1 }}>
        <View style={styles.buttons}>
          {buttons.map((button) => (
            <TouchableHighlight
              key={button}
              style={styles.button}
              onPress={() => handleInput(button)}
              underlayColor="#0a2e7b"
            >
              <Text style={styles.textButton}>{button}</Text>
            </TouchableHighlight>
          ))}
        </View>
      </ScrollView>

    </View>
  );
}