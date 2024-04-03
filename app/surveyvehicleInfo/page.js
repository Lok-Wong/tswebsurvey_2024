'use client'
import * as React from 'react';
import styles from "./page.module.css";
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import 'survey-core/defaultV2.min.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import { useRouter } from 'next/navigation';

function App( ) {
    const router = useRouter();
    const prevData = JSON.parse(localStorage.getItem("1"));

    const [vehicelCheckState, setVehicelCheckState] = React.useState(false)
    const [motorcycleCheckState, setMotorcycleCheckState] = React.useState(false)
    const [truckCheckState, setTruckCheckState] = React.useState(false)
    const [bikeCheckState, setBikeCheckState] = React.useState(false)

    const handlevehicelCheckState = (event) => {
        setVehicelCheckState(event.target.checked);
      };

    const handlemotorcycleCheckState= (event) => {
        setMotorcycleCheckState(event.target.checked);
    };

    const handletruckCheckState = (event) => {
        setTruckCheckState(event.target.checked);
    };

    const handlebikeCheckState = (event) => {
        setBikeCheckState(event.target.checked);
    };

    const [survey, setSurvey] = React.useState({
        surveyvehicleInfo : {
            vehicel:{
                total : 999,
                totalEV : 999,
                park:{
                    selfOwn:999,
                    subsidiary:999,
                    selfMonthly:999,
                    publicHourly:999,
                    publicMonthly:999,
                    meter:999,
                    streelParkFree: 999,
                    other:999
                }
            },
            motorcycle:{
                total : 999,
                totalEV : 999,
                park:{
                    selfOwn:999,
                    subsidiary:999,
                    selfMonthly:999,
                    publicHourly:999,
                    publicMonthly:999,
                    meter:999,
                    streelParkFree: 999,
                    other:999
                }
            },
            truck:{
                total : 999,
                totalEV : 999,
                park:{
                    selfOwn:999,
                    subsidiary:999,
                    selfMonthly:999,
                    publicHourly:999,
                    publicMonthly:999,
                    meter:999,
                    streelParkFree: 999,
                    other:999
                }
            },
            bike:{
                total : 999,
                totalEV : "N/A",
                park:{
                    selfOwn:999,
                    subsidiary:999,
                    selfMonthly:999,
                    publicHourly:"N/A",
                    publicMonthly:"N/A",
                    meter:"N/A",
                    streelParkFree: 999,
                    other:999
                }
            }
        }
      })


    React.useEffect(() => {
        console.log( "prevData",prevData)
        console.log("survey",survey)
    },[prevData,survey])

    return (
        <main className={styles.main}>
            <div>
                <h1>
                    住戶持有車輛資料 
                </h1>
            </div>
            <div className={styles.checkBlock}>
                <div className={styles.question}>
                    <label>
                        <FormControlLabel control={
                        <Checkbox
                            checked = {vehicelCheckState}
                            onChange={handlevehicelCheckState}
                        />
                        } 
                        label="私家車" /> 
                    </label>
                    <FormControl >
                        <div className={styles.selectBox} >
                            <p className={styles.p}>總數量</p>
                            <Box width={50}>
                                <TextField 
                                    onChange={(event) => {setSurvey((prevState)=>({
                                        ...prevState,
                                        surveyvehicleInfo:{
                                            ...prevState.surveyvehicleInfo,
                                            vehicel:{
                                                ...prevState.surveyvehicleInfo.vehicel,
                                                total : event.target.value
                                            }
                                        }
                                    }))}}
                                    disabled={!vehicelCheckState}
                                    autoWidth
                                    id="total-vehicel" 
                                    variant="outlined"
                                    defaultValue={0}
                                    />
                            </Box>
                        </div>
                    </FormControl>
                    <FormControl >
                        <div className={styles.selectBox} >
                            <p  className={styles.p}>當中，純電動車數量</p>
                            <Box width={50}>
                                <TextField 
                                    disabled={!vehicelCheckState}
                                    autoWidth
                                    id="total-ev-vehicel" 
                                    variant="outlined"
                                    defaultValue={0}
                                    />
                            </Box>
                        </div>
                    </FormControl>
                </div>

                <div className={styles.question}>
                
                    <FormControl >
                        <div className={styles.selectBox} >
                            <p className={styles.p}>自置停車位</p>
                            <Box width={50}>
                                <TextField 
                                    disabled={!vehicelCheckState}
                                    autoWidth
                                    id="self_park" 
                                    variant="outlined"
                                    defaultValue={0}
                                    />
                            </Box>
                        </div>
                    </FormControl>
                    <FormControl >
                        <div className={styles.selectBox} >
                            <p className={styles.p}>附屬於車位的停車空間</p>
                            <Box width={50}>
                                <TextField 
                                    disabled={!vehicelCheckState}
                                    id="subsidiary_park" 
                                    variant="outlined"
                                    defaultValue={0}
                                    />
                            </Box>
                        </div>
                    </FormControl>
                    <FormControl >
                        <div className={styles.selectBox} >
                            <p className={styles.p}>私人停車場（月租）</p>
                            <Box width={50}>
                                <TextField 
                                    disabled={!vehicelCheckState}
                                    autoWidth
                                    id="self_park_monthly" 
                                    variant="outlined"
                                    defaultValue={0}
                                    />
                            </Box>
                        </div>
                    </FormControl>
                    <FormControl >
                        <div className={styles.selectBox} >
                            <p className={styles.p}>公共停車場（時鐘票）</p>
                            <Box width={50}>
                                <TextField 
                                    disabled={!vehicelCheckState}
                                    autoWidth
                                    id="public_park_hourly" 
                                    variant="outlined"
                                    defaultValue={0}
                                    />
                            </Box>
                        </div>
                    </FormControl>
                </div>

                <div className={styles.question}>                
                    <FormControl >
                        <div className={styles.selectBox} >
                            <p className={styles.p}>公共停車場（月租）</p>
                            <Box width={50}>
                                <TextField 
                                    disabled={!vehicelCheckState}
                                    autoWidth
                                    id="public_park_monthly" 
                                    variant="outlined"
                                    defaultValue={0}
                                    />
                            </Box>
                        </div>
                    </FormControl>
                    <FormControl >
                        <div className={styles.selectBox} >
                            <p className={styles.p}>路邊停車位（咪錶）</p>
                            <Box width={50}>
                                <TextField 
                                    disabled={!vehicelCheckState}
                                    autoWidth
                                    id="meter-parking" 
                                    variant="outlined"
                                    defaultValue={0}
                                    />
                            </Box>
                        </div>
                    </FormControl>
                    <FormControl >
                        <div className={styles.selectBox} >
                            <p className={styles.p}>路邊停車位（免費）</p>
                            <Box width={50}>
                                <TextField 
                                    disabled={!vehicelCheckState}
                                    autoWidth
                                    id="streel-park" 
                                    variant="outlined"
                                    defaultValue={0}
                                    />
                            </Box>
                        </div>
                    </FormControl>
                    <FormControl >
                        <div className={styles.selectBox} >
                            <p className={styles.p}>其他／備註</p>
                            <Box width={50}>
                                <TextField 
                                    disabled={!vehicelCheckState}
                                    autoWidth
                                    id="other-park" 
                                    variant="outlined"
                                    defaultValue={0}
                                    />
                            </Box>
                        </div>
                    </FormControl>
                </div>
            </div>

            <div className={styles.checkBlock}>
                <div className={styles.question}>
                    <label>
                        <FormControlLabel control={   
                        <Checkbox
                            checked = {motorcycleCheckState}
                            onChange={handlemotorcycleCheckState}
                        />} label="電單車" />
                    </label>
                    <FormControl >
                        <div className={styles.selectBox} >
                            <p className={styles.p}>總數量</p>
                            <Box width={50}>
                                <TextField 
                                    disabled = {!motorcycleCheckState}
                                    autoWidth
                                    id="total-Motorcycle" 
                                    variant="outlined"
                                    defaultValue={0}
                                    />
                            </Box>
                        </div>
                    </FormControl>
                    <FormControl >
                        <div className={styles.selectBox} >
                            <p className={styles.p}>當中，純電動車數量</p>
                            <Box width={50}>
                                <TextField 
                                    disabled = {!motorcycleCheckState}
                                    autoWidth
                                    id="total-ev-Motorcycle" 
                                    variant="outlined"
                                    defaultValue={0}
                                    />
                            </Box>
                        </div>
                    </FormControl>
                </div>

                <div className={styles.question}>
                
                    <FormControl >
                        <div className={styles.selectBox} >
                            <p className={styles.p}>自置停車位</p>
                            <Box width={50}>
                                <TextField 
                                    disabled = {!motorcycleCheckState}
                                    autoWidth
                                    id="self_park" 
                                    variant="outlined"
                                    defaultValue={0}
                                    />
                            </Box>
                        </div>
                    </FormControl>
                    <FormControl >
                        <div className={styles.selectBox} >
                            <p className={styles.p}>附屬於車位的停車空間</p>
                            <Box width={50}>
                                <TextField 
                                    disabled = {!motorcycleCheckState}
                                    id="subsidiary_park" 
                                    variant="outlined"
                                    defaultValue={0}
                                    />
                            </Box>
                        </div>
                    </FormControl>
                    <FormControl >
                        <div className={styles.selectBox} >
                            <p className={styles.p}>私人停車場（月租）</p>
                            <Box width={50}>
                                <TextField 
                                    disabled = {!motorcycleCheckState}
                                    autoWidth
                                    id="self_park_monthly" 
                                    variant="outlined"
                                    defaultValue={0}
                                    />
                            </Box>
                        </div>
                    </FormControl>
                    <FormControl >
                        <div className={styles.selectBox} >
                            <p className={styles.p}>公共停車場（時鐘票）</p>
                            <Box width={50}>
                                <TextField 
                                    disabled = {!motorcycleCheckState}
                                    autoWidth
                                    id="public_park_hourly" 
                                    variant="outlined"
                                    defaultValue={0}
                                    />
                            </Box>
                        </div>
                    </FormControl>
                </div>

                <div className={styles.question}>
                
                    <FormControl >
                        <div className={styles.selectBox} >
                            <p className={styles.p}>公共停車場（月租）</p>
                            <Box width={50}>
                                <TextField 
                                    disabled = {!motorcycleCheckState}
                                    autoWidth
                                    id="public_park_monthly" 
                                    variant="outlined"
                                    defaultValue={0}
                                    />
                            </Box>
                        </div>
                    </FormControl>
                    <FormControl >
                        <div className={styles.selectBox} >
                            <p className={styles.p}>路邊停車位（咪錶）</p>
                            <Box width={50}>
                                <TextField 
                                    disabled = {!motorcycleCheckState}
                                    autoWidth
                                    id="meter-parking" 
                                    variant="outlined"
                                    defaultValue={0}
                                    />
                            </Box>
                        </div>
                    </FormControl>
                    <FormControl >
                        <div className={styles.selectBox} >
                            <p className={styles.p}>路邊停車位（免費）</p>
                            <Box width={50}>
                                <TextField 
                                    disabled = {!motorcycleCheckState}
                                    autoWidth
                                    id="streel-park" 
                                    variant="outlined"
                                    defaultValue={0}
                                    />
                            </Box>
                        </div>
                    </FormControl>
                    <FormControl >
                        <div className={styles.selectBox} >
                            <p className={styles.p}>其他／備註</p>
                            <Box width={50}>
                                <TextField 
                                    disabled = {!motorcycleCheckState}
                                    autoWidth
                                    id="other-park" 
                                    variant="outlined"
                                    defaultValue={0}
                                    />
                            </Box>
                        </div>
                    </FormControl>
                </div>
            </div>

            <div className={styles.checkBlock}>
                <div className={styles.question}>
                    <label>
                        <FormControlLabel control={
                          <Checkbox
                            checked = {truckCheckState}
                            onChange={handletruckCheckState}
                         />
                        } label="貨車" />
                    </label>
                    <FormControl >
                        <div className={styles.selectBox} >
                            <p className={styles.p}>總數量</p>
                            <Box width={50}>
                                <TextField 
                                    disabled={!truckCheckState}
                                    autoWidth
                                    id="total-truck" 
                                    variant="outlined"
                                    defaultValue={0}
                                    />
                            </Box>
                        </div>
                    </FormControl>
                    <FormControl >
                        <div className={styles.selectBox} >
                            <p className={styles.p}>當中，純電動車數量</p>
                            <Box width={50}>
                                <TextField 
                                    disabled={!truckCheckState}
                                    autoWidth
                                    id="total-ev-truck" 
                                    variant="outlined"
                                    defaultValue={0}
                                    />
                            </Box>
                        </div>
                    </FormControl>
                </div>

                <div className={styles.question}>
               
                    <FormControl >
                        <div className={styles.selectBox} >
                            <p className={styles.p}>自置停車位</p>
                            <Box width={50}>
                                <TextField 
                                    disabled={!truckCheckState}
                                    autoWidth
                                    id="self_park" 
                                    variant="outlined"
                                    defaultValue={0}
                                    />
                            </Box>
                        </div>
                    </FormControl>
                    <FormControl >
                        <div className={styles.selectBox} >
                            <p className={styles.p}>附屬於車位的停車空間</p>
                            <Box width={50}>
                                <TextField 
                                    disabled={!truckCheckState}
                                    id="subsidiary_park" 
                                    variant="outlined"
                                    defaultValue={0}
                                    />
                            </Box>
                        </div>
                    </FormControl>
                    <FormControl >
                        <div className={styles.selectBox} >
                            <p className={styles.p}>私人停車場（月租）</p>
                            <Box width={50}>
                                <TextField 
                                    disabled={!truckCheckState}
                                    autoWidth
                                    id="self_park_monthly" 
                                    variant="outlined"
                                    defaultValue={0}
                                    />
                            </Box>
                        </div>
                    </FormControl>
                    <FormControl >
                        <div className={styles.selectBox} >
                            <p className={styles.p}>公共停車場（時鐘票）</p>
                            <Box width={50}>
                                <TextField 
                                    disabled={!truckCheckState}
                                    autoWidth
                                    id="public_park_hourly" 
                                    variant="outlined"
                                    defaultValue={0}
                                    />
                            </Box>
                        </div>
                    </FormControl>
                </div>

                <div className={styles.question}>
                
                    <FormControl >
                        <div className={styles.selectBox} >
                            <p className={styles.p}>公共停車場（月租）</p>
                            <Box width={50}>
                                <TextField 
                                    disabled={!truckCheckState}
                                    autoWidth
                                    id="public_park_monthly" 
                                    variant="outlined"
                                    defaultValue={0}
                                    />
                            </Box>
                        </div>
                    </FormControl>
                    <FormControl >
                        <div className={styles.selectBox} >
                            <p className={styles.p}>路邊停車位（咪錶）</p>
                            <Box width={50}>
                                <TextField 
                                    disabled={!truckCheckState}
                                    autoWidth
                                    id="meter-parking" 
                                    variant="outlined"
                                    defaultValue={0}
                                    />
                            </Box>
                        </div>
                    </FormControl>
                    <FormControl >
                        <div className={styles.selectBox} >
                            <p className={styles.p}>路邊停車位（免費）</p>
                            <Box width={50}>
                                <TextField 
                                    disabled={!truckCheckState}
                                    autoWidth
                                    id="streel-park" 
                                    variant="outlined"
                                    defaultValue={0}
                                    />
                            </Box>
                        </div>
                    </FormControl>
                    <FormControl >
                        <div className={styles.selectBox} >
                            <p className={styles.p}>其他／備註</p>
                            <Box width={50}>
                                <TextField 
                                    disabled={!truckCheckState}
                                    autoWidth
                                    id="other-park" 
                                    variant="outlined"
                                    defaultValue={0}
                                    />
                            </Box>
                        </div>
                    </FormControl>
                </div>
            </div>

            <div className={styles.checkBlock}>
                <div className={styles.question}>
                    <label>
                        <FormControlLabel control={  
                        <Checkbox
                            checked = {bikeCheckState}
                            onChange={handlebikeCheckState}
                        />} label="單車" />
                    </label>
                    <FormControl >
                        <div className={styles.selectBox} >
                            <p className={styles.p}>總數量</p>
                            <Box width={50}>
                                <TextField 
                                    disabled={!bikeCheckState}
                                    autoWidth
                                    id="total-bike" 
                                    variant="outlined"
                                    defaultValue={0}
                                    />
                            </Box>
                        </div>
                    </FormControl>
                </div>

                <div className={styles.question}>
                
                    <FormControl >
                        <div className={styles.selectBox} >
                            <p className={styles.p}>自置停車位</p>
                            <Box width={50}>
                                <TextField 
                                    disabled={!bikeCheckState}
                                    autoWidth
                                    id="total-vehicel" 
                                    variant="outlined"
                                    defaultValue={0}
                                    />
                            </Box>
                        </div>
                    </FormControl>
                    <FormControl >
                        <div className={styles.selectBox} >
                            <p className={styles.p}>附屬於車位的停車空間</p>
                            <Box width={50}>
                                <TextField 
                                    disabled={!bikeCheckState}
                                    id="total-vehicel" 
                                    variant="outlined"
                                    defaultValue={0}
                                    />
                            </Box>
                        </div>
                    </FormControl>
                    <FormControl >
                        <div className={styles.selectBox} >
                            <p className={styles.p}>私人停車場（月租）</p>
                            <Box width={50}>
                                <TextField 
                                    disabled={!bikeCheckState}
                                    autoWidth
                                    id="total-vehicel" 
                                    variant="outlined"
                                    defaultValue={0}
                                    />
                            </Box>
                        </div>
                    </FormControl>
                </div>

                <div className={styles.question}>
                    <FormControl >
                        <div className={styles.selectBox} >
                            <p className={styles.p}>路邊停車位（免費）</p>
                            <Box width={50}>
                                <TextField 
                                    disabled={!bikeCheckState}
                                    autoWidth
                                    id="total-vehicel" 
                                    variant="outlined"
                                    defaultValue={0}
                                    />
                            </Box>
                        </div>
                    </FormControl>
                    <FormControl >
                        <div className={styles.selectBox} >
                            <p className={styles.p}>其他／備註</p>
                            <Box width={50}>
                                <TextField 
                                    disabled={!bikeCheckState}
                                    autoWidth
                                    id="total-vehicel" 
                                    variant="outlined"
                                    defaultValue={0}
                                    />
                            </Box>
                        </div>
                    </FormControl>
                </div>
            </div>
            <Button onClick={() => router.back()}>
                previous
            </Button>
            <Button href={'/surveystudentinfo'}>
                next
            </Button>

        </main>

        
    )
}



export default App;
