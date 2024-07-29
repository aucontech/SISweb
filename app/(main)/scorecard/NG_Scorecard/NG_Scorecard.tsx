import React from 'react'
import ScoreCard_Otsuka from '../components/ScoreCard_Otsuka'
import ScoreCard_Nitori from '../components/ScoreCard_Nitori'
import ScoreCard_Yoshino from '../components/ScoreCard_Yoshino'
import ScoreCard_VREC from '../components/ScoreCard_VREC'
import ScoreCard_KOA from '../components/ScoreCard_KOA'
import ScoreCard_Arakawa from '../components/ScoreCard_Arakawa'
import ScoreCard_SPMCV from '../components/ScoreCard_SPMCV'
import ScoreCard_IGUACU from '../components/ScoreCard_IGUACU'
import ScoreCard_ZOCV from '../components/ScoreCard_ZOCV'

export default function NG_Scorecard() {
  return (

    <div style={{display:'grid', gridTemplateColumns:'auto auto', gap:"1.25rem"}}> 


    {/* <ScoreCard_ZOCV/> */}
        <ScoreCard_KOA/>
        <ScoreCard_Yoshino/>
        <ScoreCard_Nitori/>
        <ScoreCard_VREC/>
        <ScoreCard_IGUACU/>
        <ScoreCard_SPMCV/>
        <ScoreCard_Arakawa/>
        <ScoreCard_Otsuka/>

    </div>
  
  )
}
