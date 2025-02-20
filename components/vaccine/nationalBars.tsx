import React, { useState, useEffect } from 'react'
import { NationalVaccinationDataProps } from './types'

interface NationalBarsProps {
    todayData: NationalVaccinationDataProps,
    hideSupply?: boolean
}

const NationalBars = ({
    todayData,
    hideSupply = false
}: React.PropsWithChildren<NationalBarsProps>) => {
    const population = 66186727
    const [remainingSupply, setRemainingSupply] = useState<number>(0)
    useEffect(() => {
        if (todayData) {
            setRemainingSupply((100 - (todayData.total_doses * 100 / todayData.total_supply)))
        }
    }, [todayData])

    return (
        <>
            {todayData && (
                <div className='d-flex flex-column align-items-start'>
                    <div className='mb-4 w-100 text-left'>
                        <b>ได้รับวัคซีนครบแล้ว</b>
                        <h1 className='mt-1 vaccine-theme'>
                            {(todayData['second_dose'] * 100 / population).toFixed(1)}%
                        </h1>
                        <div className='doses-progress'>
                            <div className='doses-bar' style={{ width: `${(todayData.second_dose * 100 / population)}%` }}></div>
                        </div>
                    </div>
                    <div className='w-100 text-left'>
                        <b>ได้รับวัคซีนอย่างน้อย 1 โดส</b>
                        <h1 className='mt-1 vaccine-theme'>
                            {(todayData.first_dose * 100 / population).toFixed(1)}%
                        </h1>
                        <div className='doses-progress'>
                            <div className='doses-bar' style={{ width: `${(todayData.first_dose * 100 / population)}%` }}></div>
                        </div>
                    </div>
                    {!hideSupply &&
                        <>
                            <hr className='w-100 mt-4' />
                            <div className='w-100 text-left'>
                                <b>วัคซีนคงเหลือจากที่ได้รับจัดสรร</b>
                                <h1 className='mt-1 vaccine-theme'>
                                    {remainingSupply.toFixed(1)}%
                                </h1>
                                <div className='doses-progress'>
                                    <div className='doses-bar' style={{ width: `${remainingSupply}%` }}></div>
                                </div>
                            </div>
                            <div className='w-100 text-left mt-1'>
                                <span className='small text-muted'>คงเหลือ {(todayData.total_supply - todayData.total_doses).toLocaleString()}​/{todayData.total_supply.toLocaleString()} โดส</span>
                            </div>
                        </>
                    }
                </div>
            )}
        </>
    )
}

export default NationalBars