import React from 'react'
import ScoreCard_CNG_BINHDUONG from '../components/ScoreCard_CNG_BINHDUONG'
import ScoreCard_CNG_HUNGYEN from '../components/ScoreCard_CNG_HUNGYEN'
import ScoreCard_CNG_PRU from '../components/ScoreCard_CNG_PRU'

import "../ScoreCard.css"

export default function CNG_Scorecard() {
  return (

    <div className='responsive'>

      <ScoreCard_CNG_PRU/>

      <ScoreCard_CNG_BINHDUONG/>

      <ScoreCard_CNG_HUNGYEN/>
    
    </div>
  )

}
