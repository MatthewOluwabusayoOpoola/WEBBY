import ShoppingList from "./ShoppingList";
import BrandList from "./BrandList";
import Subscribe from "./Subscribe";
import MainCarousel from "./MainCarousel";

function Home() {
  return (
    <div className="home">
      <MainCarousel />
      <ShoppingList />
      {/* <BrandList /> */}
      <Subscribe />
    </div>
  );
}

export default Home;
