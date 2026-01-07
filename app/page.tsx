import CoinOverview from "@/components/home/CoinOverview";
import {
  CoinOverviewFallback,
  TrendingCoinsFallback,
} from "@/components/home/fallback";
import TrendingCoins from "@/components/home/TrendingCoins";
import { Suspense } from "react";

const page = async () => {
  return (
    <main className="main-container">
      <section className="home-grid"></section>
      <Suspense fallback={<CoinOverviewFallback />}>
        <CoinOverview />
      </Suspense>
      <Suspense fallback={<TrendingCoinsFallback />}>
        <TrendingCoins />
      </Suspense>
      <section className="w-full mt-7 space-y-4">
        <p>Categories</p>
      </section>
    </main>
  );
};

export default page;
