import { Carousel } from "@material-tailwind/react";

const Banner = () => {
  return (
    <Carousel
      autoplay={true}
      autoplayDelay={3000}
      loop={true}
      transition={{ duration: 1.5 }}
    >
      {/* Slide 1 */}
      <div className="relative h-[400px] w-full">
        <img
          src="https://images.unsplash.com/photo-1527613426441-4da17471b66d?q=80&w=1452&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Nature"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white text-center">
          <h2 className="text-2xl md:text-4xl font-bold">Explore Nature</h2>
          <p className="mt-2 text-lg">
            Discover the beauty of the great outdoors.
          </p>
        </div>
      </div>

      {/* Slide 2 */}
      <div className="relative h-[400px] w-full">
        <img
          src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1476&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="City"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white text-center">
          <h2 className="text-2xl md:text-4xl font-bold">Urban Adventures</h2>
          <p className="mt-2 text-lg">Experience the thrill of city life.</p>
        </div>
      </div>

      {/* Slide 3 */}
      <div className="relative h-[400px] w-full">
        <img
          src="https://images.unsplash.com/photo-1540206276207-3af25c08abc4?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHRlYWNoZXJ8ZW58MHx8MHx8fDA%3D"
          alt="Technology"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white text-center">
          <h2 className="text-2xl md:text-4xl font-bold">Future of Tech</h2>
          <p className="mt-2 text-lg">Innovations that shape the world.</p>
        </div>
      </div>
    </Carousel>
  );
};

export default Banner;
