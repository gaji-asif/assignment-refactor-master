import React from "react";
import { createProduct, fetchProducts } from "../../service";
import { ProductType } from "../../types";
import lodash from "lodash";
import logo from "../../images/droppe-logo.png";
import img1 from "../../images/img1.png";
import img2 from "../../images/img2.png";
import { Button } from "../../components/button";
import ProductList from "../../components/product-list-components";
import Modal from "react-modal";
import { FaTimes } from "react-icons/fa";
import { Form } from "../../components/form";

const ShopApp = () => {
  const [products, setProducts] = React.useState<ProductType[]>([]);

  const [isOpen, setIsOpen] = React.useState(false);
  const [isShowingMessage, setIsShowingMessage] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [numFavorites, setNumFavorites] = React.useState(0);
  const [prodCount, setProdCount] = React.useState(0);

  React.useEffect(() => {
    fetchProducts().then((response: any) => {
      setProducts(response?.data);
      setProdCount(response?.data?.length);
    });
  }, []);

  const favClick = (title: string) => {
    const prods = products;
    const idx = lodash.findIndex(prods, { title: title });
    let currentFavs = numFavorites;
    let totalFavs: any;

    if (prods[idx].isFavorite) {
      prods[idx].isFavorite = false;
      totalFavs = --currentFavs;
    } else {
      totalFavs = ++currentFavs;
      prods[idx].isFavorite = true;
    }
    setProducts(prods);
    setNumFavorites(totalFavs);
  };

  const onSubmit = (payload: ProductType) => {
    const prod = {
      title: payload.title,
      description: payload.description,
      price: Number(payload.price),
    };
    const updated = lodash.clone(products);
    updated.push(prod);

    setProducts(updated);
    setProdCount(lodash.size(products) + 1);

    setIsOpen(false);

    setIsShowingMessage(true);
    setMessage("Adding product...");
    createProduct(prod).then((res) => {
      setTimeout(() => {
        setIsShowingMessage(false);
        setMessage("");
      }, 2000);
    });
  };
  return (
    <React.Fragment>
      <div className="header">
        <div className="container headerImageWrapper">
          <img src={logo} className="headerImage" />
        </div>
      </div>
      <>
        <span
          className="container main"
          style={{
            margin: "50px inherit",
            display: "flex",
            justifyContent: "space-evenly",
          }}
        >
          <img src={img1} style={{ maxHeight: "15em", display: "block" }} />
          <img src={img2} style={{ maxHeight: "15rem", display: "block" }} />
        </span>
      </>
      <div className="container main" style={{ paddingTop: 0 }}>
        <div className="buttonWrapper">
          <span role="button">
            <Button
              onClick={() => {
                setIsOpen(true);
              }}
            >
              Send product proposal
            </Button>
          </span>
          {isShowingMessage && (
            <div className="messageContainer">
              <i>{message}</i>
            </div>
          )}
        </div>

        <div className="statsContainer">
          <span>Total products: {prodCount}</span>
          {" - "}
          <span>Number of favorites: {numFavorites}</span>
        </div>

        {products && !!products.length ? (
          <ProductList products={products} onFav={favClick} />
        ) : (
          <div></div>
        )}
      </div>
      <>
        <Modal
          isOpen={isOpen}
          className="reactModalContent"
          overlayClassName="reactModalOverlay"
        >
          <div className="modalContentHelper">
            <div
              className="modalClose"
              onClick={() => {
                setIsOpen(false);
              }}
            >
              <FaTimes />
            </div>

            <Form on-submit={onSubmit} />
          </div>
        </Modal>
      </>
    </React.Fragment>
  );
};

export default ShopApp;
