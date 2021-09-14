import React, { useState, useEffect } from "react";

// Next
import Link from "next/link";

// Components
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone } from "@fortawesome/free-solid-svg-icons";
import CardAudio from "components/CardAudio";
import QuestionCard from "components/QuestionCard";

const Index = () => {
    const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder>(null);

    const [theAudio, setTheAudio] = useState({
        isRecording: false,
        url: "",
    });

    useEffect(() => {
        const effectFunc = async () => {
            if (!navigator.mediaDevices) {
                console.log("no navigator.mediaDevices");
                return;
            }

            const navigatorAudio = await navigator.mediaDevices.getUserMedia({
                audio: true,
                video: false,
            });

            const mediaRecorder = new MediaRecorder(navigatorAudio);

            setMediaRecorder(mediaRecorder);

            let audioChunks = [];

            mediaRecorder.addEventListener("dataavailable", (e) =>
                audioChunks.push(e.data)
            );

            mediaRecorder.addEventListener("stop", () => {
                const audioBlob = new Blob(audioChunks);

                const blobToUrl = URL.createObjectURL(audioBlob);

                setTheAudio((prev) => ({
                    ...prev,
                    url: blobToUrl,
                }));

                audioChunks = [];
            });
        };

        effectFunc();
    }, []);

    const handleRecordAudioBtn = () => {
        if (!mediaRecorder) return console.log("a");
        setTheAudio((prev) => ({
            ...prev,
            isRecording: true,
        }));

        mediaRecorder.start();
    };

    const handleStopAudioBtn = () => {
        if (!mediaRecorder) return console.log("aa");

        setTheAudio((prev) => ({
            ...prev,
            isRecording: false,
        }));

        mediaRecorder.stop();
    };

    return (
        <div className="iw_home">
            <div className="iws_left">
                <h2>
                    Pregúntale lo que siempre quisiste saber a tu creador
                    favorito y recibe un audio con la respuesta
                </h2>

                <h4>
                    Un experimento de{" "}
                    <Link href="https://mis.fans">
                        <a target="_blank">Mis Fans</a>
                    </Link>
                </h4>
            </div>

            <div className="iws_right">
                <QuestionCard />
                <CardAudio audioUrl={theAudio.url} />

                {!theAudio.url && (
                    <button
                        className={`iws_recordBtn ${
                            theAudio.isRecording ? "active" : "noactive"
                        }`}
                        type="button"
                        onClick={
                            theAudio.isRecording
                                ? handleStopAudioBtn
                                : handleRecordAudioBtn
                        }
                    >
                        <FontAwesomeIcon
                            className="iws_icon"
                            icon={faMicrophone}
                        />

                        <span>
                            {theAudio.isRecording
                                ? "Grabando..."
                                : "Grabar una respuesta"}
                        </span>
                    </button>
                )}
            </div>
        </div>
    );
};

export default Index;
