
import React from 'react'
import { FaReact, FaPython, FaCity, FaEbay, FaLinux, FaGit, FaTeamspeak, FaRaspberryPi, FaHandHolding, FaJs, FaHtml5, FaNodeJs, FaCss3Alt, FaCcStripe } from 'react-icons/fa'

function tablet() {
    const colors = Array.from({ length: 10 }).map((_, index) => (index + 1) * 100)
    colors.unshift(50)
    colors.pop()
    console.log({ colors, 6: colors[5] })
    function toggle() {
        console.log({ this: this })
    }

    return (
        <div className='h-screen'>
            <h1 className='text-2xl text-center mx-auto block  border-2 border-blue-300 border-solid rounded-tr-xl rounded-bl-xl my-2'  > cards </h1>
            <hr className='bg-slate-800 py-1' />
            <div className="grid grid-cols-12 gap-3 relative bg-primary">
                <div>

                    <FaCity size={70} color='cyan'
                        onClick={() => toggle()} className={`w-full bg-white text-center mt-5 border-solid rounded-tr-xl rounded-bl-xl border-2   
                border-blue-${colors[1]}`} />
                    <div className='flex flex-col justify-center items-center text-center absolute top-5 left-1 w-16 h-16 p-9 bg-black opacity-0 hover:opacity-80'>
                        <h1 className='font-logo text-xl font-medium text-white'>titre</h1>
                        <button onClick={() => toggle()} className='font-logo text-sm bg-slate-400 rounded border-blue-200 border-2'>{`${'tournez'.toUpperCase()}`}</button>
                    </div>

                </div>
                <div>
                    <FaEbay size={70} color={'violet'} className={`w-full bg-white text-center mt-5  border-solid rounded-tr-xl rounded-bl-xl border-2 hover:border-dotted 
                border-blue-${colors[3]}`} />
                    <div className='flex flex-col justify-center items-center text-center absolute top-5 left-1 w-16 h-16 p-9 bg-black opacity-0 hover:opacity-80'>
                        <h1 className='font-logo text-xl font-medium text-white'>titre</h1>
                        <button onClick={() => toggle()} className='font-logo text-sm bg-slate-400 rounded border-blue-200 border-2'>{`${'tournez'.toUpperCase()}`}</button>
                    </div>

                </div>
                <div>

                    <FaGit size={70} color={'red'} className={`w-full  bg-slate-50 text-center mt-5 border-solid rounded-tr-xl rounded-bl-xl
                 border-2 hover:border-dotted border-blue-${colors[5]}`} />
                    <div className='flex flex-col justify-center items-center text-center absolute top-5 left-1 w-16 h-16 p-9 bg-black opacity-0 hover:opacity-80'>
                        <h1 className='font-logo text-xl font-medium text-white'>titre</h1>
                        <button onClick={() => toggle()} className='font-logo text-sm bg-slate-400 rounded border-blue-200 border-2'>{`${'tournez'.toUpperCase()}`}</button>
                    </div>
                </div>
                <FaLinux size={70} color={'pink'} className={`w-full text-center 
                mt-5 rounded-tr-xl rounded-bl-xl border-2 hover:border-dotted border-blue-${colors[6]}`} />
                <FaPython size={70} color={'yellow'} className={`w-full text-center mt-5  border-solid rounded-tr-xl rounded-bl-xl border-2 hover:border-dotted 
                border-blue-${colors[4]}`} />
                <FaReact size={70} color={'green'} className={`w-full text-center mt-5 border-solid rounded-tr-xl rounded-bl-xl
                 border-2 hover:border-dotted border-blue-${colors[4]}`} />
                <FaTeamspeak size={70} color={'green'} className='w-full text-center mt-5 border-solid rounded-tr-xl rounded-bl-xl border-2 hover:border-dotted ${border-orange-300}' />
                <FaRaspberryPi size={70} color={'green'} className='w-full text-center mt-5 border-solid rounded-tr-xl rounded-bl-xl border-2 hover:border-dotted ${border-orange-300}' />
                <FaHandHolding size={70} color={'blue'} className='w-full text-center mt-5 border-solid rounded-tr-xl rounded-bl-xl border-2 hover:border-dotted ${border-orange-300}' />
                <FaJs size={70} color={'gray'} className='w-full text-center mt-5 border-solid rounded-tr-xl rounded-bl-xl border-2 hover:border-dotted ${border-orange-300}' />
                <FaHtml5 size={70} color={'orange'} className='w-full text-center mt-5 border-solid rounded-tr-xl rounded-bl-xl border-2 hover:border-dotted ${border-orange-300}' />
                <FaNodeJs size={70} color={'black'} className='w-full text-center mt-5 border-solid rounded-tr-xl rounded-bl-xl border-2 hover:border-dotted ${border-orange-300}' />
                <FaCss3Alt size={70} color={'tomato'} className='w-full text-center mt-5 border-solid rounded-tr-xl rounded-bl-xl border-2 hover:border-dotted ${border-orange-300}' />
                <FaCcStripe size={70} color={'cadetBlue'} className='w-full text-center mt-5 border-solid rounded-tr-xl rounded-bl-xl border-2 hover:border-dotted ${border-orange-300}' />


            </div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#5F9EA0" fill-opacity="1" d="M0,192L6.2,213.3C12.3,235,25,277,37,266.7C49.2,256,62,192,74,186.7C86.2,181,98,235,111,261.3C123.1,288,135,288,148,261.3C160,235,172,181,185,165.3C196.9,149,209,171,222,192C233.8,213,246,235,258,250.7C270.8,267,283,277,295,272C307.7,267,320,245,332,229.3C344.6,213,357,203,369,192C381.5,181,394,171,406,154.7C418.5,139,431,117,443,128C455.4,139,468,181,480,170.7C492.3,160,505,96,517,74.7C529.2,53,542,75,554,96C566.2,117,578,139,591,154.7C603.1,171,615,181,628,165.3C640,149,652,107,665,101.3C676.9,96,689,128,702,144C713.8,160,726,160,738,154.7C750.8,149,763,139,775,133.3C787.7,128,800,128,812,154.7C824.6,181,837,235,849,250.7C861.5,267,874,245,886,240C898.5,235,911,245,923,234.7C935.4,224,948,192,960,176C972.3,160,985,160,997,181.3C1009.2,203,1022,245,1034,266.7C1046.2,288,1058,288,1071,266.7C1083.1,245,1095,203,1108,202.7C1120,203,1132,245,1145,224C1156.9,203,1169,117,1182,122.7C1193.8,128,1206,224,1218,218.7C1230.8,213,1243,107,1255,69.3C1267.7,32,1280,64,1292,96C1304.6,128,1317,160,1329,154.7C1341.5,149,1354,107,1366,85.3C1378.5,64,1391,64,1403,74.7C1415.4,85,1428,107,1434,117.3L1440,128L1440,0L1433.8,0C1427.7,0,1415,0,1403,0C1390.8,0,1378,0,1366,0C1353.8,0,1342,0,1329,0C1316.9,0,1305,0,1292,0C1280,0,1268,0,1255,0C1243.1,0,1231,0,1218,0C1206.2,0,1194,0,1182,0C1169.2,0,1157,0,1145,0C1132.3,0,1120,0,1108,0C1095.4,0,1083,0,1071,0C1058.5,0,1046,0,1034,0C1021.5,0,1009,0,997,0C984.6,0,972,0,960,0C947.7,0,935,0,923,0C910.8,0,898,0,886,0C873.8,0,862,0,849,0C836.9,0,825,0,812,0C800,0,788,0,775,0C763.1,0,751,0,738,0C726.2,0,714,0,702,0C689.2,0,677,0,665,0C652.3,0,640,0,628,0C615.4,0,603,0,591,0C578.5,0,566,0,554,0C541.5,0,529,0,517,0C504.6,0,492,0,480,0C467.7,0,455,0,443,0C430.8,0,418,0,406,0C393.8,0,382,0,369,0C356.9,0,345,0,332,0C320,0,308,0,295,0C283.1,0,271,0,258,0C246.2,0,234,0,222,0C209.2,0,197,0,185,0C172.3,0,160,0,148,0C135.4,0,123,0,111,0C98.5,0,86,0,74,0C61.5,0,49,0,37,0C24.6,0,12,0,6,0L0,0Z"></path></svg>

            <div className='bg-green-100    h-full text-2xl text-center  -mt-48 py-36' >
                <h1 className='text-center  mx-auto inline-block px-14 border-2 border-blue-300 border-solid my-2'  > card </h1>

                <div className="grid grid-cols-2">
                    <div className="grid "> correction</div>

                    <div className="grid"> exo</div>
                </div>
            </div>
        </div>

    )
}

export default tablet