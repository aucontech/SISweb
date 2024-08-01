import React from 'react'
import ScoreCard_SNG_BINHDUONG from '../components/ScoreCard_SNG_BINHDUONG'
import ScoreCard_SNG_HUNGYEN from '../components/ScoreCard_SNG_HUNGYEN'

export default function SNG_Scorecard() {
  return (
    <div style={{display:'grid', gridTemplateColumns:'auto auto', gap:"1.25rem"}}>

      <ScoreCard_SNG_BINHDUONG/>
      <ScoreCard_SNG_HUNGYEN/>
      

    </div>
  )
}
