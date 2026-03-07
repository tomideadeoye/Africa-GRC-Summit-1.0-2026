import { readFile } from 'fs/promises';
import path from 'path';
import { supabase } from '@/lib/supabase';

const DATA_FILE = path.join(process.cwd(), 'src/data/summit-config.json');
const MASTER_CONFIG_ID = 'africa-grc-1.0';
const TABLE_NAME = 'summit_config';

export interface HeroConfig {
  title: string;
  subtitle: string;
  dates: string;
  venue: string;
  tagline: string;
  badge: string;
  status: string;
}

export interface SummitConfig {
  hero?: HeroConfig;
  agenda?: unknown[];
  [key: string]: unknown;
}

export async function getMasterConfig(): Promise<SummitConfig> {
  try {
    const { data: dbData } = await supabase
      .from(TABLE_NAME)
      .select('content')
      .eq('id', MASTER_CONFIG_ID)
      .single();

    if (dbData?.content) {
      return dbData.content as SummitConfig;
    }

    const localData = await readFile(DATA_FILE, 'utf-8');
    const config = JSON.parse(localData) as SummitConfig;

    if (!dbData) {
      await supabase.from(TABLE_NAME).upsert({
        id: MASTER_CONFIG_ID,
        content: config,
      });
    }

    return config;
  } catch {
    const localData = await readFile(DATA_FILE, 'utf-8');
    return JSON.parse(localData) as SummitConfig;
  }
}
