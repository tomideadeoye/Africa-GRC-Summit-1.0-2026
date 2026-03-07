
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seed() {
  const configPath = path.join(__dirname, 'src/data/summit-config.json');
  const configData = JSON.parse(fs.readFileSync(configPath, 'utf8'));

  console.log('Seeding summit_config with id: africa-grc-1.0');

  const { data, error } = await supabase
    .from('summit_config')
    .upsert({
      id: 'africa-grc-1.0',
      content: configData
    });

  if (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }

  console.log('Successfully seeded Supabase summit_config table.');
}

seed();
