import App from "./app"

const Main = async () => {
  const app = new App()
  return await app.Listen()
}

Main()
