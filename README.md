# Notes
- I've implemented two versions of fetchAll - the second assumes fetchUrl returns a promise and that async/await is supported in node runtime
- If the client is fetching user information, I'm assuming the client knows which users they want to fetch and the pathname to request each user
- The client could also fetch other information if the endpoints exist e.g. '/products/2'
- The client could possibly be an admin for a web app
