## Lobby Room for Colyseus in React
The point of this spike project is to see the feasibility of 
- create a lobby UI that can be reused for multiplayer game based on Colyseus. It allows users to find each others, create new game rooms, etc
- based on React+Typescript (simple enough, component based so graat for reuse)
- eventually become a starting template for future Colyseus base games 

## How to use
- two folders, client and server, no dependency or sharing anything (so far)
- both npm+typescript
- check package.json to see the starting scripts
- the server starts on port 3000 by default
- the client is often pushed through Vite
- so far, only connects through localhost

## Upcoming

- [] client reusing same host by default instead of localhost, or another url injected by context
- [] allows context wrapping to inject url to the component
- [] review possibilities to handle starting random games, if parameters are needed, etc
- [] merge into one server serving both the Colyseus websocket and the react app []

## Bug

- [] there is always one extra player even though the original has left the room to create another one (can't be in
  several rooms)
 
