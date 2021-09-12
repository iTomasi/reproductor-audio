import React, { useState, useEffect } from "react";

// Components
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";

// Helpers
import formatDate from "helpers/formatDate";

interface ICardAudioProps {
    audioUrl: string;
}

interface ITheAudio {
    audio: HTMLAudioElement;
    isPaused: boolean;
    duration: number;
}

const CardAudio = ({ audioUrl }: ICardAudioProps) => {
    const [theTime, setTheTime] = useState({
        time: "00:00",
        date: "9 May 2021",
    });

    const [theAudio, setTheAudio] = useState<ITheAudio>({
        audio: null,
        isPaused: true,
        duration: 0,
    });

    const [theAudioProgress, setTheAudioProgress] = useState<number>(0);

    const [barsWave, setBarsWave] = useState<number[]>([]);

    useEffect(() => {
        const getFullDate = formatDate(Date.now());

        const currentTime = new Date();

        const getHour = ("0" + currentTime.getHours().toString()).slice(-2);
        const getMinutes = ("0" + currentTime.getMinutes().toString()).slice(
            -2
        );

        setTheTime((prev) => ({
            ...prev,
            time: `${getHour}:${getMinutes}`,
            date: getFullDate,
        }));

        if (!audioUrl) return;

        const audio = new Audio(audioUrl);

        audio.onloadeddata = async () => {
            setTheAudio((prev) => ({
                ...prev,
                audio,
                duration: audio.duration,
            }));

            audio.addEventListener("timeupdate", () => {
                const getPercentage =
                    (audio.currentTime * 100) / audio.duration;

                setTheAudioProgress(getPercentage);
            });

            audio.addEventListener("ended", () => {
                audio.pause();

                setTheAudio((prev) => ({
                    ...prev,
                    isPaused: true,
                }));

                setTheAudioProgress(0);
            });
        };
        audio.onerror = () => console.log("PRO");
    }, [audioUrl]);

    useEffect(() => {
        const generatingBars = 30;

        for (let i = 0; i < generatingBars; i++) {
            const randomNumber = Math.floor((Math.random() + 0.2) * 85);

            setBarsWave((prev) => [...prev, randomNumber]);
        }
    }, []);

    const handlePlayBtn = () => {
        if (theAudio.isPaused) {
            theAudio.audio.play();
            return setTheAudio((prev) => ({
                ...prev,
                isPaused: false,
            }));
        }

        theAudio.audio.pause();

        return setTheAudio((prev) => ({
            ...prev,
            isPaused: true,
        }));
    };

    if (!audioUrl) return null;

    return (
        <div className="iw_cardAudio">
            <div className="iws_userInfo">
                <img
                    src="https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                    alt="profile_pic"
                />
                <h5>
                    El Tomate <span>@iTomasi</span>
                </h5>
            </div>

            <div className="iws_reproductor">
                <div className="iws_playBtn" onClick={handlePlayBtn}>
                    <FontAwesomeIcon
                        icon={theAudio.isPaused ? faPlay : faPause}
                    />
                </div>

                <div className="iws_soundWave">
                    <div
                        className="iws_soundWaveProgress"
                        style={{
                            width: `${theAudioProgress}%`,
                        }}
                    ></div>
                    {barsWave.map((bar, index) => (
                        <span key={index} style={{ height: `${bar}%` }}></span>
                    ))}
                </div>
            </div>

            <div className="iws_time">
                {theTime.time} - {theTime.date}
            </div>
        </div>
    );
};

export default CardAudio;
