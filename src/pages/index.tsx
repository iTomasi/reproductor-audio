import React, { useState, useEffect } from "react";

// Components
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faMicrophone,
    faMicrophoneSlash,
} from "@fortawesome/free-solid-svg-icons";
import CardAudio from "components/CardAudio";

const Index = () => {
    const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder>(null);

    const [theAudio, setTheAudio] = useState({
        isRecording: false,
        url: "",
    });

    useEffect(() => {
        const effectFunc = async () => {
            const navigatorAudio = await navigator.mediaDevices.getUserMedia({
                audio: true,
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
            <button
                className="iws_recordBtn"
                type="button"
                onClick={
                    theAudio.isRecording
                        ? handleStopAudioBtn
                        : handleRecordAudioBtn
                }
            >
                <FontAwesomeIcon
                    icon={
                        theAudio.isRecording ? faMicrophoneSlash : faMicrophone
                    }
                />
            </button>

            <CardAudio audioUrl={theAudio.url} />
        </div>
    );
};

export default Index;
