import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  SafeAreaView,
} from 'react-native';

// Get the screen dimensions using the Dimensions API from react-native package and store it in the screen constant. 
const screen = Dimensions.get('window');

// Define the size of the square using the screen width and multiply it by 0.3.
const SQUARE_SIZE = Math.floor(screen.width * 0.3);

// Create a StyleSheet object with the styles for the components in the app.
const styles = StyleSheet.create({

  // Define the styles for the container view.
  container: {
    flex: 1,
    backgroundColor: '#3ba2bf',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Define the styles for the board view.
  board: {
    borderWidth: 1,
    borderColor: '#fff',
  },

  // Define the styles for the row view.
  row: {
    flexDirection: 'row',
  },

  // Define the styles for the square view.
  square: {
    borderWidth: 1,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: SQUARE_SIZE,
    height: SQUARE_SIZE,
  },

  // Define the styles for the squareText text.
  squareText: {
    color: '#fff',
    fontSize: 40,
    fontWeight: 'bold',
  },

  // Define the styles for the winnerBlock view.
  winnerBlock: {
    marginTop: 50,
  },

  // Define the styles for the button view.
  button: {
    borderRadius: 5,
    borderColor: '#fff',
    borderWidth: 1,
    marginTop: 10,
  },

  // Define the styles for the buttonText text.
  buttonText: {
    color: '#fff',
    fontSize: 14,
    paddingHorizontal: 20,
    paddingVertical: 5,
  },

  // Define the styles for the text text.
  text: {
    color: '#fff',
    textAlign: 'center',
  },
});

function calculateWinner(squares) {
  // Define the winning lines.
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  // Check if any of the winning lines have the same value in all three squares.
  for (let i = 0; i < lines.length; i += 1) {
    const [a, b, c] = lines[i];
    // If the squares have the same value, return the value.
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// Create a Square component that takes onPress and value as props.
const Square = ({onPress, value}) => (
  <TouchableOpacity style={styles.square} onPress={onPress}>
    <Text style={styles.squareText}>{value}</Text>
  </TouchableOpacity>
);

// Create a Board component that takes onSquarePress and squares as props.
const Board = ({onSquarePress, squares}) => {
  // Create a renderSquare function that takes i as an argument and returns a Square component with the value of the squares array at index i and an onPress function that calls the onSquarePress function with the index i.
  const renderSquare = i => {
    return <Square value={squares[i]} onPress={() => onSquarePress(i)} />;
  };

  return (
    <View style={styles.board}>
      <View style={styles.row}>
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </View>
      <View style={styles.row}>
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </View>
      <View style={styles.row}>
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </View>
    </View>
  );
};

// Create an App component that uses the useState hook to manage the state of the game.
const App = () => {
  // Define the state variables xIsNext and squares using the useState hook.
  const [xIsNext, setXIsNext] = useState(false);

  // Define the state variable squares using the useState hook and initialize it with an array of 9 null values.
  const [squares, setSquares] = useState(Array(9).fill(null));

  // Create an onSquarePress function that takes i as an argument and updates the squares array with the value of X or O based on the xIsNext state variable.
  const onSquarePress = i => {
    // Define the value variable based on the xIsNext state variable.
    const value = xIsNext ? 'X' : 'O';

    // Create a newSquares array by copying the squares array using the spread operator.
    const newSquares = [...squares];

    // If the square at index i is already filled or there is a winner, return.
    if (newSquares[i] || calculateWinner(squares)) {
      return;
    }

    // Update the square at index i with the value.
    newSquares[i] = value;

    setXIsNext(!xIsNext);
    setSquares(newSquares);
  };

  const winner = calculateWinner(squares);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Board squares={squares} onSquarePress={onSquarePress} />

      {winner && (
        <View style={styles.winnerBlock}>
          <Text style={styles.text}>{`Winner: ${winner}`}</Text>
          <TouchableOpacity
            onPress={() => setSquares(Array(9).fill(null))}
            style={styles.button}>
            <Text style={styles.buttonText}>New Game</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default App;
