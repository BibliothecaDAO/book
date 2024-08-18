import type { PortfolioToken } from "@/types/ark";
import type { ArkClient } from "./client"


export interface PortfolioCollectionApiResponse {
  token_count: number;
  data: PortfolioToken[];
  next_page: number | null;

}

interface GetPortfolioActivityParams {
  client: ArkClient
  walletAddress: string
  collectionAddress: string
  page?: number
  itemsPerPage?: number
}

export async function getPortfolioTokens({ client, walletAddress, collectionAddress, page = 1, itemsPerPage = 10 }: GetPortfolioActivityParams): Promise<PortfolioCollectionApiResponse> {
  const queryParams = [`items_per_page=${itemsPerPage}`, `page=${page}`, `collection=${collectionAddress}`];

  try {
    return await client.fetch(`/portfolio/${walletAddress}?${queryParams.join("&")}`);
  } catch (_) {
    return {
      data: [],
      next_page: null,
      token_count: 0,
    };
  }
}
