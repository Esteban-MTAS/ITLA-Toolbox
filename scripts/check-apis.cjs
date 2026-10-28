// Read-only checks against real endpoints; does not save personal response data.
const fs = require('fs');
const checks = {
  gender: 'https://api.genderize.io/?name=irma',
  unknownGender: 'https://api.genderize.io/?name=zzqxzzqxzz',
  person: 'https://randomuser.me/api/?results=1&inc=name,dob,picture',
  universities: 'https://adamix.net/proxy.php?country=Dominican%20Republic',
  weather:
    'https://api.open-meteo.com/v1/forecast?latitude=18.4861&longitude=-69.9312&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=America%2FSanto_Domingo&forecast_days=1',
  pokemon: 'https://pokeapi.co/api/v2/pokemon/pikachu',
  missingPokemon: 'https://pokeapi.co/api/v2/pokemon/zzqxzzqxzz',
  wordpress:
    'https://wordpress.org/news/wp-json/wp/v2/posts?per_page=3&_embed&orderby=date&order=desc',
  logo: 'https://s.w.org/style/images/about/WordPress-logotype-wmark.png',
};
async function main() {
  const results = [];
  for (const [name, url] of Object.entries(checks)) {
    try {
      const response = await fetch(url, { signal: AbortSignal.timeout(25000) });
      const entry = {
        name,
        status: response.status,
        ok: name === 'missingPokemon' ? response.status === 404 : response.ok,
      };
      if (response.ok && name !== 'logo') {
        const data = await response.json();
        if (name === 'wordpress') {
          entry.count = data.length;
          entry.dates = data.map(p => p.date_gmt);
          entry.ok = data.length === 3;
        }
        if (name === 'unknownGender') {
          entry.gender = data.gender;
          entry.ok = data.gender === null;
        }
        if (name === 'universities') {
          entry.count = data.length;
          entry.ok = Array.isArray(data) && data.length > 0;
        }
        if (name === 'weather') {
          entry.observation = data.current.time;
          entry.timezone = data.timezone;
        }
        if (name === 'pokemon') {
          const audio = await fetch(data.cries.latest, {
            signal: AbortSignal.timeout(25000),
          });
          entry.audioStatus = audio.status;
          entry.audioType = audio.headers.get('content-type');
          entry.ok = audio.ok;
        }
      }
      results.push(entry);
    } catch (e) {
      results.push({ name, ok: false, error: e.message });
    }
  }
  const report = { checkedAt: new Date().toISOString(), results };
  fs.mkdirSync('docs', { recursive: true });
  fs.writeFileSync(
    'docs/API_CHECKS.json',
    JSON.stringify(report, null, 2) + '\n',
  );
  console.log(JSON.stringify(report, null, 2));
  if (results.some(r => !r.ok)) {
    process.exitCode = 1;
  }
}
main();
