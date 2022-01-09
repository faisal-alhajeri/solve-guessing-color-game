import React from 'react'
import PropTypes from 'prop-types'
import './styles/pinPlaceHolder.css'
import {Pin} from './Pin'

export function PinPlaceHolder(props) {
    let colorSlotsCount = props.move.colors.length
    let style = {gridTemplateColumns: `repeat(${colorSlotsCount}, ${60/colorSlotsCount}%)`};
    let colorMap = {
        0: 'grey',
        1: 'white',
        2: 'red'
    }
    if(props.activeColor)

        console.log('from place holder', props.activeColor);

    let pins =props.guessResult?
        props.move.results.map((result, index) => <div  key={index} className='pin-place-holder'><Pin activeGuessType={props.activeGuessType} pinIndex={index} handleChageGuessResult={props.handleChageGuessResult} pinType={props.pinType} color={colorMap[result]} /> </div>):
        props.move.colors.map((color, index) => <div  key={index} className='pin-place-holder'><Pin activeColor={props.activeColor} pinIndex={index} handleChageGuessColor={props.handleChageGuessColor} pinType={props.pinType} color={color} /> </div>);

    return (
        <div className='move-place-holder'>
            <div style={style} className='pins-grid'>
                        {pins}
            </div>
        </div>
    )
}

PinPlaceHolder.propTypes = {

}


