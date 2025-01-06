import Image from "next/image";
import Link from "next/link";
import { GameCard } from "@/app/(app)/games/GameCard";
import LordsIcon from "@/icons/lords.svg";
import { api } from "@/trpc/server";
import { reader } from "@/utils/keystatic";
import { Button } from "@realms-world/ui/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@realms-world/ui/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@realms-world/ui/components/ui/carousel";
import { formatNumber } from "@realms-world/utils";

import { PageLayout } from "../_components/PageLayout";
import { Partners } from "../_components/Partners";
import { VeLordsRewardsChart } from "./account/lords/velords/VeLordsRewardsChart";
import { BlogGrid } from "./blogs/BlogGrid";
import CollectionsList from "./collection/CollectionsList";

//import { EventGrid } from "./events/EventGrid";

export default async function Home() {
  const games = await reader().collections.games.all();
  const carouselItems = games
    .filter((a) => a.slug === "realms-eternum")
    .concat(
      games.filter(
        (a) =>
          a.slug !== "realms-eternum" &&
          (a.entry.status === "beta" || a.entry.status === "mainnet"),
      ),
    )
    .map((game) => ({
      alt: game.entry.title,
      src: `/content/games/${game.slug}/${game.entry.coverImage}`,
      description: game.entry.description,
      href: `/games/${game.slug}`,
      title: game.entry.title,
    }));

  const veLordsBurns = await api.veLordsBurns.all({});
  console.log(veLordsBurns);
  return (
    <PageLayout>
      <Carousel className="w-full">
        <CarouselContent>
          {carouselItems.map((item, index) => (
            <CarouselItem key={index}>
              <Link href={item.href}>
                <div className="relative h-[300px] border-b sm:h-[400px] md:h-[500px] lg:h-[700px]">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={1900}
                    height={1200}
                    className="h-full w-full rounded object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 rounded bg-gradient-to-r from-black to-transparent p-4 sm:p-6 md:p-8">
                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl">
                      {item.title}
                    </h2>
                    <p className="mb-2 text-sm sm:mb-3 sm:text-base md:mb-4 md:text-lg lg:text-xl">
                      {item.description}
                    </p>
                    <Button variant="outline" className="text-sm sm:text-base">
                      View game
                    </Button>
                  </div>
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2 sm:left-4 md:left-6 lg:left-8" />
        <CarouselNext className="right-2 sm:right-4 md:right-6 lg:right-8" />
      </Carousel>

      <div className="px-4 sm:px-6 md:px-8">
        <Partners />

        <h2 className="mb-4 font-sans text-xl sm:text-2xl md:text-3xl">
          All Games
        </h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {games.map((game, index) => (
            <GameCard key={index} game={game.entry} slug={game.slug} />
          ))}
        </div>

        <div className="my-12 sm:my-16 md:my-20 lg:my-24">
          <h2 className="mb-4 font-sans text-xl sm:text-2xl md:text-3xl">
            News
          </h2>
          <BlogGrid />
        </div>

        <div className="relative my-12 h-[600px] w-full overflow-hidden rounded-lg">
          <div className="absolute inset-0">
            <Image
              src="/velords-banner-bg.jpg"
              alt="veLords background"
              fill
              className="object-cover brightness-50"
            />
            <VeLordsRewardsChart data={veLordsBurns} totalSupply={1000000000} />
          </div>
          <div className="relative z-10 flex h-full flex-col items-center justify-center p-6">
            <h2 className="mb-8 text-center text-4xl font-bold md:text-5xl">
              veLords - Lords Staking
            </h2>

            <div className="grid w-full max-w-4xl grid-cols-1 gap-6 md:grid-cols-3">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-muted">APY</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{formatNumber(12.34)}%</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-muted">
                    Lords Locked
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="flex text-2xl font-bold">
                    <LordsIcon className="mr-3 w-5" />
                    {formatNumber(1234567)}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-muted">
                    90d Lords Rewards
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="flex text-2xl font-bold">
                    <LordsIcon className="mr-3 w-5" />
                    {formatNumber(98765)}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        <hr className="my-6 border sm:my-8" />
        <div className="my-12 sm:my-16 md:my-20">
          <h2 className="mb-4 font-sans text-xl sm:text-2xl md:text-3xl">
            Featured Collections
          </h2>
          <CollectionsList />
        </div>
      </div>
    </PageLayout>
  );
}
