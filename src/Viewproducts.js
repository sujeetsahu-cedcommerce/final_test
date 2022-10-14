import { Button, Grid, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import "./Viewproducts.css";
import { styled } from "@mui/material/styles";
import { connect } from "react-redux";
import { productAction } from "./Action";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  //   textAlign: "center",
  color: theme.palette.text.secondary,
  height: "100%",
}));

const Viewproducts = (props) => {
  var containerId = sessionStorage.getItem("container_id");
  console.log(containerId);

  const [image, setImage] = useState("");
  const [selectedVariantId, setSelectedVariantId] = useState("");
  const [productContainer, setProductContainer] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [variantContainer, setVariantContainer] = useState([]);
  let item = {
    target_marketplace: "amazon",
    source_marketplace: "shopify",
    sourceShopID: 500,
    targetShopID: 530,
    container_id: containerId,
  };

  let url = new URL(
    "https://multi-account.sellernext.com/home/public/connector/product/getProduct/"
  );

  for (let i in item) {
    url.searchParams.append(i, item[i]);
  }

  useEffect(() => {
    let temp = [];
    let result = fetch(url, {
      headers: {
        appTag: "amazon_sales_channel",
        Authorization:
          "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiNjMzMjlkN2YwNDUxYzA3NGFhMGUxNWE4Iiwicm9sZSI6ImN1c3RvbWVyIiwiZXhwIjoxNjY1NzQ3NzIyLCJpc3MiOiJodHRwczpcL1wvYXBwcy5jZWRjb21tZXJjZS5jb20iLCJ0b2tlbl9pZCI6IjYzNDkxMmNhZmM5ZTc5NmE0YjI2NmRmMiJ9.jZFtDEcsVkMC0BurU_FBbF0-gMfR7xYbTXkXVepAdod8PnTYNFpJ_RDViMMAR6xR85BBYFAEM0xcDvfMuW0h2NUJHmXIrQKXkiEdfBRsCEb_es4GSaz9eK-M7i83rKoSVBuIexmEzSDJ3ap7ess49smOdteZGzK46M8qe5GzlYyeaERg9CJGd-tnYuvlhpXdQsynNUfHxZHZljaLHLQRNJ1LPrHdy9PU5PT7-3dtfjvVGHmIjLujCpJEMxOPv_SH1S2PJdEBc1-RnjWSLyiMyw7pD3UAa0l6SsUwVSUePFe9GE7SnwYBN61ppxWkEm1oNtGlfEODCgSjVFJ4GRT66A",

        "Ced-Source-Id": "500",

        "Ced-Source-Name": "shopify",

        "Ced-Target-Id": "530",

        "Ced-Target-Name": "amazon",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("res is", res.data.rows);
        setProductContainer(res.data.rows);
        res.data.rows.map((i) => {
          if (i.visibility === "Catalog and Search") {
            setSelectedProduct([i]);
            setImage(i.main_image);
          } else {
            temp.push(i);
          }
        });
        setVariantContainer([...temp]);
      });
  }, []);

  console.log("image is ", image);
  console.log("selected", selectedProduct);
  console.log("variantContainer", variantContainer);

  const ChangeVariant = (variant, id) => {
    setSelectedVariantId(id);
    if (variant === null) {
      setImage("https://cdn-icons-png.flaticon.com/512/16/16686.png");
    } else {
      setImage(variant);
    }
  };

  const increment = () => {
    let temp = [...variantContainer];
    temp.map((item) => {
      if (item.id === selectedVariantId) {
        return (item.marketplace[0].quantity += 1);
      }
    });
    setSelectedProduct(temp);
    console.log(temp);

    // let temp = [...selectedProduct];

    // temp.map((item) => {
    //   return (item.marketplace[0].quantity += 1);
    // });
    // setSelectedProduct(temp);
    // console.log(temp);
  };

  const decrement = () => {
    let temp = [...variantContainer];
    temp.map((item) => {
      if (item.id === selectedVariantId) {
        if (item.marketplace[0].quantity > 0) {
            return (item.marketplace[0].quantity -= 1);
          }
      }
    });
    setSelectedProduct(temp);
    console.log(temp);
  };

  const AddToCart = () => {
    let TotalQuantity = 0;
    variantContainer.map((item) => {
      console.log("add toc cart quantitiy", item.marketplace[0].quantity);
      item.marketplace[0].quantity > 0 ? (
        (TotalQuantity += item.marketplace[0].quantity)
      ) : (
        <></>
      );
    });
    console.log("TotalQuantity", TotalQuantity);
    props.productAction1(TotalQuantity);
  };

  return (
    <div>
      <Box sx={{ flexGrow: 1, marginTop: "100px" }}>
        <Grid container spacing={2}>
          <Grid item xs={5}>
            <Item>
              <div style={{ widht: "15rem", height: "25rem" }}>
                <img
                  src={image}
                  alt="prod"
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
            </Item>
          </Grid>
          <Grid item xs={3}>
            {selectedProduct.map((item) => (
              <Item>
                <div className="productButton">
                  <Typography variant="h4">{item.title}</Typography>
                  <p>Rs.{item.marketplace[0].price}</p>
                  <p>color:</p>
                  {variantContainer.map((item) => (
                    <>
                      {console.log(item.variant_title)}
                      <button
                        onClick={(e) =>
                          ChangeVariant(item.variant_image, item.id)
                        }
                      >
                        {item.variant_title}
                      </button>
                    </>
                  ))}
                  <div>
                    <div>
                      <p>Quantity</p>
                      <>
                        {variantContainer.map((item) =>
                          item.id === selectedVariantId ? (
                            <>
                              <button onClick={decrement}>-</button>
                              {item.marketplace[0].quantity}
                              <button onClick={increment}>+</button>
                              <div>
                                <button onClick={AddToCart}>Add To cart</button>
                              </div>
                            </>
                          ) : (
                            <></>
                          )
                        )}
                      </>
                    </div>

                    <div>
                      <button>buy it now</button>
                    </div>
                    <div>
                      <p>
                        The standard chunk of Lorem Ipsum used since the 1500s
                        is reproduced below for those interested. Sections
                        1.10.32 and 1.10.33 from 1914 translation by H. Rackham.
                      </p>
                    </div>
                  </div>
                </div>
              </Item>
            ))}
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    ...state,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    productAction1: (e) => dispatch(productAction(e)),
  };
};

// export default Viewproducts;
export default connect(mapStateToProps, mapDispatchToProps)(Viewproducts);
