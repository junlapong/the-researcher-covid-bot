import React from 'react'

const SupplyCircle = (props) => (
  <div className='supply-circle-legend mr-3' style={{ width: props.size * 2, height: props.size * 2 }} ></div>
)

export const SupplyLegend = (props) => {
  const circleSizes = [5, 10, 20, 40]
  return (
    <div className='mx-auto mx-md-0'>
      <div><b>จำนวนวัคซีนที่ฉีด (โดส)</b></div>
      <div className='mt-3 d-flex w-100 align-items-center text-sec'>
        <div className='mr-3'>1,000</div>
        <div className='d-flex align-items-center'>
          {circleSizes.map((diameter, i) => {
            return (
              <SupplyCircle size={diameter} key={i} />
            )
          })}
        </div>
        <div>1,000,000</div>
      </div>
    </div>
  )
}

export const VaxCoverageLegend = (props) => {
  const palette = ['#bdd5cd', '#9dbbb2', '#7ea297', '#60897e', '#427165']
  return (
    <div className='d-flex flex-column w-100' >
      <div className='text-left mb-3 text-sec'><b>จำนวนโดสครอบคลุมประชากร</b></div>
      <div className='w-100 d-flex flex-row'>
        <div className='d-flex bar-legend' style={{ flex: 4 }}>
          {palette.map((color, i) => {
            return (
              <div key={i} className='bar'>
                <div className='level' style={{ backgroundColor: color }}></div>
              </div>
            )
          })}

        </div>
        <div className='d-flex bar-legend' style={{ flex: 1, justifyContent: 'center' }} >
          <div className='pl-3 pl-sm-5' style={{ width: '100%', paddingBottom: 5 }}>
            <div className='level' style={{ backgroundColor: '#fafafa' }} />
          </div>
        </div>
      </div>
      <div className='w-100 d-flex flex-row'>
        <div className='d-flex bar-label' style={{ flex: 4 }}>
          {[`${parseInt(props.maxCoverage * 20)}%`, `${parseInt(props.maxCoverage * 40)}%`, `${parseInt(props.maxCoverage * 60)}%`, `${parseInt(props.maxCoverage * 80)}%`, `${parseInt(props.maxCoverage * 100)}%`].map((label, i) => {
            return (
              <div key={i} className='label'>
                <small>{label}</small>
              </div>
            )
          })}

        </div>
        <div className='d-flex bar-label' style={{ flex: 1, justifyContent: 'center' }} >
          <div className='pl-3 pl-sm-5' style={{ width: '100%', paddingBottom: 5 }}>
            <div className='text-center'>
              <small>ข้อมูลไม่พอ</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}