import React from 'react'
import ScoreCard_Otsuka from '../components/ScoreCard_Otsuka'
import ScoreCard_Nitori from '../components/ScoreCard_Nitori'
import ScoreCard_Yoshino from '../components/ScoreCard_Yoshino'
import ScoreCard_VREC from '../components/ScoreCard_VREC'
import ScoreCard_KOA from '../components/ScoreCard_KOA'

export default function NG_Scorecard() {
  return (

    <div style={{display:'grid', gridTemplateColumns:'auto auto', gap:"1.25rem"}}> 
        <ScoreCard_KOA/>
        <ScoreCard_Yoshino/>
        <ScoreCard_Nitori/>
        <ScoreCard_VREC/>


        <ScoreCard_Otsuka/>






    </div>
  
  )
}
