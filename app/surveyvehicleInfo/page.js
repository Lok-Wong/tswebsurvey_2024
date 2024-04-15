'use client'
import * as React from 'react';
import styles from "./page.module.css";
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
// import 'survey-core/defaultV2.min.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import { useRouter } from 'next/navigation';
import FormLabel from '@mui/material/FormLabel';
import FormGroup from '@mui/material/FormGroup';
import { MdDirectionsCarFilled,MdElectricCar } from "react-icons/md";


function App( ) {
    const router = useRouter();
    const prevData = JSON.parse(localStorage.getItem("2"));
    
    const [vehicelCheckState, setVehicelCheckState] = React.useState(false)
    const [motorcycleCheckState, setMotorcycleCheckState] = React.useState(false)
    const [truckCheckState, setTruckCheckState] = React.useState(false)
    const [bikeCheckState, setBikeCheckState] = React.useState(false)

    const [checkState, setCheckState] = React.useState(
        {
            car : false,
            moto : false,
            truck : false,
            bike : false,
        }

    )

    const handlecheckStateChange = (event) => {
        setCheckState({
          ...checkState,
          [event.target.name]: event.target.checked,
        });
      };

      const { car, moto, truck, bike } = checkState;


    const [survey, setSurvey] = React.useState({
        surveyvehicleInfo : {
            vehicel:{
                total : 999,
                totalEV : 999,
            },
            motorcycle:{
                total : 999,
                totalEV : 999,
            },
            truck:{
                total : 999,
                totalEV : 999,
            },
            bike:{
                total : 999,
            }
        }
      })


    React.useEffect(() => {
        console.log( "prevData:",prevData)
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
                    <FormControl row>
                        <FormLabel>
                            請問閣下是否擁有以下車輛？
                        </FormLabel>
                        <FormGroup row>
                            <FormControlLabel control={
                                <Checkbox
                                    checked = {car}
                                    onChange={handlecheckStateChange}
                                    name = "car"
                                />
                                } 
                                label="私家車" /> 
                            <FormControlLabel control={
                                <Checkbox
                                    checked = {moto}
                                    onChange={handlecheckStateChange}
                                    name = "moto"
                                />
                            } 
                            label="電單車" /> 
                            <FormControlLabel control={ 
                                <Checkbox
                                    checked = {truck}
                                    onChange={handlecheckStateChange}
                                    name = "truck"
                                />
                            } 
                            label="貨車" /> 
                            <FormControlLabel control={
                                <Checkbox
                                    checked = {bike}
                                    onChange={handlecheckStateChange}
                                    name = "bike"
                                />
                            } 
                            label="單車" /> 
                        </FormGroup> 
                    </FormControl>
                </div>                  
            </div>

            <div className={styles.checkBlock}>
                <div className={styles.check}>
                    <p className={styles.p}>
                        私家車
                        <MdDirectionsCarFilled/>
                    </p>
                </div>
             
                <div className={styles.question}>
                    <FormControl >
                        <div className={styles.selectBox} >
                            <p className={styles.p}>總數量</p>
                            <Box width={50}>
                                <TextField 
                                    disabled = {!motorcycleCheckState}
                                    autoWidth
                                    id="total-car" 
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
                                    id="total-ev-car" 
                                    variant="outlined"
                                    defaultValue={0}
                                    />
                            </Box>
                        </div>
                    </FormControl>
                </div>

            </div>

            <div className={styles.checkBlock}>
                <div className={styles.check}>
                    <p className={styles.p}>
                        電單車
                        <MdDirectionsCarFilled/>
                    </p>
                </div>
             
                <div className={styles.question}>
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

            </div>

            <div className={styles.checkBlock}>
                <div className={styles.check}>
                    <p className={styles.p}>
                        貨車
                        <MdDirectionsCarFilled/>
                    </p>
                </div>
                <div className={styles.question}>
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
            </div>

            <div className={styles.checkBlock}>
                <div className={styles.check}>
                    <p className={styles.p}>
                        單車
                        <MdDirectionsCarFilled/>
                    </p>
                </div>
                <div className={styles.question}>

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
