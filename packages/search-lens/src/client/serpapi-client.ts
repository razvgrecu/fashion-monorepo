import { config, getJson } from 'serpapi';

import {
  LensSearchMetadata,
  LensSearchResult,
  SerpApiLensRequest,
  SerpApiLensResponse,
} from '../domain';

config.api_key =
  process.env.SERP_API_KEY ??
  '7e9bee2cee49f7bdebcc5a53fe46d56902954ff1996b0ac26120feeef1972eef';
config.timeout = 60000;

export async function lensQuery(
  query: SerpApiLensRequest,
): Promise<SerpApiLensResponse> {
  // TODO: add key validation check

  const lensResult = await getJson({
    engine: 'google_lens',
    country: 'gb',
    url: query.url,
  });

  const results = (
    (lensResult['visual_matches'] ?? []) as Array<Record<string, unknown>>
  ).map(
    (it) =>
      <LensSearchResult>{
        position: it.position,
        link: it.link,
        source: it.source,
        title: it.title,
        thumbnail: it.thumbnail,
        price: it.price,
      },
  );

  const lensMetadata = lensResult['search_metadata'];
  const metadata: LensSearchMetadata = {
    id: lensMetadata?.id,
    lensUrl: lensMetadata['google_lens_url'],
    rawHtmlFile: lensMetadata['raw_html_file'],
    totalTimeTaken: lensMetadata['total_time_taken'],
  };

  return {
    metadata: metadata as Required<LensSearchMetadata>,
    results: results,
  };
}
