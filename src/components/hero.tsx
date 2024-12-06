const HeroComponent = () => {
    return (
      <div className="flex justify-center items-center my-10">
        <div className="w-1/2 h-48 flex flex-col rounded justify-center items-center p-5">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-semibold">
              <a
                href="/builder"
                className="text-lg font-semibold bg-gradient-to-r from-purple-500 to-pink-500 text-white p-2 rounded-md shadow-md hover:scale-105 transition-transform duration-200 px-10 py-4"
              >
                Click Build Your
              </a>
            </span>
          </div>
        </div>
      </div>
    );
  };
  
  export default HeroComponent;
  