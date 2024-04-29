'use client'
import * as React from 'react';
import styles from "./page.module.css";
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import { useRouter } from 'next/navigation';
import FormLabel from '@mui/material/FormLabel';
import FormGroup from '@mui/material/FormGroup';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';


function App() {
    const router = useRouter();
    const [checkState, setCheckState] = React.useState(
        {
            car: false,
            moto: false,
            truck: false,
            bike: false,
        }
    )

    const blanksurvey = {
        surveyvehicleInfo: {
            startTime: new Date(),
            check: {
                car: false,
                moto: false,
            },
            car: {
                carTotal: 999,
                carEvTotal: 999,
            },
            moto: {
                motoTotal: 999,
                motoEvTotal: 999,
            }
        }
    }

    const _initial_value = React.useMemo(() => {
        if (typeof window !== 'undefined') {

            const local_storage_value_str = sessionStorage.getItem('vehicleInfo');
            // If there is a value stored in localStorage, use that
            if (local_storage_value_str) {
                return JSON.parse(local_storage_value_str);
            }
        }
        // Otherwise use initial_value that was passed to the function
        return blanksurvey;
    }, []);

    const handleSelectStateChange = (event, type) => {
        setSurvey((prevState) => ({
            ...prevState,
            surveyvehicleInfo: {
                ...prevState.surveyvehicleInfo,
                [type]: {
                    ...prevState.surveyvehicleInfo[type],
                    [event.target.name]: event.target.value
                }
            }
        })
        )
    }

    const handlecheckStateChange = (event) => {
        setCheckState({
            ...checkState,
            [event.target.name]: event.target.checked,
        });

        setSurvey((prevState) => ({
            ...prevState,
            surveyvehicleInfo: {
                ...prevState.surveyvehicleInfo,
                check: {
                    ...prevState.surveyvehicleInfo.check,
                    [event.target.name]: event.target.checked
                }
            }
        }))
    };

    const [survey, setSurvey] = React.useState(_initial_value)

    const [isClient, setIsClient] = React.useState(false)

    React.useEffect(() => {
        setIsClient(true)
    }, [])


    React.useEffect(() => {
        console.log("survey:", survey)
    }, [survey])

    React.useEffect(() => {
        survey && sessionStorage.setItem("vehicleInfo", JSON.stringify(survey))
    }, [survey])

    React.useEffect(() => {
        if (!survey.surveyvehicleInfo.check.car) {
            setSurvey((prevState) => ({
                ...prevState,
                surveyvehicleInfo: {
                    ...prevState.surveyvehicleInfo,
                    car: {
                        ...prevState.surveyvehicleInfo.car,
                        carTotal: 999,
                        carEvTotal: 999
                    }
                }
            })
            )
        }

        if (!survey.surveyvehicleInfo.check.moto) {
            setSurvey((prevState) => ({
                ...prevState,
                surveyvehicleInfo: {
                    ...prevState.surveyvehicleInfo,
                    moto: {
                        ...prevState.surveyvehicleInfo.moto,
                        motoTotal: 999,
                        motoEvTotal: 999
                    }
                }
            })
            )
        }

    }, [survey.surveyvehicleInfo.check.car, survey.surveyvehicleInfo.check.moto, survey.surveyvehicleInfo.check.truck, survey.surveyvehicleInfo.check.bike])

    return (
        <main className={styles.main}>
            {
                isClient ?

                    <div>

                        <div>
                            <h1 style={{ color: "#ffffff" }}>
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
                                                checked={survey.surveyvehicleInfo.check.car == 999 ? false : survey.surveyvehicleInfo.check.car}
                                                onChange={handlecheckStateChange}
                                                name="car"
                                            />
                                        }
                                            label={<p style={{ color: '#000000' }}>私家車</p>}
                                        />
                                        <FormControlLabel control={
                                            <Checkbox
                                                checked={survey.surveyvehicleInfo.check.moto == 999 ? false : survey.surveyvehicleInfo.check.moto}
                                                onChange={handlecheckStateChange}
                                                name="moto"
                                            />
                                        }
                                            label={<p style={{ color: '#000000' }}>電單車</p>}
                                        />
                                        {/* <FormControlLabel control={ 
                                <Checkbox
                                    checked = {survey.surveyvehicleInfo.check.truck}
                                    onChange={handlecheckStateChange}
                                    name = "truck"
                                />
                            } 
                                label={<p style={{ color: '#000000' }}>貨車</p>}
                            /> 
                            <FormControlLabel control={
                                <Checkbox
                                    checked = {survey.surveyvehicleInfo.check.bike}
                                    onChange={handlecheckStateChange}
                                    name = "bike"
                                />
                            } 
                                label={<p style={{ color: '#000000' }}>單車</p>}
                            />  */}
                                    </FormGroup>
                                </FormControl>
                            </div>
                        </div>

                        {
                            survey.surveyvehicleInfo.check.car ?
                                <div className={styles.checkBlock}>
                                    <div className={styles.check}>
                                        <p className={styles.p}>
                                            私家車
                                        </p>
                                    </div>

                                    <div className={styles.question}>
                                        <FormControl >
                                            <div className={styles.selectBox} >
                                                <p className={styles.p}>總數量</p>
                                                <Box width={50}>
                                                    <Select
                                                        labelId="car-total-select-label"
                                                        id="car-total--select"
                                                        name='carTotal'
                                                        value={survey.surveyvehicleInfo.car.carTotal}
                                                        onChange={(event) => {
                                                            handleSelectStateChange(event, "car")
                                                        }}
                                                    >
                                                        <MenuItem value={999}>0</MenuItem>
                                                        <MenuItem value={1}>1</MenuItem>
                                                        <MenuItem value={2}>2</MenuItem>
                                                        <MenuItem value={3}>3</MenuItem>
                                                        <MenuItem value={4}>4</MenuItem>
                                                        <MenuItem value={5}>5</MenuItem>
                                                        <MenuItem value={6}>6</MenuItem>
                                                        <MenuItem value={7}>7</MenuItem>
                                                        <MenuItem value={8}>8</MenuItem>
                                                        <MenuItem value={9}>9</MenuItem>
                                                    </Select>
                                                </Box>
                                            </div>
                                        </FormControl>
                                        <FormControl >
                                            <div className={styles.selectBox} >
                                                <p className={styles.p}>當中，純電動車數量</p>
                                                <Box width={50}>
                                                    <Select
                                                        labelId="car-ev-total-select-label"
                                                        id="car-ev-total--select"
                                                        name='carEvTotal'
                                                        value={survey.surveyvehicleInfo.car.carEvTotal}
                                                        onChange={(event) => {
                                                            handleSelectStateChange(event, "car")
                                                        }}
                                                    >
                                                        <MenuItem value={999}>0</MenuItem>
                                                        <MenuItem value={1}>1</MenuItem>
                                                        <MenuItem value={2}>2</MenuItem>
                                                        <MenuItem value={3}>3</MenuItem>
                                                        <MenuItem value={4}>4</MenuItem>
                                                        <MenuItem value={5}>5</MenuItem>
                                                        <MenuItem value={6}>6</MenuItem>
                                                        <MenuItem value={7}>7</MenuItem>
                                                        <MenuItem value={8}>8</MenuItem>
                                                        <MenuItem value={9}>9</MenuItem>
                                                    </Select>
                                                </Box>
                                            </div>
                                        </FormControl>
                                    </div>

                                </div>
                                :
                                null
                        }

                        {
                            survey.surveyvehicleInfo.check.moto ?
                                <div className={styles.checkBlock}>
                                    <div className={styles.check}>
                                        <p className={styles.p}>
                                            電單車
                                        </p>
                                    </div>

                                    <div className={styles.question}>
                                        <FormControl >
                                            <div className={styles.selectBox} >
                                                <p className={styles.p}>總數量</p>
                                                <Box width={50}>
                                                    <Select
                                                        labelId="moto-total-select-label"
                                                        id="moto-total--select"
                                                        name='motoTotal'
                                                        value={survey.surveyvehicleInfo.moto.motoTotal}
                                                        onChange={(event) => {
                                                            handleSelectStateChange(event, "moto")
                                                        }}
                                                    >
                                                        <MenuItem value={999}>0</MenuItem>
                                                        <MenuItem value={1}>1</MenuItem>
                                                        <MenuItem value={2}>2</MenuItem>
                                                        <MenuItem value={3}>3</MenuItem>
                                                        <MenuItem value={4}>4</MenuItem>
                                                        <MenuItem value={5}>5</MenuItem>
                                                        <MenuItem value={6}>6</MenuItem>
                                                        <MenuItem value={7}>7</MenuItem>
                                                        <MenuItem value={8}>8</MenuItem>
                                                        <MenuItem value={9}>9</MenuItem>
                                                    </Select>
                                                </Box>
                                            </div>
                                        </FormControl>
                                        <FormControl >
                                            <div className={styles.selectBox} >
                                                <p className={styles.p}>當中，純電動車數量</p>
                                                <Box width={50}>
                                                    <Select
                                                        labelId="moto-ev-total-select-label"
                                                        id="moto-ev-total--select"
                                                        name='motoEvTotal'
                                                        value={survey.surveyvehicleInfo.moto.motoEvTotal}
                                                        onChange={(event) => {
                                                            handleSelectStateChange(event, "moto")
                                                        }}
                                                    >
                                                        <MenuItem value={999}>0</MenuItem>
                                                        <MenuItem value={1}>1</MenuItem>
                                                        <MenuItem value={2}>2</MenuItem>
                                                        <MenuItem value={3}>3</MenuItem>
                                                        <MenuItem value={4}>4</MenuItem>
                                                        <MenuItem value={5}>5</MenuItem>
                                                        <MenuItem value={6}>6</MenuItem>
                                                        <MenuItem value={7}>7</MenuItem>
                                                        <MenuItem value={8}>8</MenuItem>
                                                        <MenuItem value={9}>9</MenuItem>
                                                    </Select>
                                                </Box>
                                            </div>
                                        </FormControl>
                                    </div>
                                </div>
                                :
                                null
                        }

                        {/* {
                survey.surveyvehicleInfo.check.truck ?
                <div className={styles.checkBlock}>
                    <div className={styles.check}>
                        <p className={styles.p}>
                            貨車
                        </p>
                    </div>
                    <div className={styles.question}>
                        <FormControl >
                            <div className={styles.selectBox} >
                                <p className={styles.p}>總數量</p>
                                <Box width={50}>
                                    <Select
                                        labelId="truck-total-select-label"
                                        id="truck-total--select"
                                        name='truckTotal'
                                        value={survey.surveyvehicleInfo.truck.truckTotal}
                                        onChange={(event) => { 
                                            handleSelectStateChange(event,"truck")
                                        }}
                                        >
                                        <MenuItem value={999}>0</MenuItem>
                                        <MenuItem value={1}>1</MenuItem>
                                        <MenuItem value={2}>2</MenuItem>
                                        <MenuItem value={3}>3</MenuItem>
                                        <MenuItem value={4}>4</MenuItem>
                                        <MenuItem value={5}>5</MenuItem>
                                        <MenuItem value={6}>6</MenuItem>
                                        <MenuItem value={7}>7</MenuItem>
                                        <MenuItem value={8}>8</MenuItem>
                                        <MenuItem value={9}>9</MenuItem>
                                    </Select>
                                </Box>
                            </div>
                        </FormControl>
                        <FormControl >
                            <div className={styles.selectBox} >
                                <p className={styles.p}>當中，純電動車數量</p>
                                <Box width={50}>
                                    <Select
                                        labelId="truck-total-select-label"
                                        id="truck-total--select"
                                        name='truckEvTotal'
                                        value={survey.surveyvehicleInfo.truck.truckEvTotal}
                                        onChange={(event) => { 
                                            handleSelectStateChange(event,"truck")
                                        }}
                                        >
                                        <MenuItem value={999}>0</MenuItem>
                                        <MenuItem value={1}>1</MenuItem>
                                        <MenuItem value={2}>2</MenuItem>
                                        <MenuItem value={3}>3</MenuItem>
                                        <MenuItem value={4}>4</MenuItem>
                                        <MenuItem value={5}>5</MenuItem>
                                        <MenuItem value={6}>6</MenuItem>
                                        <MenuItem value={7}>7</MenuItem>
                                        <MenuItem value={8}>8</MenuItem>
                                        <MenuItem value={9}>9</MenuItem>
                                    </Select>
                                </Box>
                            </div>
                        </FormControl>
                    </div>
                </div>
                :
                null
           }

           
           {
                survey.surveyvehicleInfo.check.bike ?
                <div className={styles.checkBlock}>
                    <div className={styles.check}>
                        <p className={styles.p}>
                            單車
                        </p>
                    </div>
                    <div className={styles.question}>

                        <FormControl >
                            <div className={styles.selectBox} >
                                <p className={styles.p}>總數量</p>
                                <Box width={50}>
                                    <Select
                                        labelId="bike-total-select-label"
                                        id="bike-total--select"
                                        name='bikeTotal'
                                        value={survey.surveyvehicleInfo.bike.bikeTotal}
                                        onChange={(event) => { 
                                            handleSelectStateChange(event,"bike")
                                        }}
                                        >
                                        <MenuItem value={999}>0</MenuItem>
                                        <MenuItem value={1}>1</MenuItem>
                                        <MenuItem value={2}>2</MenuItem>
                                        <MenuItem value={3}>3</MenuItem>
                                        <MenuItem value={4}>4</MenuItem>
                                        <MenuItem value={5}>5</MenuItem>
                                        <MenuItem value={6}>6</MenuItem>
                                        <MenuItem value={7}>7</MenuItem>
                                        <MenuItem value={8}>8</MenuItem>
                                        <MenuItem value={9}>9</MenuItem>
                                    </Select>
                                </Box>
                            </div>
                        </FormControl>
                    </div>
                </div>
                :
                null
           } */}

                        <Button onClick={() => router.back()}>
                            previous
                        </Button>
                        <Button href={'/surveystudentinfo'}>
                            next
                        </Button>
                    </div>
                    :
                    null
            }

        </main>


    )
}



export default App;
