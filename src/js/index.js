import "../index.html"
import "../style/index.scss";
import "./tabs.js"

import { createRoot } from 'react-dom/client';
import React from 'react';
import { useState, useRef } from 'react'
import moment from 'moment';

function InputAndPlayer() {
    const [url, setUrl] = useState('');
    const [isInputMode, setIsInputMode] = useState(true);
  
    const [inputTitle, setInputTitle] = useState('');
    const [isError, setIsError] = useState(false);
  
    const playRef = useRef(null);
    const barRef = useRef(null);
    const volumeRef = useRef(null);
    const [isPause, setIsPause] = useState(true);
    const [progress, setProgress] = useState('0%');
    const [volume, setVolume] = useState("100%");
    const [currentTime, setCurrentTime] = useState(0);
    const [loader, setLoader] = useState(true);
  
    const updateProgress = (e) => {
      const { duration, currentTime } = e.target;
      const PercentProgress = (currentTime / duration) * 100;
      setProgress(PercentProgress + '%');
      setCurrentTime(currentTime);
    }
  
    const setProgressPoint = (e) => {
      const width = barRef.current.clientWidth;
      const coordX = e.nativeEvent.offsetX;
      const duration = playRef.current.duration;
      const isPointNode = e.target.classList.contains('progress-bar_current-point')
      if (!isPointNode) playRef.current.currentTime = (coordX / width) * duration;
    }
  
    const setVolumePoint = (e) => {
      const width = volumeRef.current.clientWidth;
      const coordX = e.nativeEvent.offsetX;
      const isPointNode = e.target.classList.contains('volume__current-point');
      if (!isPointNode) {
        playRef.current.volume = (coordX / width);
        setVolume(((coordX / width) * 100) + "%");
      }
    }
  
    const handlerBackClick = () => {
      playRef.current.pause();
      setIsPause(true);
      setIsInputMode(true);
      setLoader(false);
      setProgress("0%");
    }
  
    const handlerInputChange = (e) => {
      setInputTitle(e.target.value);
      setUrl(e.target.value);
      setIsError(false)
    }
  
    const isValidUrl = (string) => {
      try {
        new URL(string);
        return true;
      } catch {
        return false;
      }
    }
  
    const enableInputMode = () => {
      setLoader(true)
      setIsInputMode(false)
    }
  
    const handlerButtonClick = () => {
      isValidUrl(url) ? enableInputMode() : setIsError(true);
    }
  
    const stopLoader = () => {
      setLoader(false);
    }
  
    return (
      <>
        {isInputMode &&
  
          <section className="input-section">
            <p className="input-section__text">Insert the link</p>
            <div className="input-section__wrapper">
              <input className={isError && "input-error input" || "input"} onChange={handlerInputChange} value={inputTitle} type="text" placeholder="https://"></input>
              <button onClick={handlerButtonClick} type="button">
                <div className="input-section__arrow"></div>
              </button>
            </div>
            {isError && <p className="error-text">Error: invalid link</p>}
          </section>
  
        }
  
        {!isInputMode &&
  
          <section className="player-section">
            <p onClick={handlerBackClick} className="player-section__text">← Back</p>
            <div className="player-section__wrapper">
              {loader ? <div className="loader"></div> : <div className="no-loader"></div>}
  
              {isPause ?
                <div className="player-section__play" onClick={() => {
                  playRef.current.play();
                  setIsPause(false);
                }}>
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 40V0H4.34286L40 18.7952V20.9639L4.34286 40H0Z" fill="white" />
                  </svg>
                </div>
                :
                <div className="player-section__pause" onClick={() => {
                  playRef.current.pause()
                  setIsPause(true)
                }}>
                  <svg width="4" height="40" viewBox="0 0 4 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="4" height="40" fill="white" />
                  </svg>
  
                  <svg className="player-section__svg-pause" width="4" height="40" viewBox="0 0 4 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="4" height="40" fill="white" />
                  </svg>
                </div>
              }
  
              <div onClick={setProgressPoint} ref={barRef} className="player-section__progress-bar progress-bar">
                <div className="progress-bar__scale">
                  <div className="progress-bar_current-line" style={{ width: progress }}></div>
                  <div className="progress-bar_current-point"></div>
                </div>
              </div>
  
              <div className="player-section__time-volume time-volume">
                <p className="time-volume__time">{moment(currentTime * 1000).format('mm:ss')}</p>
  
                <div onClick={setVolumePoint} ref={volumeRef} className="time-volume__volume volume">
                  <div className="volume__scale">
                    <div className="volume__current-line" style={{ width: volume }}></div>
                    <div className="volume__current-point"></div>
                  </div>
                </div>
              </div>
  
              <audio onTimeUpdate={updateProgress} onCanPlayThrough={stopLoader}
                ref={playRef} src={url}></audio>
            </div>
          </section>
  
        }
      </>
    );
  }
  
  const domNode = document.getElementById('react');
  const root = createRoot(domNode);
  root.render(<InputAndPlayer />);
   


  
