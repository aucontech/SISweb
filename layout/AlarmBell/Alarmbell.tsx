import React, { useRef } from 'react'
import { OverlayPanel } from 'primereact/overlaypanel';
import { Button } from 'primereact/button';

import "./Alarmbell.css"
        
export default function Alarmbell() {
    const op = useRef(null); 

    const subjects = [
        {
            subject: 'Subject 1',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        },
        {
            subject: 'Subject 2',
            text: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },
        {
            subject: 'Subject 3',
            text: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
        },
        {
            subject: 'Subject 4',
            text: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
        },
        {
            subject: 'Subject 5',
            text: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        },
        {
            subject: 'Subject 6',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },
        {
            subject: 'Subject 7',
            text: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
        },
        {
            subject: 'Subject 8',
            text: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
        }
    ];


    const dataAlarm = subjects.slice(0, 6).map((item, index) => (
        <div key={index} style={{ padding: '0px 20px' }}>
            <div>
                <p style={{ fontSize: 15, fontWeight: 600 ,color:'#036E9B'  }}>{item.subject}</p>
                <p>{item.text}</p>
                <hr />
            </div>
        </div>
    ));

    return (
        <div>
            <i className="pi pi-bell" style={{ fontSize: '1.5rem',marginTop:5, marginLeft:10 }} onClick={(e) => op.current.toggle(e)} />
            <OverlayPanel style={{marginLeft:10}} ref={op} >
                <div style={{ background: 'white', width: 500, borderRadius: 5, boxShadow: '0 0 5px rgba(0, 0, 0, 0.5)' }}>
                    <div style={{ padding: '10px 20px 10px 20px' }}>
                        <p style={{ fontSize: 20, fontWeight: 600,  }}> Alarms </p>
                        <hr />
                    </div>
                    <div style={{ overflowY: 'auto', maxHeight: 400 }}>
                        {dataAlarm}
                    </div>

                    
                    
                    <div style={{padding:20}}>
                 <Button  className='layout-bell' >View All</Button>
                 </div>
                </div>
            </OverlayPanel>
        </div>
    )
}