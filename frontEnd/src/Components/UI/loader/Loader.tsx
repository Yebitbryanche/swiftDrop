import "./loader.css";

const Loader = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-50">
        <div className="mt-[45%]">
            <div className="loadingspinner" >
                <div id="square1"></div>
                <div id="square2"></div>
                <div id="square3"></div>
                <div id="square4"></div>
                <div id="square5"></div>
            </div>
        </div>
    </div>
  );
};

export default Loader;