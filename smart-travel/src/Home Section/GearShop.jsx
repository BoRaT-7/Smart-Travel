import React, { useEffect, useState } from "react";

const GearShop = () => {
  const [products, setProducts] = useState([]);
  const [visible, setVisible] = useState(8); // show 6 items first

  useEffect(() => {
    fetch("/Gear Shop/data.json")
      .then((res) => res.json())
      .then((data) => setProducts(data.products))
      .catch((err) => console.error("Error loading JSON:", err));
  }, []);

  const handleSeeMore = () => setVisible(products.length);

  return (
    <div className="min-h-screen  mt-5 py-12">
     <div className="text-center bg-gray-100 py-12 px-4 md:px-8 lg:px-20">
        <p className="text-gray-800 font-normal text-lg md:text-2xl lg:text-3xl">
         Read The Top
        </p>

        <h1 className="text-[#143E5F] font-bold font-['Roboto'] mt-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight">
         Shop Gear
        </h1>

        <p className="text-gray-600 mt-6 text-base sm:text-lg md:text-xl lg:text-lg max-w-4xl mx-auto">
        Discover breathtaking landscapes, rich cultures, and unforgettable travel moments. From mountain adventures to serene beach getaways, we have the perfect tour for you. Enjoy handpicked stays, expert guides, and seamless travel — stress-free.
        </p>
      </div>
      <div className="grid gap-8 px-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.slice(0, visible).map((item, index) => (
          <div
            key={index}
            className="card bg-white shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105"
          >
            <figure>
              <img
                src={item.image_url}
                alt={item.name}
                className="w-full h-52 object-cover"
              />
            </figure>
            <div className="card-body text-center">
              <h2 className="card-title -mt-4 justify-center text-lg font-bold text-gray-800">
                {item.name}
              </h2>
              <p className="text-sm text-gray-500 -mt-2">{item.description}</p>

    <div className="-mt-2 ">
  {/* Price */}
  <p className="text-lg font-semibold text-blue-700">
    Price: {item.price} {item.currency}
  </p>

  {/* Rating stars */}
  <div className="flex -mt-2 items-center justify-center">
    {Array.from({ length: item.rating }).map((_, i) => (
      <span key={i} className="text-red-400 text-lg">
        ★
      </span>
    ))}
  </div>
</div>



              {/* Add to Cart Button */}
              <button className=" w-full py-2 font-semibold rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition">
                {item.button_text || "Add to Cart"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* See More Button */}
      {visible < products.length && (
        <div className="text-center mt-10">
          <button
            onClick={handleSeeMore}
            className="btn bg-blue-600 hover:bg-blue-700 text-white px-8"
          >
            See More
          </button>
        </div>
      )}
    </div>
  );
};

export default GearShop;
