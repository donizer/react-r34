import { useEffect, useState } from "react";
import { Ir34Json } from "../Layout";
import "../scss/Overlay.scss";
import placeholder from "../assets/giphy.gif";

interface OverlayProps {
  currImage: string | undefined;
  setCurrImage: React.Dispatch<React.SetStateAction<string | undefined>>;
  overlayItem: Ir34Json | undefined;
  setOverlayItem: React.Dispatch<React.SetStateAction<Ir34Json | undefined>>;
  isOverlayActive: boolean;
  setOverlayActive: React.Dispatch<React.SetStateAction<boolean>>;
  overlayClass: string;
  setOverlayClass: React.Dispatch<React.SetStateAction<string>>;
}

export default function Overlay(props: OverlayProps) {
  // State to determine if the image is a mp4 video
  const [isMp4, setIsMp4] = useState(false);

  // Extract file format from the URL and set isMp4 state if it's a mp4 video
  let format =
    props.overlayItem?.file_url.split(".")[
      props.overlayItem?.file_url.split(".").length - 1
    ];

  useEffect(() => {
    if (format == "mp4") {
      setIsMp4(true);
      // Set the current image to mp4 video
      props.setCurrImage(
        `https://api-cdn.rule34.xxx/images/${props.overlayItem?.directory}/${props.overlayItem?.hash}.mp4`
      );
    } else {
      setIsMp4(false);
    }
  }, [props.isOverlayActive]);

  /*
  Handle overlay click by toggling the overlay active state 
  and reset current image to placeholder
  */
  const handleOverlayClick = () => {
    props.setOverlayActive(!props.isOverlayActive);
    props.setCurrImage(placeholder);
  };

  return (
    <div
      className={`overlay ${props.isOverlayActive ? "active" : ""}`}
      onClick={handleOverlayClick}
    >
      <div className="close-btn" onClick={handleOverlayClick}>
        <div></div>
      </div>
      {props.isOverlayActive && props.currImage && isMp4 ? (
        <video
          className={props.overlayClass}
          src={props.currImage}
          placeholder={props.overlayItem?.sample_url}
          controls
          // muted
          autoPlay
        />
      ) : (
        <img
          className={props.overlayClass}
          src={props.currImage}
          alt={props.currImage}
        />
      )}
    </div>
  );
}
