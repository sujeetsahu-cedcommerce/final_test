import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Style.css";
const Home = () => {
  const [state, setState] = useState({
    count: 50,
    productOnly: true,
    target_Marketplace: "eyJtYXJrZXRwbGFjZSImFsbCIsInNob3BfaWQi0m51bGx9",
    //   filter[cif_amazon_multi_inactive][1]:'Not Listed'
    //   }
  });

  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const View = (container_id) => {
    sessionStorage.setItem("container_id", container_id);
    navigate("/viewproducts");
  };

  useEffect(() => {
    let result = fetch(
      "https://multi-account.sellernext.com/home/public/connector/product/getRefineProducts/",
      {
        headers: {
          appTag: "amazon_sales_channel",
          Authorization:
            "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiNjMzMjlkN2YwNDUxYzA3NGFhMGUxNWE4Iiwicm9sZSI6ImN1c3RvbWVyIiwiZXhwIjoxNjY1NzQ3NzIyLCJpc3MiOiJodHRwczpcL1wvYXBwcy5jZWRjb21tZXJjZS5jb20iLCJ0b2tlbl9pZCI6IjYzNDkxMmNhZmM5ZTc5NmE0YjI2NmRmMiJ9.jZFtDEcsVkMC0BurU_FBbF0-gMfR7xYbTXkXVepAdod8PnTYNFpJ_RDViMMAR6xR85BBYFAEM0xcDvfMuW0h2NUJHmXIrQKXkiEdfBRsCEb_es4GSaz9eK-M7i83rKoSVBuIexmEzSDJ3ap7ess49smOdteZGzK46M8qe5GzlYyeaERg9CJGd-tnYuvlhpXdQsynNUfHxZHZljaLHLQRNJ1LPrHdy9PU5PT7-3dtfjvVGHmIjLujCpJEMxOPv_SH1S2PJdEBc1-RnjWSLyiMyw7pD3UAa0l6SsUwVSUePFe9GE7SnwYBN61ppxWkEm1oNtGlfEODCgSjVFJ4GRT66A",

          "Ced-Source-Id": "500",

          "Ced-Source-Name": "shopify",

          "Ced-Target-Id": "530",

          "Ced-Target-Name": "amazon",
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        // console.log(res);
        setProducts(res.data.rows);
      });
  }, []);

  console.log("products is ", products);

  return (
    <div>
      <div style={{ border: "1px sold black", height: "60vh" }}>
        <img
          src="https://img.freepik.com/premium-photo/astronaut-outer-open-space-planet-earth-stars-provide-background-erforming-space-planet-earth-sunrise-sunset-our-home-iss-elements-this-image-furnished-by-nasa_150455-16829.jpg?w=2000"
          alt="imag1 "
          style={{ width: "100%", height: "100%" }}
        />
      </div>
      <div className="productContainer">
        {products.map((i) => (
          <div style={{ width: "11rem" }}>
            <div style={{ width: "10rem", height: "10rem" }}>
              <img
                src={i.main_image}
                alt="products"
                style={{ width: "100%", height: "100%" }}
              />
            </div>
            <div>
              <p>{i.product_type}</p>
              <p>brand :{i.brand}</p>
              {/* <p>Dhjsdhjdsf kjdids huiasdhjuas hiasdj</p> */}
            </div>
            <div>
              <button onClick={(e) => View(i.container_id)}>
                View Products
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
