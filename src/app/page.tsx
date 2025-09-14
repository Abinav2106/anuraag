import { Hero } from "@/components/hero";
import { ProductCategories } from "@/components/product-categories";
import { IndustryMarkets } from "@/components/industry-markets";
import { QualityAssurance } from "@/components/quality-assurance";
import { DealerBulk } from "@/components/dealer-bulk";

export default function Home() {
  return (
    <>
      <Hero />
      <ProductCategories />
      <IndustryMarkets />
      <QualityAssurance />
      <DealerBulk />
    </>
  );
}
