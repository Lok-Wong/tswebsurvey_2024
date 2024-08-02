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
import Slider from '@mui/material/Slider';
import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import Divider from '@mui/material/Divider';


function App() {
    const [progressBarValue, setProgressBarValue] = React.useState(10)

    const purposeOfVisitList = ["返工", "返學", "返屋企", "回家午休", "轉換交通工具", "載人", "購物", "飲食", "買餐點", "休閒/社交活動", "私人事務", "工作相關", "其他"]
    const mainMode = ["電單車（駕駛）", "私家車（駕駛）", "電單車（乘客）", "私家車（乘客）", "巴士", "輕軌", "一般的士", "電召的士", "員工巴士", "校車", "娛樂場接駁車", "步行", "其他"]
    const listRef = React.useRef(null)
    const [walkToVehicles, setWalkToVehicles] = React.useState(0)
    const [waittingTimes, setWaittingTimes] = React.useState(0)
    const [walkToBuildings, setWalkToBuildings] = React.useState(0)

    const sliderMarks = [
        {
            value: 0,
            label: '不需等待',
        },
        {
            value: 30,
            label: '>=30分鐘',
        },
        {
            value: 15,
            label: '15分鐘',
        },
    ]

    const _ODid = React.useMemo(() => {
        if (typeof window !== 'undefined') {

            const local_storage_ODid = sessionStorage.getItem('ODid');
            if (local_storage_ODid) {
                return local_storage_ODid
            }
        }
        return 1;
    }, [])
    const [times, setTimes] = React.useState(parseInt(_ODid))


    const initaSurvey = [{
        startPoint: "999",
        endPoint: "999",
        startTime: "999",
        endTime: "999",
        purposeOfVisit: "999",
        otherOfpurposeOfVisit: "999",
        mainMode: "999",
        motoMode: {
            walkToVehicle: "999",
            waittingTime: "999",
            walkToBuilding: "999",
        },
        carMode: {
            walkToVehicle: "999",
            waittingTime: "999",
            walkToBuilding: "999",
        },
        motoPassengerMode: {
            walkToVehicle: "999",
            waittingTime: "999",
            walkToBuilding: "999",
        },
        carPassengerMode: {
            walkToVehicle: "999",
            waittingTime: "999",
            walkToBuilding: "999",
        },
        busMode: {
            walkToVehicle: "999",
            waittingTime: "999",
            walkToBuilding: "999",
        },
        lightRailMode: {
            walkToVehicle: "999",
            waittingTime: "999",
            walkToBuilding: "999",
        },
        taxiMode: {
            walkToVehicle: "999",
            waittingTime: "999",
            walkToBuilding: "999",
        },
        staffBusMode: {
            walkToVehicle: "999",
            waittingTime: "999",
            walkToBuilding: "999",
        },
        schoolBusMode: {
            walkToVehicle: "999",
            waittingTime: "999",
            walkToBuilding: "999",
        },
        tourBusMode: {
            walkToVehicle: "999",
            waittingTime: "999",
            walkToBuilding: "999",
        },
        walkMode: "999",
        otherMode: "999",
        id: 0,
        startTime: new Date(),
        endTime: '999',
    }]

    const _initial_value = React.useMemo(() => {
        if (typeof window !== 'undefined') {

            const local_storage_value_str = sessionStorage.getItem('RsurveyOD');
            // If there is a value stored in localStorage, use that
            if (local_storage_value_str) {
                return JSON.parse(local_storage_value_str);
            }
        }
        // Otherwise use initial_value that was passed to the function
        return initaSurvey;
    }, []);

    const blankSurvey = {
        startPoint: "999",
        endPoint: "999",
        startTime: "999",
        endTime: "999",
        purposeOfVisit: "999",
        otherOfpurposeOfVisit: "999",
        mainMode: "999",
        motoMode: {
            walkToVehicle: "999",
            waittingTime: "999",
            walkToBuilding: "999",
        },
        carMode: {
            walkToVehicle: "999",
            waittingTime: "999",
            walkToBuilding: "999",
        },
        motoPassengerMode: {
            walkToVehicle: "999",
            waittingTime: "999",
            walkToBuilding: "999",
        },
        carPassengerMode: {
            walkToVehicle: "999",
            waittingTime: "999",
            walkToBuilding: "999",
        },
        busMode: {
            walkToVehicle: "999",
            waittingTime: "999",
            walkToBuilding: "999",
        },
        lightRailMode: {
            walkToVehicle: "999",
            waittingTime: "999",
            walkToBuilding: "999",
        },
        taxiMode: {
            walkToVehicle: "999",
            waittingTime: "999",
            walkToBuilding: "999",
        },
        staffBusMode: {
            walkToVehicle: "999",
            waittingTime: "999",
            walkToBuilding: "999",
        },
        schoolBusMode: {
            walkToVehicle: "999",
            waittingTime: "999",
            walkToBuilding: "999",
        },
        tourBusMode: {
            walkToVehicle: "999",
            waittingTime: "999",
            walkToBuilding: "999",
        },
        walkMode: "999",
        otherMode: "999",
        id: times,
        ODstartTime: new Date(),
        endTime: '999',
    }
    const dragItem = React.useRef(0);
    const draggedOverItem = React.useRef(0);

    const [surveyObject, setSurveyObject] = React.useState(_initial_value);

    const [isClient, setIsClient] = React.useState(false)

    React.useEffect(() => {
        setIsClient(true)
    }, [])

    function handleSort() {
        const itemClone = [...surveyObject];
        const temp = itemClone[dragItem.current];
        itemClone[dragItem.current] = itemClone[draggedOverItem.current];
        itemClone[draggedOverItem.current] = temp;
        setSurveyObject(itemClone);
    }
    function handleRemove(id, index) {
        if (surveyObject.length === 1) {
            alert("至少要有一個行程，（如沒有行程，請返回上頁並重新選擇第10 )題。")
            return;
        }
        if (window.confirm("確定要刪除第" + (index + 1) + "條行程嗎？") == false) {
            return;
        }
        const newList = surveyObject.filter((item) => item.id !== id);
        setSurveyObject(newList);
    }

    function handleInsertButton(index) {
        setTimes((prevState) => (prevState + 1))
        setSurveyObject((prevState) => ([...prevState.slice(0, index + 1),
            blankSurvey,
        ...prevState.slice(index + 1)
        ]))
        setScrollTo(false)
    }

    function handleAddButton() {
        if (surveyObject.length >= 12) {
            alert("最多只能有12個行程")
            return;
        }
        setTimes((prevState) => (prevState + 1))
        setSurveyObject((prevState) => ([...prevState,
            blankSurvey,
        ]))
        setScrollTo(true)
    }

    const handleNextButton = () => {
        sessionStorage.setItem("pathList", storedPathList)
        // router.push('/RsurveyCheckOd')
    }

    const [scrollTo, setScrollTo] = React.useState(false);

    const handleTimeChange = (event, name, index) => {
        const currentListIndex = surveyObject.findIndex((item) => item.id === index);
        const updatedList = Object.assign({}, surveyObject[currentListIndex]);
        updatedList[name] = event.$d;
        const newList = surveyObject.slice();
        newList[currentListIndex] = updatedList;
        setSurveyObject(newList);
    };

    const handleChange = (event, name, index) => {
        const currentListIndex = surveyObject.findIndex((item) => item.id === index);
        const updatedList = Object.assign({}, surveyObject[currentListIndex]);
        console.log("event", event)
        updatedList[name] = event.target.textContent;
        const newList = surveyObject.slice();
        newList[currentListIndex] = updatedList;
        setSurveyObject(newList);
    }

    React.useEffect(() => {
        if (scrollTo) {
            listRef.current.scrollIntoView({ behavior: 'smooth' });
            setScrollTo(false);
            return;
        }
    }, [scrollTo]);

    React.useEffect(() => {
        surveyObject && sessionStorage.setItem(("RsurveyOD"), JSON.stringify(surveyObject))
        surveyObject && sessionStorage.setItem(("ODid"), JSON.stringify(times))
        // setHelpText(blankHelpText)
    }, [surveyObject])

    React.useEffect(() => {
        console.log(surveyObject)
        console.log(surveyObject.length)
    }, [surveyObject]);

    const getListNumber = surveyObject.map((d, index) => {
        if (isClient) {
            return (
                <Button key={"btn" + index} className={styles.anchorListButton} onClick={() => scrollToSection(index)}>
                    {index + 1}
                </Button>
            )
        }
        return null

    })

    const listItems = surveyObject.map((d, index) =>
        <div key={index} >
            <div className={styles.odHeader}>
                <p className={styles.odHeaderP}>第{index + 1}個行程</p>
                <Button className={styles.odHeaderButton} onClick={() => handleRemove(d.id, index)}>
                    <DeleteIcon />
                </Button>
            </div>
            <div
                className={styles.question}
                key={d.id}
                draggable
                onDragStart={() => (dragItem.current = index)}
                onDragEnter={() => (draggedOverItem.current = index)}
                onDragEnd={handleSort}
                onDragOver={(e) => e.preventDefault()}
                id={"tab" + index}
            >
                {/* <div className={styles.removeButtomDiv}>
                    <p>第{index + 1}個行程</p>
                    <Button onClick={() => handleRemove(d.id, index)}>
                        X
                    </Button>
                </div> */}

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
                                <DesktopTimePicker
                                    name='startTime'
                                    ampm={false}
                                    value={dayjs(surveyObject[index].startTime)}
                                    onChange={(newValue) => { handleTimeChange(newValue, 'startTime', d.id) }}
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
                                <DesktopTimePicker
                                    ampm={false}
                                    value={dayjs(surveyObject[index].endTime)}
                                    onChange={(newValue) => handleTimeChange(newValue, 'endTime', index)}
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
                            onChange={(event) => {
                                handleChange(event, 'purposeOfVisit', d.id)
                            }
                            }
                            freeSolo
                            value={surveyObject[index].purposeOfVisit}
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
                    <FormControl className={styles.inlineQuestionFormControl}>
                        <FormLabel id="walkToVehicles-label"><h3>6.1) 步行至上車／等待交通工具的地點用了：</h3></FormLabel>
                        <div className={styles.sliderDiv}>
                            <Slider
                                sx={{ color: "#3E848C" }}
                                min={0}
                                max={30}
                                step={1}
                                valueLabelDisplay="auto"
                                aria-label="walkToVehicles"
                                name='walkToVehicles'
                                value={walkToVehicles}
                                marks={sliderMarks}
                                onChange={(value) => { setWalkToVehicles(value.target.value) }}
                            // valueLabelFormat={getAgeValueLabel}
                            // marks={ageMarks}
                            />

                        </div>

                        {/* <FormHelperText sx={{ color: 'red' }}>{helpText.walkToVehicle}</FormHelperText> */}
                    </FormControl>
                </div>

                <div className={styles.inlineQuestion}>
                    <FormControl className={styles.inlineQuestionFormControl}>
                        <FormLabel id="waittingTimes-label"><h3>6.2) 等待交通工具的時間（如適用）用了：</h3></FormLabel>
                        <div className={styles.sliderDiv}>
                            <Slider
                                sx={{ color: "#3E848C" }}
                                min={0}
                                max={30}
                                step={1}
                                valueLabelDisplay="auto"
                                aria-label="waittingTimes"
                                name='waittingTimes'
                                value={waittingTimes}
                                marks={sliderMarks}
                                onChange={(value) => { setWaittingTimes(value.target.value) }}
                            // valueLabelFormat={getAgeValueLabel}
                            // marks={ageMarks}
                            />

                        </div>
                        {/* <FormHelperText sx={{ color: 'red' }}>{helpText.walkToVehicle}</FormHelperText> */}
                    </FormControl>
                </div>

                <div className={styles.inlineQuestion}>
                    <FormControl className={styles.inlineQuestionFormControl}>
                        <FormLabel id="walkToBuildings-label"><h3>6.3) 下車後，步行至目的地的時間用了：</h3></FormLabel>
                        <div className={styles.sliderDiv}>
                            <Slider
                                sx={{ color: "#3E848C" }}
                                min={0}
                                max={30}
                                step={1}
                                valueLabelDisplay="auto"
                                aria-label="walkToBuildings"
                                name='walkToBuildings'
                                value={walkToBuildings}
                                marks={sliderMarks}
                                onChange={(value) => { setWalkToBuildings(value.target.value) }}
                            // valueLabelFormat={getAgeValueLabel}
                            // marks={ageMarks}
                            />

                        </div>
                        {/* <FormHelperText sx={{ color: 'red' }}>{helpText.walkToVehicle}</FormHelperText> */}
                    </FormControl>
                </div>
            </div>
            <div ref={listRef}></div>
            {index == surveyObject.length - 1 ?
                <div className={styles.dividerDiv}>
                    <Divider color="#3F858C" sx={{ borderBottomWidth: 3}}/>
                </div>
                :
                <div className={styles.increaseOdLine}>
                    <Button onClick={() => handleInsertButton(index)}>
                        <AddIcon />
                        <p className={styles.increaseOdLineText}>按此插入行程 </p>
                    </Button>
                </div>
            }

        </div>

    );

    React.useEffect(() => {
        setTimes(times)
    }, [times]);

    const scrollToSection = (id) => {
        const element = document.getElementById("tab" + id)
        element?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <main className={styles.main}>
            {
                isClient ?
                    <div>
                        <h1>
                            2.	行程表格
                        </h1>

                        <div>
                            {listItems}
                        </div>
                    </div>

                    :
                    null
            }
            <div className={styles.buttonGroup}>
                <div>
                    {getListNumber}
                </div>
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