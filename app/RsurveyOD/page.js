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
import LinearProgresss from '@/app/utils/progress';
import Snackbar from '@mui/material/Snackbar';
import Autocomplete from '@mui/material/Autocomplete';


function App() {
    const [progressBarValue, setProgressBarValue] = React.useState(10)

    const purposeOfVisitList = ["返工", "返學", "返屋企", "回家午休", "轉換交通工具", "載人", "購物", "飲食", "買餐點", "休閒/社交活動", "私人事務", "工作相關"]
    const mainMode = ["電單車（駕駛）", "私家車（駕駛）", "電單車（乘客）", "私家車（乘客）", "巴士", "輕軌", "一般的士", "電召的士", "員工巴士", "校車", "娛樂場接駁車", "步行"]

    const listRef = React.useRef(null)

    const [times, setTimes] = React.useState(1)
    const initaSurvey = {
        startPoint: "null",
        endPoint: "null",
        startTime: "null",
        endTime: "null",
        purposeOfVisit: "null",
        otherOfpurposeOfVisit: "null",
        mainMode: "null",
        motoMode: {
            walkToVehicle: "null",
            waittingTime: "null",
            walkToBuilding: "null",
        },
        carMode: {
            walkToVehicle: "null",
            waittingTime: "null",
            walkToBuilding: "null",
        },
        motoPassengerMode: {
            walkToVehicle: "null",
            waittingTime: "null",
            walkToBuilding: "null",
        },
        carPassengerMode: {
            walkToVehicle: "null",
            waittingTime: "null",
            walkToBuilding: "null",
        },
        busMode: {
            walkToVehicle: "null",
            waittingTime: "null",
            walkToBuilding: "null",
        },
        lightRailMode: {
            walkToVehicle: "null",
            waittingTime: "null",
            walkToBuilding: "null",
        },
        taxiMode: {
            walkToVehicle: "null",
            waittingTime: "null",
            walkToBuilding: "null",
        },
        staffBusMode: {
            walkToVehicle: "null",
            waittingTime: "null",
            walkToBuilding: "null",
        },
        schoolBusMode: {
            walkToVehicle: "null",
            waittingTime: "null",
            walkToBuilding: "null",
        },
        tourBusMode: {
            walkToVehicle: "null",
            waittingTime: "null",
            walkToBuilding: "null",
        },
        walkMode: "null",
        otherMode: "null",
        id: 0,
        startTime: new Date(),
        endTime: 'null',
    }
    const blankSurvey = {
        startPoint: "null",
        endPoint: "null",
        startTime: "null",
        endTime: "null",
        purposeOfVisit: "null",
        otherOfpurposeOfVisit: "null",
        mainMode: "null",
        motoMode: {
            walkToVehicle: "null",
            waittingTime: "null",
            walkToBuilding: "null",
        },
        carMode: {
            walkToVehicle: "null",
            waittingTime: "null",
            walkToBuilding: "null",
        },
        motoPassengerMode: {
            walkToVehicle: "null",
            waittingTime: "null",
            walkToBuilding: "null",
        },
        carPassengerMode: {
            walkToVehicle: "null",
            waittingTime: "null",
            walkToBuilding: "null",
        },
        busMode: {
            walkToVehicle: "null",
            waittingTime: "null",
            walkToBuilding: "null",
        },
        lightRailMode: {
            walkToVehicle: "null",
            waittingTime: "null",
            walkToBuilding: "null",
        },
        taxiMode: {
            walkToVehicle: "null",
            waittingTime: "null",
            walkToBuilding: "null",
        },
        staffBusMode: {
            walkToVehicle: "null",
            waittingTime: "null",
            walkToBuilding: "null",
        },
        schoolBusMode: {
            walkToVehicle: "null",
            waittingTime: "null",
            walkToBuilding: "null",
        },
        tourBusMode: {
            walkToVehicle: "null",
            waittingTime: "null",
            walkToBuilding: "null",
        },
        walkMode: "null",
        otherMode: "null",
        id: times,
        startTime: new Date(),
        endTime: 'null',
    }
    const [surveyObject, setSurveyObject] = React.useState(
        [
            initaSurvey
        ]
    )
    const [startTime, setStartTime] = React.useState(dayjs());
    const dragItem = React.useRef(0);
    const draggedOverItem = React.useRef(0);


    function handleSort() {
        const itemClone = [...surveyObject];
        const temp = itemClone[dragItem.current];
        itemClone[dragItem.current] = itemClone[draggedOverItem.current];
        itemClone[draggedOverItem.current] = temp;
        setSurveyObject(itemClone);
    }
    function handleRemove(id, index) {
        if (window.confirm("確定要刪除第" + (index + 1) + "條行程嗎？") == false) {
            return;
        }
        const newList = surveyObject.filter((item) => item.id !== id);
        setSurveyObject(newList);
    }

    function handleInsertButton(index) {
        setTimes((prevState) => (prevState + 1))
        setSurveyObject((prevState) => ([...prevState.slice(0, index+1),
            blankSurvey,
        ...prevState.slice(index+1)
        ]))
        setScrollTo(false)

    }

    function handleAddButton() {
        setTimes((prevState) => (prevState + 1))
        setSurveyObject((prevState) => ([...prevState,
            blankSurvey,
        ]))
        setScrollTo(true)
        console.log(surveyObject)
    }

    const handleNextButton = () => {

        sessionStorage.setItem("pathList", storedPathList)
        // router.push('/RsurveyCheckOd')

    }

    const [scrollTo, setScrollTo] = React.useState(false);

    React.useEffect(() => {
        if (scrollTo) {
            listRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [scrollTo]);

    React.useEffect(() => {
        console.log(surveyObject)
    }, [surveyObject]);

    const listItems = surveyObject.map((d, index) =>
        <div key={index} >
            <div
                className={styles.question}
                key={d.id}
                draggable
                onDragStart={() => (dragItem.current = index)}
                onDragEnter={() => (draggedOverItem.current = index)}
                onDragEnd={handleSort}
                onDragOver={(e) => e.preventDefault()}
            >
                <div className={styles.removeButtomDiv}>
                    <p>第{index + 1}個行程 {d.id}</p>
                    <Button onClick={() => handleRemove(d.id, index)}>
                        X
                    </Button>
                </div>

                <div className={styles.inlineQuestion}>
                    <FormControl>
                        <FormLabel id="startPoint">1) 出行地點</FormLabel>
                        <Button>
                            touch and choose loaction
                        </Button>
                    </FormControl>
                </div>
                <div className={styles.inlineQuestion}>
                    <FormControl>
                        <FormLabel id="startTime">2) 出發時間</FormLabel>
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

                <div className={styles.inlineQuestion}>
                    <FormControl>
                        <FormLabel id="endPoint">3) 出行目的地</FormLabel>
                        <Button>
                            touch and choose loaction
                        </Button>
                    </FormControl>
                </div>
                <div className={styles.inlineQuestion}>
                    <FormControl>
                        <FormLabel id="endTime">4) 到達時間</FormLabel>
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
                <div className={styles.inlineQuestion}>
                    <FormControl>
                        <FormLabel id="purposeOfVisit">5) 出行目的</FormLabel>
                        <Autocomplete
                            disablePortal
                            id="purposeOfVisit-box"
                            sx={{ width: 300 }}
                            options={purposeOfVisitList}
                            freeSolo
                            renderInput={(params) => <TextField {...params} />}
                        />
                        {/* <RadioGroup
                            aria-labelledby="purposeOfVisit-label"
                            name="purposeOfVisit"
                        >
                            <FormControlLabel sx={{ color: "black" }} value="返工" control={<Radio sx={{ '&, &.Mui-checked': { color: '#3E848C', }, }} />} label="返工" />
                            <FormControlLabel sx={{ color: "black" }} value="返學" control={<Radio sx={{ '&, &.Mui-checked': { color: '#3E848C', }, }} />} label="返學" />
                            <FormControlLabel sx={{ color: "black" }} value="返屋企" control={<Radio sx={{ '&, &.Mui-checked': { color: '#3E848C', }, }} />} label="返屋企" />
                            <FormControlLabel sx={{ color: "black" }} value="回家午休" control={<Radio sx={{ '&, &.Mui-checked': { color: '#3E848C', }, }} />} label="回家午休" />
                            <FormControlLabel sx={{ color: "black" }} value="轉換交通工具" control={<Radio sx={{ '&, &.Mui-checked': { color: '#3E848C', }, }} />} label="轉換交通工具" />
                            <FormControlLabel sx={{ color: "black" }} value="載人" control={<Radio sx={{ '&, &.Mui-checked': { color: '#3E848C', }, }} />} label="載人" />
                            <FormControlLabel sx={{ color: "black" }} value="購物" control={<Radio sx={{ '&, &.Mui-checked': { color: '#3E848C', }, }} />} label="購物" />
                            <FormControlLabel sx={{ color: "black" }} value="飲食" control={<Radio sx={{ '&, &.Mui-checked': { color: '#3E848C', }, }} />} label="飲食" />
                            <FormControlLabel sx={{ color: "black" }} value="買餐點" control={<Radio sx={{ '&, &.Mui-checked': { color: '#3E848C', }, }} />} label="買餐點" />
                            <FormControlLabel sx={{ color: "black" }} value="休閒/社交活動" control={<Radio sx={{ '&, &.Mui-checked': { color: '#3E848C', }, }} />} label="休閒/社交活動" />
                            <FormControlLabel sx={{ color: "black" }} value="私人事務" control={<Radio sx={{ '&, &.Mui-checked': { color: '#3E848C', }, }} />} label="私人事務" />
                            <FormControlLabel sx={{ color: "black" }} value="工作相關" control={<Radio sx={{ '&, &.Mui-checked': { color: '#3E848C', }, }} />} label="工作相關" />
                            <FormControlLabel sx={{ color: "black" }} value="其他" control={<Radio sx={{ '&, &.Mui-checked': { color: '#3E848C', }, }} />} label="其他" />
                            <Box
                                component="form"
                                sx={{
                                    '& > :not(style)': { m: 0.5, width: '10rem' },
                                }}
                                noValidate
                                autoComplete="off"
                            >
                                <TextField
                                    inputProps={{ maxLength: 10 }}
                                    id="purposeOfVisit-other-textfill"
                                    label="其他"
                                    variant="filled"
                                    name='otherOfpurposeOfVisit'
                                />
                            </Box>
                        </RadioGroup> */}
                    </FormControl>
                </div>
                <div className={styles.inlineQuestion}>
                    <FormControl>
                        <FormLabel id="mainMode">6) 主要交通方式:</FormLabel>
                        <Autocomplete
                            disablePortal
                            id="mainMode-box"
                            sx={{ width: 300 }}
                            options={mainMode}
                            freeSolo
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </FormControl>
                </div>
                <div className={styles.inlineQuestion}>
                    <FormControl>
                        <FormLabel id="walkToVehicle">6.1) 步行至上車／等待交通工具的地點用了：</FormLabel>
                        <Box
                            component="form"
                            sx={{
                                '& > :not(style)': { m: 0.5, width: '10rem' },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField
                                inputProps={{ maxLength: 10 }}
                                id="walkToVehicle-textfill"
                                variant="filled"
                                name='walkToVehicle'
                            />
                        </Box>
                    </FormControl>
                </div>
                <div className={styles.inlineQuestion}>
                    <FormControl>
                        <FormLabel id="waittingTime">6.2) 等待交通工具的時間（如適用）用了：</FormLabel>
                        <Box
                            component="form"
                            sx={{
                                '& > :not(style)': { m: 0.5, width: '10rem' },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField
                                inputProps={{ maxLength: 10 }}
                                id="waittingTime-textfill"
                                variant="filled"
                                name='waittingTime'
                            />
                        </Box>
                    </FormControl>
                </div>
                <div className={styles.inlineQuestion}>
                    <FormControl>
                        <FormLabel id="walkToBuilding">6.3) 下車後，步行至目的地的時間用了：</FormLabel>
                        <Box
                            component="form"
                            sx={{
                                '& > :not(style)': { m: 0.5, width: '10rem' },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField
                                inputProps={{ maxLength: 10 }}
                                id="walkToBuilding-textfill"
                                variant="filled"
                                name='walkToBuilding'
                            />
                        </Box>
                    </FormControl>
                </div>
            </div>
            <div ref={listRef}></div>
            {index == surveyObject.length - 1 ? null :
                <Button onClick={() => handleInsertButton(index)}>
                    按此插入行程
                </Button>
            }

        </div>

    );

    React.useEffect(() => {
        setTimes(times)
    }, [times]);


    return (
        <main className={styles.main}>
            <div>
                <h1>
                    2.	行程表格
                </h1>
            </div>
            <div>
                {listItems}
            </div>


            <div className={styles.buttonGroup}>
                <LinearProgresss values={progressBarValue} />
                <div style={{ flexDirection: "row", display: "flex", justifyContent: 'space-between', width: '100%' }}>

                    <Button className={styles.buttonStyle}
                        onClick={() => router.back()}>
                        上一頁
                    </Button>

                    <div>
                        <Button className={styles.buttonStyle} onClick={handleAddButton}>
                            新增行程
                        </Button>
                    </div>

                    <Button className={styles.buttonStyle}
                        onClick={handleNextButton}>
                        下一頁
                    </Button>
                </div>
            </div>

        </main>
    )
}
export default App