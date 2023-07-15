import axios from 'axios';
const modules = [
  'create-vtj',
  '@vtj/cli',
  '@vtj/utils',
  '@vtj/icons',
  '@vtj/ui',
  '@vtj/engine',
  '@vtj/runtime',
  '@vtj/ide',
  '@vtj/assets',
  '@vtj/deps'
  // '@newpearl/lcdp-adapter',
  // '@newpearl/lcdp-assets',
  // '@newpearl/lcdp-charts',
  // '@newpearl/lcdp-engine',
  // '@newpearl/lcdp-ui',
  // '@newpearl/lcdp-mui',
  // '@newpearl/lcdp-utils',
  // '@newpearl/lcdp-icons',
  // '@newpearl/lcdp-deps'
];

const maxTimes = 60;
let counter = 0;

async function sendSync(name) {
  const res = await axios
    .put(
      `https://registry-direct.npmmirror.com/${name}/sync?sync_upstream=true`
    )
    .catch((e) => {
      console.log('error', e.message);
      return {};
    });
  if (res.data) {
    const logId = res.data.logId;
    counter = 0;
    await checkDone(logId);
    console.log('sendSync:', name, 'done!');
  }
}

async function checkDone(logId) {
  const res = await axios
    .get(
      `https://registry-direct.npmmirror.com/@newpearl/cli/sync/log/${logId}`
    )
    .catch((e) => {
      console.log('error:', e.message);
      return {};
    });
  let syncDone = !!res.data?.syncDone;
  return new Promise((resolve) => {
    if (!syncDone) {
      ++counter;
      if (counter > maxTimes) {
        console.log('error:', `${logId} checkDone timeout`);
        resolve(true);
        return;
      }
      setTimeout(async () => {
        syncDone = await checkDone(logId);
        if (syncDone) {
          resolve(true);
        }
      }, 1000);
    } else {
      resolve(true);
    }
  });
}

for (let mod of modules) {
  await sendSync(mod);
}
