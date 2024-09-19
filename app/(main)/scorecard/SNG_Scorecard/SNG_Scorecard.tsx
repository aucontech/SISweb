import React from 'react'
import ScoreCard_SNG_BINHDUONG from '../components/ScoreCard_SNG_BINHDUONG'
import ScoreCard_SNG_HUNGYEN from '../components/ScoreCard_SNG_HUNGYEN'
import ScoreCard_SNG_PRU from '../components/ScoreCard_SNG_PRU'
import "../ScoreCard.css"

export default function SNG_Scorecard() {
  return (
    <div className='responsive'>

      <ScoreCard_SNG_BINHDUONG/>
      <ScoreCard_SNG_HUNGYEN/>
      
      <ScoreCard_SNG_PRU/>
     
    </div>
  )
}
