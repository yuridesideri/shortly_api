# Overview

This project is a **REST API** for learning purposes that serves as a link shortener. It provides the following key features:

- Features JWT tokens along with Sessions for authentication security.
- Implements nice express code architecture with .
- Uses integration with PostgreSQL.

# Getting Started

To get started with this project, you will need to do the following:

1. Install dependencies: Run `npm install` to install any necessary dependencies in the root directory folder.
2. Dump the database located in `/database/dump.sql`.
3. Change `.env.example`  to `.env`, paste in the port of the application and also your postgres database connection.
4. Run `npm run start`

# Usage
## Routes:
**GET:**
* `/urls/:id` (link id)
* `/urls/open/:shortUrl` 
* `/urls/users/me` 
* `/ranking`

**POST:**
* `/signup`
* `/signin` 
* `/urls/shorten`

**DELETE:**
* `/urls/:id`


# Examples

Here is an example of how to use a route of the project:
```
//Request
https://shortly-api-server.onrender.com/ranking
```
```
//Response
[
  {
    "id": 5,
    "name": "Yuri",
    "linksCount": "2",
    "visitCount": "8"
  },
  {
    "id": 6,
    "name": "Romildo",
    "linksCount": "0",
    "visitCount": null
  }
]
```
note: this deploy in render will be up only until end of February,2023


# License

This project is released under the MIT License. See the `LICENSE` file for more details.
