import React from 'react'
import { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import './styles/pin.css'

export const pinTypes = {
    colorPicker: 'color-picker',
    guessPicker: 'guess-picker',
    color: 'color',
    guessResult: 'guess-result'
}

const fromColortoGuessType = {
    'red': 2,
    'white': 1,
    'grey': 0
}

export function Pin(props) {
    let PinRef = useRef()
    let classes = ['pin']
    if(props.isColorPicker){
        if(!props.isActive)
            classes.push('enactive')
    } 
    if(props.color){
        classes.push(props.color)
    }

    const handleColorPicker = () => {
        if(props.color){
            props.handlePickColor(props.color)
        }
    }

    const handlePickGuessType = () => {
        if(props.color){
            props.handleGuessType(fromColortoGuessType[props.color])
        }
    }

    function handleCurrentColors(){
        console.log('from function', props.activeColor );
        props.handleChageGuessColor(props.pinIndex, props.activeColor)
    }

        
    const handleCurrentResults = () => {
        console.log(props.handleChageGuessResult);
        props.handleChageGuessResult(props.pinIndex, props.activeGuessType)
    }

    

    useEffect(() => {
        switch(props.pinType){
            case pinTypes.color:
                PinRef.current.onclick = handleCurrentColors
                break
            case pinTypes.guessPicker:
                PinRef.current.onclick = handlePickGuessType
                break
            case pinTypes.colorPicker:
                PinRef.current.onclick = handleColorPicker
                break
            case pinTypes.guessResult:
                PinRef.current.onclick = handleCurrentResults
                break
            default:
                break
        }
    }, [props.activeColor, props.activeGuessType])

    let joinedClasees = classes.join(' ')
    return (
        <div className='pin-holder' >
                <div ref={PinRef} className={joinedClasees}>

                </div>
        </div>
    )
}

Pin.propTypes = {

}
