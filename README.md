# codersMojoFrontend

CodersMojo is an AI-based peer-to-peer interactive tech interview platform for Women to connect with great tech companies and prepare them well for their tech interview.

staging: <https://coders-mojo-frontend-staging.vercel.app/>

prod: <https://coders-mojo-frontend.vercel.app/>

## Requirement

- install yarn
- install node (v12+)

## Testing and run

```zsh
$ yarn

// development
$ yarn run dev

// production
$ yarn run production

// run type check
$ yarn run type-check

// use eslint and prettier to format code
$ yarn run lint
```

## Docker

```zsh
// build images and start container in one line
docker-compose up -d --build

// go to container
docker exec -it <containerId> /bin/bash

// check container logs
docker logs <containerId>

// remove and stop container
docker-compose down
```

open localhost:5000
