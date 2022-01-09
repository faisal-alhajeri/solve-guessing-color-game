import React from 'react'
import {PinPlaceHolder} from './PinPlaceHolder'
import {pinTypes} from './Pin'
import './styles/guessesResultsList.css'
import { Move } from '../game_brain/guess';


export function GuessesResultList(props) {
    let nbMoves = props.moves.length
    let nbEmptyMoves = 12 - nbMoves - 1

    let emptyPins = Array(nbEmptyMoves).fill(<PinPlaceHolder move={new Move(props.currentMove.colors.length)}/>) ;
    let currentMove = <PinPlaceHolder activeGuessType={props.activeGuessType} handleChageGuessResult={props.handleChageGuessResult} pinType={pinTypes.guessResult} guessResult={true} move={props.currentMove}/> ;
    let moves = props.moves.map(move => <PinPlaceHolder guessResult={true} move={move}/>).reverse()
    return (
        <div className='guesses-results-list'>
            {emptyPins}
            {currentMove}
            {moves}
        </div>
    )
}


