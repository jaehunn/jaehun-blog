'use client';

import Giscus from '@giscus/react';
import { useMemo } from 'react';

export default function Comments() {
  const config = useMemo(
    () => ({
      repo: process.env.NEXT_PUBLIC_GISCUS_REPO,
      repoId: process.env.NEXT_PUBLIC_GISCUS_REPO_ID,
      category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY,
      categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID,
      mapping: process.env.NEXT_PUBLIC_GISCUS_MAPPING || 'pathname',
      reactionsEnabled: process.env.NEXT_PUBLIC_GISCUS_REACTIONS_ENABLED || '1',
      emitMetadata: process.env.NEXT_PUBLIC_GISCUS_EMIT_METADATA || '0',
      inputPosition:
        (process.env.NEXT_PUBLIC_GISCUS_INPUT_POSITION as 'top' | 'bottom') || 'bottom',
      lang: process.env.NEXT_PUBLIC_GISCUS_LANG || 'ko',
      loading: process.env.NEXT_PUBLIC_GISCUS_LOADING || 'lazy',
      theme: process.env.NEXT_PUBLIC_GISCUS_THEME || 'preferred_color_scheme',
    }),
    [],
  );

  return (
    <section className="mt-16">
      <Giscus
        id="comments"
        repo={config.repo as `${string}/${string}`}
        repoId={config.repoId as string}
        category={config.category as string}
        categoryId={config.categoryId as string}
        mapping={config.mapping as 'pathname' | 'url' | 'title' | 'og:title' | 'specific'}
        reactionsEnabled={config.reactionsEnabled as '0' | '1'}
        emitMetadata={config.emitMetadata as '0' | '1'}
        inputPosition={config.inputPosition}
        theme={config.theme as string}
        lang={config.lang as string}
        loading={config.loading as 'lazy' | 'eager'}
      />
    </section>
  );
}
