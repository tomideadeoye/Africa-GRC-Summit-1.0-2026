import { NextResponse } from 'next/server';
import { readFile, writeFile } from 'fs/promises';
import path from 'path';
import { supabase } from '@/lib/supabase';
import { getMasterConfig } from '@/lib/config-store';

const DATA_FILE = path.join(process.cwd(), 'src/data/summit-config.json');

// The row ID in Supabase to maintain the master configuration for this edition
const MASTER_CONFIG_ID = 'africa-grc-1.0';
const TABLE_NAME = 'summit_config';

/**
 * Fetch the master configuration from Supabase and fallback to the local JSON file.
 * We prioritize Supabase but ensure local sync.
 */
export async function GET() {
  try {
    const config = await getMasterConfig();
    return NextResponse.json(config);
  } catch (error) {
    console.error('Master config error:', error);
    // Absolute fallback to local file
    try {
      const localData = await readFile(DATA_FILE, 'utf-8');
      return NextResponse.json(JSON.parse(localData));
    } catch (localError) {
      return NextResponse.json({ error: 'Failed to read any configuration' }, { status: 500 });
    }
  }
}

/**
 * Update a specific section of the configuration (e.g., hero, agenda).
 * Updates are applied to both Supabase and the local JSON file for persistence.
 */
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { section, data } = body;

    if (!section || data === undefined) {
      return NextResponse.json({ error: 'Section and data are required' }, { status: 400 });
    }

    // 1. Fetch current config from Supabase (Prime Source)
    const config: Record<string, unknown> = await getMasterConfig();

    // 2. Perform the update
    config[section] = data;

    // 3. Persist to Supabase
    const { error: syncError } = await supabase
      .from(TABLE_NAME)
      .upsert({ id: MASTER_CONFIG_ID, content: config });

    if (syncError) {
      console.error('Supabase Sync Failed:', syncError);
      // We still update local file even if Supabase sync fails
    }

    // 4. Persist to Local File (Safety Cache / Fallback)
    await writeFile(DATA_FILE, JSON.stringify(config, null, 2), 'utf-8');

    return NextResponse.json({
      success: true,
      message: `${section} updated successfully.`,
      source: syncError ? 'local only' : 'global'
    });
  } catch (error) {
    console.error('Configuration update failure:', error);
    return NextResponse.json({ error: 'Failed to update configuration' }, { status: 500 });
  }
}
