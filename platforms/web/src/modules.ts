export const modules =
  process.env.NODE_ENV === 'production'
    ? import.meta.glob([
        '/.vtj/project.json',
        '/.vtj/raw/*.vue',
        '/src/views/*.vue'
      ])
    : import.meta.glob([
        '/.vtj/project.json',
        '/.vtj/files/*.json',
        '/.vtj/raw/*.vue',
        '/src/views/*.vue'
      ]);
