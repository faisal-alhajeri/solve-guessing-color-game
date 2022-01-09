import {Guess, Move} from './game_brain/guess';
import {useState, useEffect} from 'react'
import {permutations} from './game_brain/util/combination'
import {GuessesGenerator} from './game_brain/guesses_generator';
import {gameColors} from './game_brain/colors'
import {Hueristic} from './game_brain/hueristic'
import {GuessesResultList} from './components/GuessesResultList'
import {GuessesList} from './components/GuessesList'
import {ColorPicker, GuessColorPicker} from './components/ColorPicker'
import {PinPlaceHolder} from './components/PinPlaceHolder'
import {Pin} from './components/Pin'
import './components/styles/containers.css'


let mv1 = new Move(4)
mv1.colors[0] = 'red'
mv1.colors[1] = 'yellow'
mv1.colors[2] = 'white'
mv1.colors[3] = 'black'
mv1.results[0] = 2
mv1.results[1] = 1
mv1.results[2] = 1


let mv2 = new Move(4)
mv2.colors[0] = 'purple'
mv2.colors[1] = 'blue'
mv2.colors[2] = 'green'
mv2.colors[3] = 'black'
mv2.results[0] = 2
mv2.results[1] = 1
mv2.results[2] = 0

function App() {
  const [guessesArray, setGuess] = useState(() => [new Guess(4)])
  const [movesArray, setMoves] = useState([mv1, mv2])
  const [currentMove, setCurrentMove] = useState(new Move(4))
  const [stage, setStage] = useState('')
  const [pickedColor, setPickedColor] = useState('blue')
  const [activeGuessType, setActiveGuessType] = useState(2)



  const handlePickColor = (color) => {
    setPickedColor(color)
  }

  const handleChangeGuessType = (guessType) => {
    setActiveGuessType(guessType)
  }

  const handleChageGuessColor = (index, color) => {
    setCurrentMove((move) => {
      let newMv = move.clone()
      newMv.changeColor(index, color)
      console.log(newMv);
      return newMv
    })
  }

  const handleChageGuessResult = (index, result) => {
    setCurrentMove((move) => {
      let newMv = move.clone()
      newMv.changeResult(index, result)
      return newMv
    })
  }

  const createColorMap = (guessesArray) => {
  
    let colorMap = {
  
    }
  
    for(const g of guessesArray){
      for(const colorSlot of g.guesses){
        for(const c of colorSlot){
          if(colorMap[c]){
            colorMap[c] = colorMap[c]+1
          } else {
            colorMap[c] = 1
          }
        }
      }
    }
    return colorMap
  
  }
    

  const playRound = ( guessesArr, choice, results) => {

    const variationObjsArr1 = GuessesGenerator.generatePossibilities(choice, results)
    console.log('variation objs', variationObjsArr1);
    let allPosigleGuesses1 = GuessesGenerator.generateGuessesForAListOfGuesses(guessesArr, variationObjsArr1)
    let highestScoreGuesses = Hueristic.getHighestScore(allPosigleGuesses1)
    let colorMap = createColorMap(highestScoreGuesses)
    let [mostAppGuess, colorsToChoose] = Hueristic.h1(allPosigleGuesses1)
    console.log('after comparison with variations', allPosigleGuesses1)
    console.log('highest score guesses', highestScoreGuesses);
    console.log('color map: ', colorMap);
    console.log('most appropriate guess to chooose', mostAppGuess);
    console.log('colors to choose', colorsToChoose)
    console.log('-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=');
    console.log('\n\n\n\n')
    return allPosigleGuesses1
  }



//   useEffect(() => {

//     // using h1 we found it with 5 choices and the sixth was the answer
//     // initial guess was 

//     // using h2 gameColors.BLACK, gameColors.WHITE, gameColors.YELLOW

//     // change teh way combine work

//     console.log('initial gueses ', guesses[0].guesses)
//     // colors are BLUE GREEN WHITE
//     let myChoice1 = [gameColors.BLACK, gameColors.RED, gameColors.YELLOW, gameColors.PURPLE]
//     let guessResults1 = [1,1,0,0]
//     let allPosigleGuesses1 = playRound(guesses, myChoice1, guessResults1)

//     let myChoice2 = [gameColors.RED, gameColors.BLACK, gameColors.BLUE, gameColors.BLUE]
//     let guessResults2 = [2,1,0,0]
//     let allPosigleGuesses2 = playRound(allPosigleGuesses1, myChoice2, guessResults2)

// // // // // // // // change one green to purpe
//     let myChoice3 = [gameColors.YELLOW, gameColors.BLACK, gameColors.WHITE, gameColors.BLUE]
//     let guessResults3 = [2,1,0,0]
//     let allPosigleGuesses3 = playRound(allPosigleGuesses2, myChoice3, guessResults3)

//     let myChoice4 = [gameColors.YELLOW, gameColors.GREEN, gameColors.BLUE, gameColors.RED]
//     let guessResults4 = [1,1,0,0]
//     let allPosigleGuesses4 = playRound(allPosigleGuesses3, myChoice4, guessResults4)


//     let myChoice5 = [gameColors.PURPLE, gameColors.WHITE, gameColors.RED, gameColors.BLUE]
//     let guessResults5 = [2,0,1,0]
//     let allPosigleGuesses5 = playRound(allPosigleGuesses4, myChoice5, guessResults5)

//     let myChoice6 = [gameColors.BLUE, gameColors.YELLOW, gameColors.PURPLE, gameColors.GREEN]
//     let guessResults6 = [2,0,0,0]
//     let allPosigleGuesses6 = playRound(allPosigleGuesses5, myChoice6, guessResults6)


//     // let myChoice6 = [gameColors.WHITE, gameColors.RED, gameColors.WHITE]
//     // let guessResults6 = [2,1,0]
//     // let allPosigleGuesses6 = playRound(allPosigleGuesses5, myChoice6, guessResults6)
//     // let myChoice = allPosigleGuesses[1]
//     // let testColors2 = [gameColors.ORANGE, gameColors.GREEN, gameColors.RED]
//     // let guessResults2 = [2,0,0]
//     // const variationObjsArr2 = GuessesGenerator.generatePossibilities(testColors2, guessResults2)

//     // let allPosigleGuesses2 = myChoice.generateGuesses(variationObjsArr2)
//     // console.log('after comparison with variations', allPosigleGuesses2)

//     // // GuessesGenerator.generatePermOfResult([1,1,1,0])
//     // console.log(  GuessesGenerator.generatePossibilitiesWithOneGuess(testColors, guessResults));

    

//   }, [])



  return (
    <div className="App">
      <div id='main-container'>
        <div id='game-container'>
          <GuessesResultList activeGuessType={activeGuessType} handleChageGuessResult={handleChageGuessResult} moves={movesArray} currentMove={currentMove} />
          <GuessesList activeColor={pickedColor} handleChageGuessColor={handleChageGuessColor} moves={movesArray} currentMove={currentMove} /> 
          <ColorPicker handlePickColor={handlePickColor} activeColor={pickedColor} />
          <GuessColorPicker handleGuessType={handleChangeGuessType} activeGuessType={activeGuessType} />

        </div>
      </div>
    </div>
  );
}

export default App;
