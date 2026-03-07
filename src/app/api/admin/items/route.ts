import { NextResponse } from 'next/server';
import { readFile, writeFile } from 'fs/promises';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'src/data/summit-config.json');

export async function GET() {
  try {
    const data = await readFile(DATA_FILE, 'utf-8');
    const config = JSON.parse(data);
    return NextResponse.json(config);
  } catch (error) {
    console.error('Error reading config:', error);
    return NextResponse.json(
      { error: 'Failed to read configuration' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { section, action, item } = body;

    const currentData = await readFile(DATA_FILE, 'utf-8');
    const config = JSON.parse(currentData);

    if (!config[section as keyof typeof config]) {
      return NextResponse.json(
        { error: 'Invalid section' },
        { status: 400 }
      );
    }

    const sectionData = config[section] as any;

    if (action === 'add') {
      if (Array.isArray(sectionData)) {
        sectionData.push({ ...item, id: Date.now().toString() });
      }
    } else if (action === 'update') {
      if (Array.isArray(sectionData)) {
        const index = sectionData.findIndex((i: any) => i.id === item.id);
        if (index !== -1) {
          sectionData[index] = item;
        }
      }
    } else if (action === 'delete') {
      if (Array.isArray(sectionData)) {
        const index = sectionData.findIndex((i: any) => i.id === item.id);
        if (index !== -1) {
          sectionData.splice(index, 1);
        }
      }
    }

    await writeFile(DATA_FILE, JSON.stringify(config, null, 2), 'utf-8');

    return NextResponse.json({ success: true, message: 'Item updated successfully' });
  } catch (error) {
    console.error('Error updating config:', error);
    return NextResponse.json(
      { error: 'Failed to update configuration' },
      { status: 500 }
    );
  }
}
