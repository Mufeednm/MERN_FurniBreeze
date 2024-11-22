import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UseeContext from '../Globalcontext/UseConstext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Beds = () => {
  const [,,,,,,,,,, products] = useContext(UseeContext);
  const nav = useNavigate();

  return (
    <div>
      <Navbar />
      
      {/* Banner Section */}
      <div className="relative max-w-full">
        <figure className="w-full">
          <a href="#">
            <img
              className="w-full h-96 object-cover transition-transform duration-500 transform hover:scale-105"
              src="https://www.woodenstreet.com/images/matters/main-banner.jpg"
              alt="image description"
            />
          </a>
          <figcaption className="absolute px-7 text-lg text-white bottom-6 w-full text-center font-semibold bg-opacity-50 bg-black">
            {/* Banner text or heading */}
          </figcaption>
        </figure>
      </div>

      {/* Product Grid Section */}
      <div className="container mx-auto px-6 py-12">
        <h2 className="text-3xl font-semibold text-center mb-8 text-gray-800">Explore Our Premium Beds</h2>
        
        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products
            .filter((value) => value.type === 'bed')
            .map((product, index) => (
              <div key={index} 
                   className="bg-white shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300 rounded-lg overflow-hidden cursor-pointer transform"
                   onClick={() => nav(`/${product._id}`)}>
                
                {/* Image Section */}
                <div className="relative">
                  <img
                    className="w-full h-60 object-cover transition-all duration-300 transform group-hover:scale-110"
                    src={product.productImg}
                    alt={product.title}
                  />
                  <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-30 group-hover:bg-opacity-0 transition-all duration-300"></div>
                </div>

                {/* Text Section */}
                <div className="p-4 text-center">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{product.title}</h3>
                  <p className="text-sm text-gray-500">{product.description ? product.description : 'A comfortable bed for restful sleep'}</p>
                </div>
              </div>
            ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Beds;
