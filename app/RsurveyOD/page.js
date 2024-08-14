'use client'
import * as React from 'react';
import styles from "./page.module.css";
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
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
import FormHelperText from '@mui/material/FormHelperText';
import MapSelections from "../mapSelection/page";


function App() {
    const [progressBarValue, setProgressBarValue] = React.useState(10)

    const purposeOfVisitList = ["返工", "返學", "返屋企", "回家午休", "轉換交通工具", "載人", "購物", "飲食", "買餐點", "休閒/社交活動", "私人事務", "工作相關", "其他"]
    const mainMode = ["電單車（駕駛）", "私家車（駕駛）", "電單車（乘客）", "私家車（乘客）", "巴士", "輕軌", "一般的士", "電召的士", "員工巴士", "校車", "娛樂場接駁車", "步行", "其他"]
    const listRef = React.useRef(null)
    const [walkToVehicles, setWalkToVehicles] = React.useState(0)
    const [waittingTimes, setWaittingTimes] = React.useState(0)
    const [walkToBuildings, setWalkToBuildings] = React.useState(0)
    const [selectedDivIndex, setSelectedDivIndex] = React.useState(0)



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
        startTime: "",
        endTime: "",
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
        onlineTaxiMode: {
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
        ODstartTime: new Date(),
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



    const initalBlankHelpText = [{
        startPoint: "",
        endPoint: "",
        startTime: "",
        endTime: "",
        purposeOfVisit: "",
        mainMode: "",
        walkToVehicle: "",
        waittingTime: "",
        walkToBuilding: "",
        id: 0,
    }]

    const blankHelpText = {
        startPoint: "",
        endPoint: "",
        startTime: "",
        endTime: "",
        purposeOfVisit: "",
        mainMode: "",
        walkToVehicle: "",
        waittingTime: "",
        walkToBuilding: "",
        id: times,
    }

    const _initial_error_value = React.useMemo(() => {
        if (typeof window !== 'undefined') {

            const local_storage_value_str = sessionStorage.getItem('errorObj');
            // If there is a value stored in localStorage, use that
            if (local_storage_value_str) {
                return JSON.parse(local_storage_value_str);
            }
        }
        // Otherwise use initial_value that was passed to the function
        return initalBlankHelpText;
    }, []);

    const blankSurvey = {
        startPoint: "999",
        endPoint: "999",
        startTime: "",
        endTime: "",
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
        onlineTaxiMode: {
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
    }

    const [helpText, setHelpText] = React.useState(_initial_error_value)
    const dragItem = React.useRef(0);
    const draggedOverItem = React.useRef(0);
    const componentRef = React.useRef(null);

    const [surveyObject, setSurveyObject] = React.useState(_initial_value);

    const [isClient, setIsClient] = React.useState(false)
    const [runCheck, setRunCheck] = React.useState(false)

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
        const newErrorList = helpText.filter((item) => item.id !== id);
        setHelpText(newErrorList);

    }

    function handleInsertButton(index) {
        setTimes((prevState) => (prevState + 1))
        setSurveyObject((prevState) => ([...prevState.slice(0, index + 1),
            blankSurvey,
        ...prevState.slice(index + 1)
        ]))
        setHelpText((prevState) => ([...prevState.slice(0, index + 1),
            blankHelpText,
        ...prevState.slice(index + 1)
        ]))
        setScrollTo(false)
    }

    function checkError() {
    const checkErrorObj = (name, erroText, id) => {
        const currentListIndex = helpText.findIndex((item) => item.id === id);
        const updatedList = Object.assign({}, helpText[currentListIndex]);
        updatedList[name] = erroText;
        const newList = helpText.slice();
        newList[currentListIndex] = updatedList;
        setHelpText(newList);
    }
        var error = false
        surveyObject.map((d, index) => {
            if (!d.startTime) {
                error = true
                checkErrorObj("startTime", "請填寫出發時間", d.id)
            }
            if (!d.endTime) {
                error = true
                checkErrorObj("endTime", "請填寫到達時間", d.id)
            }
            if (dayjs(d.endTime) < dayjs(d.startTime)) {
                error = true
                checkErrorObj("endTime", "到達時間不能早於出發時間", d.id)
            }
            if (dayjs(d.endTime).diff(dayjs(d.startTime), "minute") >= 120) {
                error = true
                checkErrorObj("endTime", `第${index + 1}行程時間不可多於120分鐘`, d.id)
            }
            if (index != 0) {
                if (dayjs(d.startTime) < dayjs(surveyObject[index - 1]["endTime"])) {
                    error = true
                    checkErrorObj("startTime", `第${index + 1}行程出發時間不能早於第${index}行程的到達時間`, d.id)
                }
                else {
                    checkErrorObj("", "startTime", d.id)
                }
            }
         })
         return error
    }


    function handleAddButton() {
        if (surveyObject.length >= 12) {
            alert("最多只能有12個行程")
            return;
        }

        if (checkError()) {
            return;
        }

        setTimes((prevState) => (prevState + 1))
        setSurveyObject((prevState) => ([...prevState,
            blankSurvey,
        ]))
        setHelpText((prevState) => ([...prevState,
            blankHelpText,
        ]))
        setScrollTo(true)
    }

    const changeModeName = (index) => {
        var mainName = surveyObject[index]["mainMode"]
        switch (mainName) {
            case "電單車（駕駛）":
                return "motoMode"
            case "私家車（駕駛）":
                return "carMode"
            case "電單車（乘客）":
                return "motoPassengerMode"
            case "私家車（乘客）":
                return "carPassengerMode"
            case "巴士":
                return "busMode"
            case "輕軌":
                return "lightRailMode"
            case "一般的士":
                return "taxiMode"
            case "電召的士":
                return "onlineTaxiMode"
            case "員工巴士":
                return "staffBusMode"
            case "校車":
                return "schoolBusMode"
            case "娛樂場接駁車":
                return "tourBusMode"
            case "步行":
                return "walkMode"
            default :
                return "otherMode"
        }
    }

    const getObjNameForMode = (index, name) => {
        if (isClient) {
            if (surveyObject[index]["mainMode"] == "999" || !surveyObject[index]["mainMode"]) {
                return 0
            }
            const modeName = changeModeName(index)
            return surveyObject[index][modeName][name]
        }
    }

    function setScaleNumber(value, name, id, index) {
        var mainModeObjectName = changeModeName(index)
        const currentListIndex = surveyObject.findIndex((item) => item.id === id);
        const updatedList = Object.assign({}, surveyObject[currentListIndex]);
        updatedList[mainModeObjectName][name] = value.target.value;
        const newList = surveyObject.slice();
        newList[currentListIndex] = updatedList;
        setSurveyObject(newList);
    }

    const handleNextButton = () => {
        sessionStorage.setItem("pathList", storedPathList)
        // router.push('/RsurveyCheckOd')
    }

    const [scrollTo, setScrollTo] = React.useState(false);

    const handleTimeChange = (event, name, index) => {
        if (!event.$d) {
            const currentListIndex = surveyObject.findIndex((item) => item.id === index);
            const updatedList = Object.assign({}, surveyObject[currentListIndex]);
            updatedList[name] = event;
            const newList = surveyObject.slice();
            newList[currentListIndex] = updatedList;
            setSurveyObject(newList);
            return;
        }
        const currentListIndex = surveyObject.findIndex((item) => item.id === index);
        const updatedList = Object.assign({}, surveyObject[currentListIndex]);
        updatedList[name] = event.$d;
        const newList = surveyObject.slice();
        newList[currentListIndex] = updatedList;
        setSurveyObject(newList);
        return;
    };

    const handleChange = (inputValue, name, index) => {
        const currentListIndex = surveyObject.findIndex((item) => item.id === index);
        const updatedList = Object.assign({}, surveyObject[currentListIndex]);
        updatedList[name] = inputValue;
        console.log("updatedList", updatedList)
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
    }, [surveyObject])

    React.useEffect(() => {
        console.log("surveyObject", surveyObject)
        console.log("helpText", helpText)
    }, [surveyObject]);

    React.useEffect(() => {
        if (isClient) {
            console.log("componentRef", componentRef)
        }
    }, [componentRef]);

    // React.useEffect(() => {
    //     surveyObject.map((d, index) => {
    //         checkTimeWhenClose(d.id, index)
    //     })
    // },[runCheck])

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


    const renderGetpreviousEndTime = (index) => {
        const getPreviousEndTime = (index) => {
            if (surveyObject[index - 1]["endTime"]) {
                const previousEndTimes = surveyObject[index - 1]["endTime"]
                handleTimeChange(previousEndTimes, 'startTime', surveyObject[index].id)
                checkTimeWhenClose(surveyObject[index].id, index)
                return;
            }

        }
        if (index == 0) {
            return null
        }

        return (
            <button onClick={() => getPreviousEndTime(index)} >
                <p>
                    getPreviousEndTime
                </p>
            </button>
        )
    }

    const checkTimeWhenClose = (id, index) => {

        const changeObj = (erroText, name, id) => {
            setHelpText((prevState) => {
                const currentListIndex = prevState.findIndex((item) => item.id === id);
                const updatedList = Object.assign({}, prevState[currentListIndex]);
                updatedList[name] = erroText;
                const newList = prevState.slice();
                newList[currentListIndex] = updatedList;
                return newList;
            })
            // const currentListIndex = helpText.findIndex((item) => item.id === id);
            // const updatedList = Object.assign({}, helpText[currentListIndex]);
            // updatedList[name] = erroText;
            // const newList = helpText.slice();
            // newList[currentListIndex] = updatedList;
            // setHelpText(newList);
        }

        const initialErrorText = () => {
            changeObj("", "endTime", id)
            changeObj("", "startTime", id)
        }

        initialErrorText()

        if (!dayjs(surveyObject[index]["startTime"])) {
            changeObj("請填寫出發時間", "startTime", id)
        } 

        if (!dayjs(surveyObject[index]["endTime"])) {
            changeObj("請填寫到達時間", "endTime", id)
        } 

        if (index != 0) {
            if (dayjs(surveyObject[index]["startTime"]) < dayjs(surveyObject[index - 1]["endTime"])) {
                console.log("abccc")
                changeObj(`第${index+1}行程出發時間不能早於第${index}行程的到達時間`, "startTime", id)
            } 
        }

        if (dayjs(surveyObject[index]["endTime"]) < dayjs(surveyObject[index]["startTime"])) {
            changeObj("到達時間不能早於2)出發時間", "endTime", id)
        } 


        if (dayjs(surveyObject[index]["endTime"]).diff(dayjs(surveyObject[index]["startTime"]),"minute") >= 120 ) {
            changeObj(`第${index+1}行程時間不可多於120分鐘`, "endTime", id)
        }

        return;
    }

    const renderDifferModeSlider = (d,index) => {
        if (surveyObject[index]["mainMode"] == "999"||surveyObject[index]["mainMode"] == "其他" || surveyObject[index]["mainMode"] == "步行" || !surveyObject[index]["mainMode"]) {
            return null
        }

        if (surveyObject[index]["mainMode"] == "電單車（駕駛）" || surveyObject[index]["mainMode"] == "私家車（駕駛）") {
            return (
                <div>
                <div className={styles.inlineQuestion}>
                    <FormControl className={styles.inlineQuestionFormControl}>
                        <FormLabel id="walkToVehicle-label"><h3>6.1) 步行至上車／等待交通工具的地點用了：</h3></FormLabel>
                        <div className={styles.sliderDiv}>
                            <Slider
                                sx={{ color: "#3E848C" }}
                                min={0}
                                max={30}
                                step={1}
                                valueLabelDisplay="auto"
                                aria-label="walkToVehicle"
                                name='walkToVehicle'
                                marks={sliderMarks}
                                value={getObjNameForMode(index, "walkToVehicle")}
                                onChange={(value) => { setScaleNumber(value, "walkToVehicle", d.id, index) }}
                            // valueLabelFormat={getAgeValueLabel}
                            // marks={ageMarks}
                            />
                        </div>

                        {/* <FormHelperText sx={{ color: 'red' }}>{helpText.walkToVehicle}</FormHelperText> */}
                    </FormControl>
                </div>
                <FormHelperText sx={{ color: 'red' }}>abc</FormHelperText>

                <div className={styles.inlineQuestion}>
                    <FormControl className={styles.inlineQuestionFormControl}>
                        <FormLabel id="walkToBuilding-label"><h3>6.3) 下車後，步行至目的地的時間用了：</h3></FormLabel>
                        <div className={styles.sliderDiv}>
                            <Slider
                                sx={{ color: "#3E848C" }}
                                min={0}
                                max={30}
                                step={1}
                                valueLabelDisplay="auto"
                                aria-label="walkToBuilding"
                                name='walkToBuilding'
                                marks={sliderMarks}
                                value={getObjNameForMode(index, "walkToBuilding")}
                                onChange={(value) => { setScaleNumber(value, "walkToBuilding", d.id, index) }}
                            // valueLabelFormat={getAgeValueLabel}
                            // marks={ageMarks}
                            />

                        </div>
                        {/* <FormHelperText sx={{ color: 'red' }}>{helpText.walkToVehicle}</FormHelperText> */}
                    </FormControl>
                </div>
                <FormHelperText sx={{ color: 'red' }}>abc</FormHelperText>
            </div>
            )
        }

        return(
            <div>
            <div className={styles.inlineQuestion}>
                <FormControl className={styles.inlineQuestionFormControl}>
                    <FormLabel id="walkToVehicle-label"><h3>6.1) 步行至上車／等待交通工具的地點用了：</h3></FormLabel>
                    <div className={styles.sliderDiv}>
                        <Slider
                            sx={{ color: "#3E848C" }}
                            min={0}
                            max={30}
                            step={1}
                            valueLabelDisplay="auto"
                            aria-label="walkToVehicle"
                            name='walkToVehicle'
                            marks={sliderMarks}
                            value={getObjNameForMode(index, "walkToVehicle")}
                            onChange={(value) => { setScaleNumber(value, "walkToVehicle", d.id, index) }}
                        // valueLabelFormat={getAgeValueLabel}
                        // marks={ageMarks}
                        />
                    </div>

                    {/* <FormHelperText sx={{ color: 'red' }}>{helpText.walkToVehicle}</FormHelperText> */}
                </FormControl>
            </div>
            <FormHelperText sx={{ color: 'red' }}>abc</FormHelperText>

            <div className={styles.inlineQuestion}>
                <FormControl className={styles.inlineQuestionFormControl}>
                    <FormLabel id="waittingTime-label"><h3>6.2) 等待交通工具的時間（如適用）用了：</h3></FormLabel>
                    <div className={styles.sliderDiv}>
                        <Slider
                            sx={{ color: "#3E848C" }}
                            min={0}
                            max={30}
                            step={1}
                            valueLabelDisplay="auto"
                            aria-label="waittingTime"
                            name='waittingTime'
                            marks={sliderMarks}
                            value={getObjNameForMode(index, "waittingTime")}
                            onChange={(value) => { setScaleNumber(value, "waittingTime", d.id, index) }}
                        // valueLabelFormat={getAgeValueLabel}
                        // marks={ageMarks}
                        />

                    </div>
                    {/* <FormHelperText sx={{ color: 'red' }}>{helpText.walkToVehicle}</FormHelperText> */}
                </FormControl>
            </div>
            <FormHelperText sx={{ color: 'red' }}>abc</FormHelperText>

            <div className={styles.inlineQuestion}>
                <FormControl className={styles.inlineQuestionFormControl}>
                    <FormLabel id="walkToBuilding-label"><h3>6.3) 下車後，步行至目的地的時間用了：</h3></FormLabel>
                    <div className={styles.sliderDiv}>
                        <Slider
                            sx={{ color: "#3E848C" }}
                            min={0}
                            max={30}
                            step={1}
                            valueLabelDisplay="auto"
                            aria-label="walkToBuilding"
                            name='walkToBuilding'
                            marks={sliderMarks}
                            value={getObjNameForMode(index, "walkToBuilding")}
                            onChange={(value) => { setScaleNumber(value, "walkToBuilding", d.id, index) }}
                        // valueLabelFormat={getAgeValueLabel}
                        // marks={ageMarks}
                        />

                    </div>
                    {/* <FormHelperText sx={{ color: 'red' }}>{helpText.walkToVehicle}</FormHelperText> */}
                </FormControl>
            </div>
            <FormHelperText sx={{ color: 'red' }}>abc</FormHelperText>
        </div>
        )
        
    }

    var splitKey;

    const handleChangeData = () => {
        Object.keys(sessionStorage).map(key => {
            if (key.indexOf("startPoint") > 0 || key.indexOf("endPoint") > 0) {
                splitKey = key.split("-");
                for (var i = 0; i < surveyObject.length; i++){
                    if (surveyObject[i].id == splitKey[0])
                        surveyObject[i][splitKey[1]] = JSON.parse(sessionStorage[key]);
                }
            }
        })
    
        //console.log(surveyObject.length)
        return;
    }

    const handleProps = (newRoute, newLabel) => {
        props.route = newRoute;
        props.label = newLabel;
    }

    let props = {
        route: surveyObject[0],
        label: "startPoint"
    }

    const getMapSelectedText = (location) => {
        //console.log(props.label);
        if (location == 999) {
            return (
                <p>請選擇您的地址</p>
            )
        }

        if (location.method == "input") {
            return (
            location.name
            )
        }

        if (location.method == "click") {
            return (
            location.regeocode.formattedAddress
            )
        }

        if (location.method == "autoComplete") {
            return (
            location.poi.name
            )
        }

        if (location.method == "geolocation") {
            return (
            location.name.formattedAddress
            )
        }

        return null
    }

    const listItems = surveyObject.map((d, index) =>
        <div key={d.id}>
            <div className={selectedDivIndex === index ? styles.selectedDiv : null}
                key={index}
                id={"tab" + index}
                onTouchStart={() => setSelectedDivIndex(index)}
                onTouchMove={() => setSelectedDivIndex(index)}
                onMouseEnter={() => setSelectedDivIndex(index)}
            >
                <div className={styles.odHeader}>
                    <div ref={listRef}></div>
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
                >
                    <div className={styles.inlineQuestion} onBlur={handleChangeData()}>
                        <FormControl>
                            <FormLabel id="startPoint">1) 出行地點</FormLabel>
                            <div className={styles.mapSelect}>
                                <div className={styles.mapText}>{getMapSelectedText(surveyObject[index].startPoint)}</div>
                                {handleProps(surveyObject[index], "startPoint")}
                            </div>
                            <MapSelections {...props} />
                        </FormControl>
                    </div>
                    <FormHelperText sx={{ color: 'red' }}>aa</FormHelperText>
                    <div className={styles.inlineQuestion}>
                        <FormControl>
                            <FormLabel id="startTime">2) 出發時間</FormLabel>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer className={styles.question} components={['TimePicker']}>
                                    <DesktopTimePicker
                                        onAccept={() => {checkTimeWhenClose(d.id, index)}}
                                        closeOnSelect={true}
                                        name='startTime'
                                        ampm={false}
                                        value={dayjs(surveyObject[index].startTime)}
                                        onChange={(newValue) => {handleTimeChange(newValue, 'startTime', d.id) }}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                            {renderGetpreviousEndTime(index)}
                        </FormControl>
                    </div>

                    <FormHelperText sx={{ color: 'red' }}>{helpText[index].startTime}</FormHelperText>

                    <div className={styles.inlineQuestion}>
                        <FormControl>
                            <FormLabel id="endPoint">3) 出行目的地</FormLabel>
                            <div className={styles.mapSelect}>
                                <div className={styles.mapText}>{getMapSelectedText(surveyObject[index].endPoint)}</div>
                                {handleProps(surveyObject[index], "endPoint")}
                            </div>
                            <MapSelections {...props} />
                        </FormControl>
                    </div>
                    <FormHelperText sx={{ color: 'red' }}>abc</FormHelperText>
                    <div className={styles.inlineQuestion}>
                        <FormControl>
                            <FormLabel id="endTime">4) 到達時間</FormLabel>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer className={styles.question} components={['TimePicker']}>
                                    <DesktopTimePicker
                                        onAccept={() => {checkTimeWhenClose(d.id, index)}}
                                        closeOnSelect={true}
                                        ampm={false}
                                        value={dayjs(surveyObject[index].endTime)}
                                        onChange={(newValue) => { handleTimeChange(newValue, 'endTime', d.id) }}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                        </FormControl>
                    </div>

                    <p>
                        {JSON.stringify(surveyObject[index].startTime)}<br />
                        {JSON.stringify(surveyObject[index].endTime)}
                    </p>

                    <FormHelperText sx={{ color: 'red' }}>{helpText[index].endTime}</FormHelperText>

                    <div className={styles.inlineQuestion}>
                        <FormControl>
                            <FormLabel id="purposeOfVisit">5) 出行目的</FormLabel>
                            <Autocomplete
                                disablePortal
                                id="purposeOfVisit-box"
                                sx={{ width: 300 }}
                                options={purposeOfVisitList}
                                // onChange={(event,inputValue) => {
                                //     console.log("inputValue", inputValue)
                                //     // handleChange(event, 'purposeOfVisit', d.id)
                                // }}
                                onInputChange={(event,inputValue) => {
                                    handleChange(inputValue, 'purposeOfVisit', d.id)
                                }}
                                freeSolo
                                value={surveyObject[index].purposeOfVisit}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </FormControl>
                    </div>
                    <FormHelperText sx={{ color: 'red' }}>abc</FormHelperText>

                    <div className={styles.inlineQuestion}>
                        <FormControl>
                            <FormLabel id="mainMode">6) 主要交通方式:</FormLabel>
                            <Autocomplete
                                // onChange={(event,inputValue) => {
                                //     // handleChange(inputValue, 'mainMode', d.id)
                                // }}
                                onInputChange={(event,inputValue) => {
                                    handleChange(inputValue, 'mainMode', d.id)
                                }}
                                disablePortal
                                id="mainMode-box"
                                sx={{ width: 300 }}
                                options={mainMode}
                                value={surveyObject[index].mainMode}
                                freeSolo
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </FormControl>
                    </div>
                    <FormHelperText sx={{ color: 'red' }}>abc</FormHelperText>
                    {renderDifferModeSlider(d,index)}
                </div>
            </div>
            <div>
                {index == surveyObject.length - 1 ?
                    <div className={styles.dividerDiv}>
                        <Divider color="#3F858C" sx={{ borderBottomWidth: 3 }} />
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
        </div>

    );



    React.useEffect(() => {
        setTimes(times)
    }, [times]);

    React.useEffect(() => {
        helpText && sessionStorage.setItem(("errorObj"), JSON.stringify(helpText))
    }, [helpText]);

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
                {/* <LinearProgresss values={progressBarValue} /> */}
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