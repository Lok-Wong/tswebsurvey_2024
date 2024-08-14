'use client'
import * as React from 'react';
import styles from "./page.module.css";
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import MapComponent from '../mapTesting/page';

function MapSelections(props) {
    const [isClient, setIsClient] = React.useState(false)

    const [open, setOpen] = React.useState(false);
    const [key, setKey] = React.useState("start0");

    const mapClose = () => {
        handleChangeData(props.label);
        setOpen(false);
    }

    const _initial_value = React.useMemo(() => {
        if (typeof window !== 'undefined') {
          const local_storage_value_str = sessionStorage.getItem('headHolder');
          // If there is a value stored in localStorage, use that
          if (local_storage_value_str) {
            return JSON.parse(local_storage_value_str);
          }
        }
        // Otherwise use initial_value that was passed to the function
        return props.route;
    }, []);

    const [survey, setSurvey] = React.useState(_initial_value);

    React.useEffect(() => {
        setIsClient(true)
    }, [])

    const handleCustomAddress = (address, type) => {
        setSurvey((prevState) => ({
          ...prevState,
          [key]: null
        }))
    
        if (type == "geolocation") {
          setSurvey((prevState) => ({
            ...prevState,
            [key]: {
              ...prevState[key],
              name: address,
              method: type
            }
          }))
          return
        }
    
        if (type == "input") {
          setSurvey((prevState) => ({
            ...prevState,
            [key]: {
              ...prevState[key],
              name: address,
              method: type
            }
          }))
          return
        }
    
        setSurvey((prevState) => ({
          ...prevState,
          [key]: address,
        }))
    
        setSurvey((prevState) => ({
          ...prevState,
          [key]: {
            ...prevState[key],
            method: type
          }
        }))
    }

    const getMapSelectedText = (location) => {
        //console.log(props.label);

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

    const handleChangeData = (label) => {
        sessionStorage.setItem(label, JSON.stringify(survey[label]));
        //sessionStorage.setItem("testing", JSON.stringify(survey[label]))
        // console.log(sessionStorage);
        return;
    }

    const createMapSelection = (key) => {
        return (
            <div key={key} className={styles.mapButton}>
                <Button onClick = {() => {
                    setOpen(true);
                    setKey(key);
                }}>
                    展開地圖
                </Button>
            </div>
        );
    }

    const createMapSelections = (props) => {
        //console.log(json);
        return (
            <div className={styles.mapSelect} key={props.label}>
                {
                    isClient ?
                        <div>
                            <FormControl>
                                    {createMapSelection(props.label)}
                            </FormControl>
                        </div>
                        :
                        null
                }
                
                <Modal
                    open={open}
                    onClose={mapClose}
                    aria-labelledby="map"
                    aria-describedby="map"
                    sx = {{zIndex:10}}
                >
                    <Box className={styles.mapBox}>
                        <div className={styles.map}>
                            <div className={styles.mapHitText}>
                            {
                                getMapSelectedText(survey[props.label]) ? "已選擇地址： " + getMapSelectedText(survey[props.label]) : <p style={{ color: "#666666" }}>*請在以下地圖點選目的地或輸入相關地址後按下確定<br />**例子：八角亭</p>
                            }
                            </div>
                            <MapComponent handleCustomAddress={handleCustomAddress}/>
                        </div>
                    </Box>
                </Modal>
            </div>
        );
    }

    if (typeof(props.label) !== 'undefined') {
        return (createMapSelections(props));
    }
    else
        return (
            <div>
                Route storage not set
            </div>
        )
}

export default MapSelections;