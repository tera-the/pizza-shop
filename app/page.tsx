import { Container, Title, TopBar, Filters } from "@/components/shared";
import { ProductGroupList } from "@/components/shared/product-group-list";

export default function Home() {
  return (
    <>

      <Container className="mt-10">
        <Title text="Все пиццы" size="lg" className="font-extrabold" />
      </Container>



      <TopBar />

      <Container className="pb-14 mt-10">
        <div className="flex gap-[60px]">

          {/* Фильтрация */}
          <div className="w-[250px]">
            <Filters />
          </div>

          {/* Список товаров */}
          <div className="flex-1">
            <div className="flex flex-col gap-16">
              <ProductGroupList categoryId={1} title="Пиццы" items={[
                {
                  id: 1,
                  name: 'Чизбургер-пицца',
                  imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D611ADF5AAD898B8B651186E023.avif',
                  price: 550,
                  categoryId: 1,
                  items: [
                    { price: 550, size: 25, pizzaType: 1 },
                    { price: 690, size: 30, pizzaType: 1 },
                    { price: 790, size: 35, pizzaType: 2 },
                  ],
                },
                {
                  id: 2,
                  name: 'Пепперони Фреш',
                  imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D611ADF5AAD898B8B651186E023.avif',
                  price: 395,
                  categoryId: 1,
                  items: [
                    { price: 395, size: 25, pizzaType: 1 },
                    { price: 545, size: 30, pizzaType: 1 },
                  ],
                },
                {
                  id: 3,
                  name: 'Сырная',
                  imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D611ADF5AAD898B8B651186E023.avif',
                  price: 450,
                  categoryId: 1,
                  items: [
                    { price: 450, size: 25, pizzaType: 1 },
                    { price: 590, size: 30, pizzaType: 2 },
                  ],
                },
                {
                  id: 1,
                  name: 'Чизбургер-пицца',
                  imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D611ADF5AAD898B8B651186E023.avif',
                  price: 550,
                  categoryId: 1,
                  items: [
                    { price: 550, size: 25, pizzaType: 1 },
                    { price: 690, size: 30, pizzaType: 1 },
                    { price: 790, size: 35, pizzaType: 2 },
                  ],
                },
                {
                  id: 2,
                  name: 'Пепперони Фреш',
                  imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D611ADF5AAD898B8B651186E023.avif',
                  price: 395,
                  categoryId: 1,
                  items: [
                    { price: 395, size: 25, pizzaType: 1 },
                    { price: 545, size: 30, pizzaType: 1 },
                  ],
                },
                {
                  id: 3,
                  name: 'Сырная',
                  imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D611ADF5AAD898B8B651186E023.avif',
                  price: 450,
                  categoryId: 1,
                  items: [
                    { price: 450, size: 25, pizzaType: 1 },
                    { price: 590, size: 30, pizzaType: 2 },
                  ],
                },
                {
                  id: 1,
                  name: 'Чизбургер-пицца',
                  imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D611ADF5AAD898B8B651186E023.avif',
                  price: 550,
                  categoryId: 1,
                  items: [
                    { price: 550, size: 25, pizzaType: 1 },
                    { price: 690, size: 30, pizzaType: 1 },
                    { price: 790, size: 35, pizzaType: 2 },
                  ],
                },
                {
                  id: 2,
                  name: 'Пепперони Фреш',
                  imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D611ADF5AAD898B8B651186E023.avif',
                  price: 395,
                  categoryId: 1,
                  items: [
                    { price: 395, size: 25, pizzaType: 1 },
                    { price: 545, size: 30, pizzaType: 1 },
                  ],
                },
                {
                  id: 3,
                  name: 'Сырная',
                  imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D611ADF5AAD898B8B651186E023.avif',
                  price: 450,
                  categoryId: 1,
                  items: [
                    { price: 450, size: 25, pizzaType: 1 },
                    { price: 590, size: 30, pizzaType: 2 },
                  ],
                },
                {
                  id: 1,
                  name: 'Чизбургер-пицца',
                  imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D611ADF5AAD898B8B651186E023.avif',
                  price: 550,
                  categoryId: 1,
                  items: [
                    { price: 550, size: 25, pizzaType: 1 },
                    { price: 690, size: 30, pizzaType: 1 },
                    { price: 790, size: 35, pizzaType: 2 },
                  ],
                },
                {
                  id: 2,
                  name: 'Пепперони Фреш',
                  imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D611ADF5AAD898B8B651186E023.avif',
                  price: 395,
                  categoryId: 1,
                  items: [
                    { price: 395, size: 25, pizzaType: 1 },
                    { price: 545, size: 30, pizzaType: 1 },
                  ],
                },
                {
                  id: 3,
                  name: 'Сырная',
                  imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D611ADF5AAD898B8B651186E023.avif',
                  price: 450,
                  categoryId: 1,
                  items: [
                    { price: 450, size: 25, pizzaType: 1 },
                    { price: 590, size: 30, pizzaType: 2 },
                  ],
                },
              ]} />

              <ProductGroupList categoryId={2} title="Комбо" items={[
                {
                  id: 1,
                  name: 'Чизбургер-пицца',
                  imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D611ADF5AAD898B8B651186E023.avif',
                  price: 550,
                  categoryId: 1,
                  items: [
                    { price: 550, size: 25, pizzaType: 1 },
                    { price: 690, size: 30, pizzaType: 1 },
                    { price: 790, size: 35, pizzaType: 2 },
                  ],
                },
                {
                  id: 2,
                  name: 'Пепперони Фреш',
                  imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D611ADF5AAD898B8B651186E023.avif',
                  price: 395,
                  categoryId: 1,
                  items: [
                    { price: 395, size: 25, pizzaType: 1 },
                    { price: 545, size: 30, pizzaType: 1 },
                  ],
                },
                {
                  id: 3,
                  name: 'Сырная',
                  imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D611ADF5AAD898B8B651186E023.avif',
                  price: 450,
                  categoryId: 1,
                  items: [
                    { price: 450, size: 25, pizzaType: 1 },
                    { price: 590, size: 30, pizzaType: 2 },
                  ],
                },
                {
                  id: 1,
                  name: 'Чизбургер-пицца',
                  imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D611ADF5AAD898B8B651186E023.avif',
                  price: 550,
                  categoryId: 1,
                  items: [
                    { price: 550, size: 25, pizzaType: 1 },
                    { price: 690, size: 30, pizzaType: 1 },
                    { price: 790, size: 35, pizzaType: 2 },
                  ],
                },
                {
                  id: 2,
                  name: 'Пепперони Фреш',
                  imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D611ADF5AAD898B8B651186E023.avif',
                  price: 395,
                  categoryId: 1,
                  items: [
                    { price: 395, size: 25, pizzaType: 1 },
                    { price: 545, size: 30, pizzaType: 1 },
                  ],
                },
                {
                  id: 3,
                  name: 'Сырная',
                  imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D611ADF5AAD898B8B651186E023.avif',
                  price: 450,
                  categoryId: 1,
                  items: [
                    { price: 450, size: 25, pizzaType: 1 },
                    { price: 590, size: 30, pizzaType: 2 },
                  ],
                },
                {
                  id: 1,
                  name: 'Чизбургер-пицца',
                  imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D611ADF5AAD898B8B651186E023.avif',
                  price: 550,
                  categoryId: 1,
                  items: [
                    { price: 550, size: 25, pizzaType: 1 },
                    { price: 690, size: 30, pizzaType: 1 },
                    { price: 790, size: 35, pizzaType: 2 },
                  ],
                },
                {
                  id: 2,
                  name: 'Пепперони Фреш',
                  imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D611ADF5AAD898B8B651186E023.avif',
                  price: 395,
                  categoryId: 1,
                  items: [
                    { price: 395, size: 25, pizzaType: 1 },
                    { price: 545, size: 30, pizzaType: 1 },
                  ],
                },
                {
                  id: 3,
                  name: 'Сырная',
                  imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D611ADF5AAD898B8B651186E023.avif',
                  price: 450,
                  categoryId: 1,
                  items: [
                    { price: 450, size: 25, pizzaType: 1 },
                    { price: 590, size: 30, pizzaType: 2 },
                  ],
                },
                {
                  id: 1,
                  name: 'Чизбургер-пицца',
                  imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D611ADF5AAD898B8B651186E023.avif',
                  price: 550,
                  categoryId: 1,
                  items: [
                    { price: 550, size: 25, pizzaType: 1 },
                    { price: 690, size: 30, pizzaType: 1 },
                    { price: 790, size: 35, pizzaType: 2 },
                  ],
                },
                {
                  id: 2,
                  name: 'Пепперони Фреш',
                  imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D611ADF5AAD898B8B651186E023.avif',
                  price: 395,
                  categoryId: 1,
                  items: [
                    { price: 395, size: 25, pizzaType: 1 },
                    { price: 545, size: 30, pizzaType: 1 },
                  ],
                },
                {
                  id: 3,
                  name: 'Сырная',
                  imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D611ADF5AAD898B8B651186E023.avif',
                  price: 450,
                  categoryId: 1,
                  items: [
                    { price: 450, size: 25, pizzaType: 1 },
                    { price: 590, size: 30, pizzaType: 2 },
                  ],
                },

              ]} />
            </div>
          </div>

        </div>
      </Container>

    </>
  );
}
