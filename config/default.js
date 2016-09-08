module.exports = {
  server: {
    port: 8080,
    requestLimit: '1mb'
  },
  db: {
    url: 'postgres://postgres:postgres@127.0.0.1:5432/brackets-electron-data'
  }
}
