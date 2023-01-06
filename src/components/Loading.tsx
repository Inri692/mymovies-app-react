import { FC } from "react";
import Lottie from "lottie-react";

//import MovieAnimation from "../assets/play.json";

const Loading: FC = () => {
  return (
    <div className="flex justify-center">
      <div className="flex place-items-center">
        <div className="flex justify-center place-items-center space-x-26 text-sm text-gray-900">
          <svg
            fill="none"
            className="w-36 h-36 animate-spin"
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clip-rule="evenodd"
              d="M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z"
              fill="currentColor"
              fill-rule="evenodd"
            />
          </svg>

          <div className="text-xl text-white">Please Wait</div>
        </div>
      </div>
    </div>
  );
};
export default Loading;

// export class LoadingAnimation extends Component {
//   render() {
//     return <Lottie animationData={MovieAnimation} loop={true} autoplay />;
//   }
// }
