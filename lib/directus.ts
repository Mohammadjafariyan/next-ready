import { authentication, createDirectus, graphql, rest } from '@directus/sdk';
import { BACKEND_URL } from './constants';

const directus = createDirectus(BACKEND_URL)
  .with(authentication('cookie', { credentials: 'include', autoRefresh: true }))
  .with(rest({ credentials: 'include' }))
  .with(graphql({ credentials: 'include' }));

export default directus;
