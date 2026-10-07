import { Container, Title, TopBar, Filters } from "@/shared/components/shared";
import { ProductGroupList } from "@/shared/components/shared/product-group-list";
import { prisma } from "@/prisma/prisma-client";
import { Suspense } from "react";
import { findPizzas, GetSearchParams } from "@/lib/find-pizzas";

export default async function Home({ searchParams }: { searchParams: Promise<GetSearchParams> }) {

  const params = await searchParams;
  const categories = await findPizzas(params);

  return (
    <>

      <Container className="mt-10">
        <Title text="Все пиццы" size="lg" className="font-extrabold" />
      </Container>

      <TopBar categories={categories.filter(c => c.products.length > 0)} />

      <Container className="pb-14 mt-10">
        <div className="flex gap-[60px]">

          {/* Фильтрация */}
          <div className="w-[250px]">
            <Suspense>
              <Filters />
            </Suspense>
          </div>

          {/* Список товаров */}
          <div className="flex-1">
            <div className="flex flex-col gap-16">

              {categories.map((category) => (
                category.products.length > 0 && (
                  <ProductGroupList
                    key={category.id}
                    title={category.name}
                    items={category.products}
                    categoryId={category.id}
                  />
                )
              ))}

            </div>
          </div>

        </div>
      </Container>

    </>
  );
}
