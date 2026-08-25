import { useEffect, useState } from 'react';

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url, { cache: 'no-store' });
  if (!response.ok) throw new Error(`Request failed: ${response.status}`);
  return response.json();
}

export function useCategories() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchJson<any[]>('/api/categories')
      .then(data => {
        setCategories(data);
      })
      .catch(() => setError('Impossible de charger les rubriques.'))
      .finally(() => setLoading(false));
  }, []);

  return { categories, loading, error, setCategories };
}

export function useConfig() {
  const [config, setConfig] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchJson<any>('/api/config')
      .then(data => {
        setConfig(data);
      })
      .catch(() => setError('Impossible de charger la configuration.'))
      .finally(() => setLoading(false));
  }, []);

  return { config, loading, error };
}

export function useAds(location?: string, format?: string) {
  const [ads, setAds] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let url = '/api/ads?';
    if (location) url += `location=${location}&`;
    if (format) url += `format=${format}`;
    
    fetchJson<any[]>(url)
      .then(data => {
        setAds(data.filter((ad: any) => ad.isActive));
      })
      .catch(() => setError('Impossible de charger les annonces.'))
      .finally(() => setLoading(false));
  }, [location, format]);

  return { ads, loading, error };
}

export function useArticles(params?: { category?: string; featured?: boolean; limit?: number; sort?: string; q?: string }) {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let url = '/api/articles?';
    if (params?.category) url += `category=${params.category}&`;
    if (params?.featured) url += `featured=${params.featured}&`;
    if (params?.limit) url += `limit=${params.limit}&`;
    if (params?.sort) url += `sort=${params.sort}&`;
    if (params?.q) url += `q=${encodeURIComponent(params.q)}&`;

    fetchJson<any[]>(url)
      .then(data => {
        setArticles(data);
      })
      .catch(() => setError('Impossible de charger les articles.'))
      .finally(() => setLoading(false));
  }, [params?.category, params?.featured, params?.limit, params?.sort, params?.q]);

  return { articles, loading, error };
}

export function useChroniques() {
  const [chroniques, setChroniques] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchJson<any[]>('/api/chroniques')
      .then(data => {
        setChroniques(data);
      })
      .catch(() => setError('Impossible de charger les chroniques.'))
      .finally(() => setLoading(false));
  }, []);

  return { chroniques, loading, error };
}
