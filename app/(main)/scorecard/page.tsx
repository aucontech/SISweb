"use client";

import ScoreCard_Meiko from "./components/ScoreCard_Meiko";
import ScoreCard_Nitori from "./components/ScoreCard_Nitori";
import ScoreCard_Otsuka from "./components/ScoreCard_Otsuka";
import ScoreCard_Yoshino from "./components/ScoreCard_Yoshino";

const ScoreCard = () => {
    return (
        <>
        <div style={{display:'flex', justifyContent:'space-between'}}>
            <div style={{width:'49%'}} >
           

                <ScoreCard_Otsuka />
                <br />
                <ScoreCard_Meiko/>

            </div>

            <div style={{width:'49%'}}>
                <ScoreCard_Nitori/>
                <br />
                <ScoreCard_Yoshino/>

            </div>

        </div>


<br />
<br />
</>
    );
};

export default ScoreCard;
