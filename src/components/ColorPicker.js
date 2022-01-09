import React from 'react'
import PropTypes from 'prop-types'
import {gameColors} from '../game_brain/colors'
import {Pin, pinTypes} from './Pin'
import './styles/colorPicker.css'

let colorMap = {
    0: 'grey',
    1: 'white',
    2: 'red'
}

export function ColorPicker(props) {
    let colorPins = []
    for(let color in gameColors) {
        if(gameColors[color] !== 'remaining'){
            if(props.activeColor === gameColors[color]){
                colorPins.push(<Pin pinType={pinTypes.colorPicker} handlePickColor={props.handlePickColor} isColorPicker={true} isActive={true} color={gameColors[color]} />)
            }else{
                colorPins.push(<Pin pinType={pinTypes.colorPicker} handlePickColor={props.handlePickColor} isColorPicker={true} color={gameColors[color]} />)
            }
        }
    }
    return (
        <div className='color-picker'>
            <div className='colors-placeholder'>
                {colorPins}
            </div>
        </div>
    )
}

export function GuessColorPicker(props) {
    let colorPins = []
    for(let i =0; i < 3; i++) {
        if(props.activeGuessType === i){
            colorPins.push(<Pin pinType={pinTypes.guessPicker} handleGuessType={props.handleGuessType} isColorPicker={true} isActive={true} color={colorMap[i]} />)
        }else{
            colorPins.push(<Pin pinType={pinTypes.guessPicker} handleGuessType={props.handleGuessType} isColorPicker={true} color={colorMap[i]} />)
        }
    }
    return (
        <div className='color-picker'>
            <div className='guesses-colors-placeholder'>
                {colorPins}
            </div>
        </div>
    )
}

