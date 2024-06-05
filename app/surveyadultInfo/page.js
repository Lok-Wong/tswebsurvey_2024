'use client'
import * as React from 'react';
import styles from "./page.module.css";
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import FormLabel from '@mui/material/FormLabel';
// import 'survey-core/defaultV2.min.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { useRouter } from 'next/navigation';



function App() { 
    const [stillHaveFamily, setStillHaveFamily] = React.useState("没有");
    const [times, setTimes] = React.useState(0)
    const [surveyObject, setSurveyObject] = React.useState(
        [
            // {
            //     times:times,
            //     startTime:0,
            //     endTime:10,
            //     testimg:"test",
            // }
        ]
    )
    const [startTime, setStartTime] = React.useState(dayjs());


    function handleRemove(id) {
        const newList = surveyObject.filter((item) => item.id !== id);
        setSurveyObject(newList);
      }

    function handleNextButton() {
        setTimes((prevState) => (prevState+1))
        setSurveyObject((prevState) => ([...prevState,{
            startPoint : "null",
            endPoint : "null",
            startTime : "null",
            endTime : "null",
            purposeOfVisit: "null",
            travelingTogether : "null",
            liveTogether:"null",
            sevenDayTrips:"null",
            mainMode:"null",
            motoMode:{
                walkToVehicle:"null",
                waittingTime:"null",
                walkToBuilding:"null",
                findParkingTime:"null",
                parkingFee:"null",
                parkingType:'null',
                mainWay:"null",
            },
            carMode:{
                walkToVehicle:"null",
                waittingTime:"null",
                walkToBuilding:"null",
                findParkingTime:"null",
                parkingFee:"null",
                parkingType:'null',
                mainWay:"null",
            },
            motoPassengerMode:{
                walkToVehicle:"null",
                waittingTime:"null",
                walkToBuilding:"null",
                liveTogetherWithDriver:"null"
            },
            carPassengerMode:{
                walkToVehicle:"null",
                waittingTime:"null",
                walkToBuilding:"null",
                liveTogetherWithDriver:"null"
            },
            busMode:{
                walkToVehicle:"null",
                waittingTime:"null",
                walkToBuilding:"null",
                route:"null",
                fee:"null",
                Transfer:"null",
                TransferRoute:"null",
                TransferStation:"null",
            },
            lightRailMode:{
                walkToVehicle:"null",
                waittingTime:"null",
                walkToBuilding:"null",
                route:"null",
                fee:"null",
            },
            taxiMode:{
                walkToVehicle:"null",
                waittingTime:"null",
                walkToBuilding:"null",
                taxiType:"null",
                appointmentTime : "null",
                fee : "null",
                mainWay:"null",
                callingMethod : "null",
            },
            staffBusMode:{
                walkToVehicle:"null",
                waittingTime:"null",
                walkToBuilding:"null",
            },
            schoolBusMode:{
                walkToVehicle:"null",
                waittingTime:"null",
                walkToBuilding:"null",
            },
            tourBusMode:{
                walkToVehicle:"null",
                waittingTime:"null",
                walkToBuilding:"null",
            },
            walkMode:"null",
            otherMode:"null",
            id:times,
            startTime:new Date(),
            endTime:'null',
        }
    ]))
        } 

    const listItems = surveyObject.map((d) => 
        <div key={d.id} style={{background:'white'}}>
             <div style={{display:"flex"}}>
                <button style={{backgroundColor:"#000000",marginLeft:"auto"}}  onClick={() => handleRemove(d.id)}> 
                    X
                </button>
            </div>
            <div className={styles.question}>
                <FormControl>
                    <FormLabel id="startPoint">1) 出行地點</FormLabel>
                    <FormLabel id="startPoint">1. 出行地點</FormLabel>
                    <Button>
                        touch and choose loaction
                    </Button>
                </FormControl>
                <FormControl>
                    <FormLabel id="startTime">2) 出發時間</FormLabel>
                    <FormLabel id="startTime">2. 出發時間</FormLabel>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer className={styles.question} components={['TimePicker']}>
                            <TimePicker
                                ampm={false}
                                value={startTime}
                                onChange={(newValue) => setStartTime(newValue)}
                            />
                        </DemoContainer>
                    </LocalizationProvider>
                </FormControl>
            </div>
            <div className={styles.question}>
                <FormControl>
                    <FormLabel id="endPoint">3) 出行目的地</FormLabel>
                    <FormLabel id="endPoint">3. 出行目的地</FormLabel>
                    <Button>
                        touch and choose loaction
                    </Button>
                </FormControl>
                <FormControl>
                    <FormLabel id="endTime">4) 到達時間</FormLabel>
                    <FormLabel id="endTime">4. 到達時間</FormLabel>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer className={styles.question} components={['TimePicker']}>
                            <TimePicker
                                ampm={false}
                                value={startTime}
                                onChange={(newValue) => setStartTime(newValue)}
                            />
                        </DemoContainer>
                    </LocalizationProvider>
                </FormControl>
            </div>
           
        </div>
        );

    React.useEffect(() => {
        setTimes(times)
        },[times]);


    return(
        <main className={styles.main}>
            <div>
                <h1>
                    3.	學生家庭成員個人資料
                </h1>
            </div>
            <div className={styles.question}>
                <FormControl>
                    <FormLabel id="still-have-family-label">1)    您是否已參加了入戶／線上居民出行調查，或學生家庭成員出行調查？</FormLabel>
                    <FormLabel id="still-have-family-label">1.    您是否已參加了入戶／線上居民出行調查，或學生家庭成員出行調查？</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="still-have-family-label"
                        name="still-have-family-group"
                        value={stillHaveFamily}
                        onChange={(event) => setStillHaveFamily(event.target.value)}
                        >
                        <FormControlLabel value="有" control={<Radio />} label="有" />
                        <FormControlLabel value="没有" control={<Radio />} label="没有" />
                    </RadioGroup>
                </FormControl>
            </div>
            { stillHaveFamily == "有"?
                null
                :
                <div>
                    {listItems}
                </div>
            }

            <div>
                <button onClick={handleNextButton}>
                    add
                </button>
            </div>
            <div className={styles.buttonGroupStyle}>
                <Button variant="contained">
                    {
                        stillHaveFamily == "有"? "完成" : "下一頁"
                    }
                </Button>
            </div>

        </main>
    )
}
export default App