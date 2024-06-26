import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UseeContext from '../Globalcontext/UseConstext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Table = () => {
  const [,,,,,,,,,,products ] = useContext(UseeContext);
  const nav = useNavigate();

  return (
    <div>
      <Navbar />
      <div>
        <figure className="relative max-w-screen-2xl transition-all duration-500">
          <a href="#">
            <img
              className="w-full"
              src="https://gambrick.com/wp-content/uploads/2022/02/how-much-space-do-you-need-around-a-dining-table.jpg"
              alt="Table Banner"
            />
          </a>
          <figcaption className="absolute px-7 text-lg text-black bottom-6 w-full text-justify"></figcaption>
        </figure>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 p-10 mt-10">
          {products
            .filter((value) => value.type === "table")
            .map((e, index) => (
              <div key={index} className="bg-slate-200">
                <img
                  className="w-full h-80 object-cover cursor-pointer"
                  src={e.productImg}
                  alt=""
                  onClick={() => nav(`/${e._id}`)}
                />

                <div className="text-center p-3">
                  <h1 className="">{e.title}</h1>
                </div>
              </div>
            ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Table;
