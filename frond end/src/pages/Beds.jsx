import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UseeContext from '../Globalcontext/UseConstext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Beds = () => {
  const [,,,,,,,,,,products ] = useContext(UseeContext);
  console.log("first",products);
  const nav = useNavigate();

  return (
    <div>
      <Navbar />
      <div>
        <figure className="relative max-w-5xl transition-all duration-500">
          <a href="#">
            <img
              className="max-w-full w-full"
              src="https://www.woodenstreet.com/images/matters/main-banner.jpg"
              alt="image description"
            />
          </a>
          <figcaption className="absolute px-7 text-lg text-black bottom-6 w-full text-justify">
            <p>Beds of Dream </p>
          </figcaption>
        </figure>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products
            .filter((value) => value.type === 'bed')
            .map((product, index) => (
              <div key={index} className="bg-slate-200"  onClick={() => nav(`/${product.id}`)}>
                <img
                  className="w-full h-72 object-cover cursor-pointer"
                  src={product.productImg}
                  alt=""
                
                />
                <div className="text-center p-3">
                  <h1 className="text-white font-bold">{product.title}</h1>
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
