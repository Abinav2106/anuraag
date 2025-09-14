import { Hero } from "@/components/hero";
import { ProductKitCarousel } from "@/components/product-kit-carousel";
import { IndustryMarkets } from "@/components/industry-markets";
import { QualityAssurance } from "@/components/quality-assurance";
import { DealerBulk } from "@/components/dealer-bulk";

export default function Home() {
  return (
    <>
      <Hero />
      <ProductKitCarousel />
      <IndustryMarkets />
      <QualityAssurance />
      <DealerBulk />
    </>
  );
}
