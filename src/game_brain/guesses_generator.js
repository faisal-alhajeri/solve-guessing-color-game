import { permutations } from "./util/combination"
import {gameColors} from './colors'

export class Variation{
    // variation means what could the last play be

    constructor(variation, deletedColors){
        this.variation = variation
        this.deletedColors = deletedColors
    }

    hash(){
        return JSON.stringify(this.variation)+JSON.stringify(this.deletedColors)
    }

    equal(otherVariation){
        const my = JSON.stringify(this.variation)+JSON.stringify(this.deletedColors)
        const him = JSON.stringify(otherVariation.variation)+JSON.stringify(otherVariation.deletedColors)
        return my === him
    }
}

export class GuessesGenerator{
    static _getUnique(arr){
        const uniqueSet = new Set()
        const uniqueArr = [];
        for(let perm of arr){
            if(!uniqueSet.has(JSON.stringify(perm))){
                uniqueSet.add(JSON.stringify(perm))
                uniqueArr.push(perm)
            }
        }
        return uniqueArr
    }
    
    static _uniqueVariations(variationArray){
        const uniqueSet = new Set()
        const uniqueArr = [];
        for(let variation of variationArray){
            if(!uniqueSet.has(variation.hash())){
                uniqueSet.add(variation.hash())
                uniqueArr.push(variation)
            }
        }
        return uniqueArr
    }

    static _uniqueGuesses(guessesArr){
        const uniqueSet = new Set()
        const uniqueArr = [];
        for(let guess of guessesArr){
            if(!uniqueSet.has(guess.hash())){
                uniqueSet.add(guess.hash())
                uniqueArr.push(guess)
            }
        }
        return uniqueArr
    }

    static _filterGuesses(guessesArr){
        return guessesArr.filter((guess) => {
            for(let i = 0; i < guess.slots; i++){
                if(guess.guesses[i].length === 0)
                    return false
            }
            return true
        })
    }

    static generatePermOfResult(guessResult){
        // this function will generate how the guess result could be
        // ditributed to the guess
        // 2 means right place with right color
        // 1 means rigth color with wrong place
        // 0 means wrong color

        // result is an array of possible perms 

        let perm = permutations(guessResult)
        const afterRemoving = this._getUnique(perm)
        return afterRemoving
    }

    static generatePossibilitiesWithOneGuess(colors, guessResult){
        // this function will compare actual colors with a single perm
        // then it will generate what color variations we could have 

        // result is an array, every elm in the array is array of 2 vals
        // first is the color second is deleted colors
        
        const guessBase = Array(colors.length).fill(gameColors.REMAINING)

        for(let i =0; i < guessResult.length; i++){
            if(guessResult[i] === 2)
                guessBase[i] = colors[i]
        }

        const length = colors.length

        let variations = [[...guessBase]];
        for(let colorSlotIndex =0; colorSlotIndex < length; colorSlotIndex++){
            if(guessResult[colorSlotIndex] === 1){
                const variationsLength = variations.length
                let variationIndex = 0
                while(variationIndex < variationsLength){
                    let variationCopy = [...variations.shift()]
                    for(let testIndex = 0; testIndex < variationCopy.length; testIndex++){
                        if(variationCopy[testIndex] === gameColors.REMAINING && testIndex !== colorSlotIndex){
                            let copyOfCopy = [...variationCopy]
                            copyOfCopy[testIndex] = colors[colorSlotIndex]
                            variations.push(copyOfCopy)
                        }
                    }
    
                    variationIndex++
                }
            }
        }

        const deletedColors = []
        for(let i =0; i < length; i++){
            if(guessResult[i] === 0){
                deletedColors.push(colors[i])
            }
        }


        // generate variations
        let encoded = variations.map((variation) => new Variation(variation, deletedColors))


        return [encoded]

    }

    static generatePossibilities(colors, rootGuess){
        const allGuesses = this.generatePermOfResult(rootGuess)
        let allPossibities = []
        for(const guess of allGuesses){
            let pos = this.generatePossibilitiesWithOneGuess(colors, guess)
            allPossibities =  allPossibities.concat(...pos)
        }
        return this._uniqueVariations(allPossibities)
    }

    static generateGuessesForAListOfGuesses(guessesArr, variationsObjsArr){
        // this functuion will generate a list of possible guesses using a list of guesses and a list of variations
        // result wil be a list of guesses
        let results = []
        for( const guess of guessesArr){
            let newGuesses = guess.generateGuesses(variationsObjsArr)
            results = results.concat(newGuesses)
        }

        let unique = this._uniqueGuesses(results)
        let filtered = this._filterGuesses(unique)
        return filtered
      }
}




        // let whitePinsVariations = []
        // for(let i =0; i < guessResult.length; i++){
        //     if(guessResult[i] === 1)
        //         if(whitePinsVariations.length === 0){
        //             let tempGuess = [...guessBase]
        //             for(let j =0; j < guessResult.length; j++){
        //                 if(guessBase[j] !== 2 && i !== j){
        //                     tempGuess[j] = colors[i]
        //                     whitePinsVariations.push(tempGuess)
        //                     tempGuess = [...guessBase]
        //                 }
                            
        //             }
        //         } else {
        //             let copyOfVariations = [...whitePinsVariations]
        //             whitePinsVariations = []
        //             while(copyOfVariations.length !== 0){
        //                 let variation = [ ...copyOfVariations.shift()]
        //                 let tempGuess = [...variation]
        //                 for(let j =0; j < guessResult.length; j++){
        //                     if(guessBase[j] !== 2 && i !== j){
        //                         tempGuess[j] = colors[i]
        //                         whitePinsVariations.push(tempGuess)
        //                         tempGuess = [...guessBase]
        //                     }
                            
        //                 }
        //             }
        //         }
        // }