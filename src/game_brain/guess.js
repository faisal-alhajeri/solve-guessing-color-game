import {gameColors} from './colors'
import {Variation} from './guesses_generator'

export class Move{
  constructor(slots){
    this.colors = Array(slots).fill('')
    this.results = Array(slots).fill(0)
  }

  changeColor(index, color){
    this.colors[index] = color
  }

  changeResult(index, result){
    this.results[index] = result
  }

  clone(){
    let cl = new Move(this.colors.length)
    cl.colors = [...this.colors]
    cl.results = [...this.results]
    return cl
  }
}

export class Guess{
    constructor(sl){
        this.slots = sl;
        this.guesses = [];
        for(let i=0; i < this.slots; i++){
          this.guesses[i] = [];
          for( const color in gameColors){
            this.guesses[i].push(gameColors[color])
          }
          this.guesses[i].pop()
        }
    }

    colorMap(){
      let cmap ={}
      for (const colorSlot of this.guesses) {
        for (const color of colorSlot) {
            if(cmap[color]){
              cmap[color] = cmap[color] + 1
            }else{
              cmap[color] = 1
            }
        }
      }
      return cmap
    }

    score(){
      let res = 0;
      for(const slot of this.guesses){
        res += slot.length
      }
      return res;
    }

    hash(){
      return JSON.stringify(this.guesses)
    }

    clone(){
        let clone_guess = new Guess(this.slots)
        clone_guess.guesses = [...this.guesses.map(guess => [...guess])]
        return clone_guess
    }

    compareAndModify(variationObj){
      // this function will compare current guess to a variation
      // will generate null if not possible
      // will generate modified guess if possible
      const clone = this.clone()
      // console.log('original ', JSON.stringify( this));
      // console.log('clone',JSON.stringify(clone));
      // console.log('\n\n\n\n');
      for(let i = 0; i < clone.slots; i++){
        if(variationObj.variation[i] !== gameColors.REMAINING){
          if(clone.guesses[i].includes(variationObj.variation[i])){
            clone.guesses[i] = [variationObj.variation[i]]
          } else{
  
            return null
          }
        } else{
            for(const deletedColor of variationObj.deletedColors){
                clone.guesses[i] = clone.guesses[i].filter(color => color !== deletedColor)
            }
        }

      }



      return clone

    }

    generateGuesses(variationsObjsArr){
      // this function will genereate all guesses possible given variations
      const results = [];
      // alorithm: 
      // 1- loop through variation
      // 2- compare variation to current guess
      //      if not possible drop this variation
      //      else construct a new guess with modification from the variation

      for(const variation of variationsObjsArr){
          const newGuess = this.compareAndModify(variation)
          // console.log(newGuess);
          if(newGuess){
            results.push(newGuess)
          }
      }

      // result is an array of guesses
      return results
    }


  
  
  
  }
  