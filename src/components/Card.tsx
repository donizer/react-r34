// Importing necessary dependencies and components
import "../scss/Card.scss";
import { Ir34Json } from "../Layout";

// Defining the Card component
export default function Card(props: {
  localItem: Ir34Json;
  overlayItem: Ir34Json | undefined;
  setOverlayItem: React.Dispatch<React.SetStateAction<Ir34Json | undefined>>;
  isOverlayActive: boolean;
  setOverlayActive: React.Dispatch<React.SetStateAction<boolean>>;
  currImage: string | undefined;
  setCurrImage: React.Dispatch<React.SetStateAction<string | undefined>>;
  overlayClass: string;
  setOverlayClass: React.Dispatch<React.SetStateAction<string>>;
}) {
  // Extracting relevant data from props
  const imageWidth = props.localItem.width;
  const imageHeight = props.localItem.height;
  const ratio = imageWidth / imageHeight;
  const score = props.localItem.score;

  // Initializing variables for image aspect and URL
  let imageAspect: string;
  let url: string;

  // Helper function to determine image aspect based on score
  const GetOrientationFromScore = (score: number): string => {
    if (score > 100) return "square-XL";
    else if (score > 30) return "square-L";
    else return "square-S";
  };

  // Determining image aspect based on width/height ratio and score
  if (ratio > 2.4) imageAspect = "horizontal-XL";
  else if (ratio > 1.67) imageAspect = "horizontal-L";
  else if (ratio > 1.43) imageAspect = "horizontal";
  else if (ratio > 0.93) imageAspect = GetOrientationFromScore(score);
  else if (ratio > 0.62) imageAspect = "vertical";
  else if (ratio > 0.57) imageAspect = "vertical-L";
  else imageAspect = "vertical-XL";

  // Setting the URL based on image aspect
  url =
    imageAspect == "square-S" ||
    imageAspect == "vertical" ||
    imageAspect == "horizontal"
      ? props.localItem.preview_url
      : props.localItem.sample_url;

  // Rendering the Card component with relevant data
  return (
    <img
      src={url}
      onClick={() => {
        props.setOverlayItem(props.localItem);
        props.setCurrImage(props.localItem.file_url);
        props.setOverlayActive(!props.isOverlayActive);
        props.setOverlayClass(imageAspect);
      }}
      alt={url}
      className={`card-item ${imageAspect}`}
      style={{ order: -props.localItem.score }}
    />
  );
}
