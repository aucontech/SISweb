import React from 'react'
import ScoreCard_CNG_BINHDUONG from '../components/ScoreCard_CNG_BINHDUONG'
import ScoreCard_CNG_HUNGYEN from '../components/ScoreCard_CNG_HUNGYEN'

export default function CNG_Scorecard() {
  return (
    <div style={{display:'grid', gridTemplateColumns:'auto auto', gap:"1.25rem"}}>
      <ScoreCard_CNG_BINHDUONG/>
      <ScoreCard_CNG_HUNGYEN/>

    </div>
  )
}
