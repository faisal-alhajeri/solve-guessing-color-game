

export class Hueristic{

    static _createColorMap(guessesArray){
        
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

    static isInFormNOnes(guess){
        let NCount = 0;
        let oneCount = 0;
        for(const colorSlot of guess.guesses){
            colorSlot.length > 1 ? NCount++ : oneCount++;
        }
        if(NCount === 1){
            return false
        }
        return true
    }

    static getHighestScore(guessArray){
        // this function will get the hiegst guesses score as an array
        let highestScore = guessArray[0].score()
        let highestScoreArray = []
        for(const guess of guessArray){
            if(guess.score() > highestScore){
                highestScoreArray = [guess]
            } else if(guess.score() === highestScore){
                highestScoreArray.push(guess)
            } 
        }
        return highestScoreArray
    }
    
    static getGuessLeastScoreColors(guess, colorMap){
        // this method wil get the least colors of guess
        // result is an array
        let results = []
        for(const colorSlot of guess.guesses){
            let leastColor = colorSlot[0]
            for(const color of colorSlot){
                if(colorMap[color] < colorMap[leastColor]){
                    leastColor = color
                }
            }
            results.push(leastColor)
        }
        return results
    }

    static getGuessColorScore(guess, allColorsMap){
        let score = 0
        let lestColors = Hueristic.getGuessLeastScoreColors(guess, allColorsMap)
        for(const color of lestColors){
            score += allColorsMap[color]
        }
        return score
    }

    static getLowestGuessColorScore(guessesArray, allColorsMap){
        let lowestGuess = guessesArray[0];
        let lowestGuessScore = Hueristic.getGuessColorScore(lowestGuess, allColorsMap)
        for(const guess of guessesArray){
            let s = Hueristic.getGuessColorScore(guess, allColorsMap)
            if( s < lowestGuessScore){
                lowestGuess = guess
                lowestGuessScore = s
            }
        }
        return lowestGuess

    }

    static h1(guesesArray){
        let highestCountScoreArray = Hueristic.getHighestScore(guesesArray)
        let colorMap = Hueristic._createColorMap(highestCountScoreArray)
        let mostAppropriate = Hueristic.getLowestGuessColorScore(highestCountScoreArray, colorMap)
        let colorsToChoose = Hueristic.getGuessLeastScoreColors(mostAppropriate, mostAppropriate.colorMap())
        return [mostAppropriate, colorsToChoose] 
    }

    static h2(guesesArray){
        let highestCountScoreArray = Hueristic.getHighestScore(guesesArray)
        let colorMap = Hueristic._createColorMap(highestCountScoreArray)
        let mostAppropriate = Hueristic.getLowestGuessColorScore(highestCountScoreArray, colorMap)
        if(Hueristic.isInFormNOnes(mostAppropriate)){
            
        } else{
            let colorsToChoose = Hueristic.getGuessLeastScoreColors(mostAppropriate, mostAppropriate.colorMap())
            return [mostAppropriate, colorsToChoose] 
        }
    }
}