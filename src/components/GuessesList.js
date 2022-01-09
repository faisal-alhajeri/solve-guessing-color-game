import React from 'react'
import PropTypes from 'prop-types'
import {PinPlaceHolder} from './PinPlaceHolder'
import './styles/guessesList.css'
import { Move } from '../game_brain/guess';
import {pinTypes} from './Pin'

export function GuessesList(props) {
    let nbMoves = props.moves.length
    let nbEmptyMoves = 12 - nbMoves - 1

    let emptyPins = Array(nbEmptyMoves).fill(<PinPlaceHolder move={new Move(props.currentMove.colors.length)}/>) ;
    let currentMove = <PinPlaceHolder activeColor={props.activeColor} handleChageGuessColor={props.handleChageGuessColor} pinType={pinTypes.color} guessResult={false} move={props.currentMove}/> ;
    let moves = props.moves.map(move => <PinPlaceHolder guessResult={false} move={move}/>).reverse()
    console.log(moves);
    return (
        <div className='guesses-list'>
            {emptyPins}
            {currentMove}
            {moves}
        </div>
    )
}

GuessesList.propTypes = {

}



