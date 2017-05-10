function fetchUrl(pathname, callback) {
  const responses = {
    '/users/1': { id: 1, name: 'Lisa' },
    '/users/2': { id: 2, name: 'Homer' },
    '/users/3': { id: 3, name: 'Marge' }
  };

  setTimeout(function() {
    const response = responses[pathname];
    callback(response ? null : new Error('Not Found!'), response);
  }, Math.random() * 10000);
}

// fetchAll supports any async functions that take a pathname as an argument with the structure '/path/id'
function fetchAll(fetchFunc, path, ...idArgs) {
  if (!fetchFunc || !path || idArgs.length === 0) {
    throw new Error('fetchAll requires a function, path, and at least one id');
  }
  const resultsArr = [];
  // keep count of number of async requests completed
  let counter = 0;
  idArgs.forEach((id, i) => {
    let pathname = `/${path}/${id}`;
    fetchFunc(pathname, function(err, result) {
      resultsArr[i] = err ? err.message : result;
      counter++;
      // if all aync requests completed log result
      if (counter === idArgs.length) {
        console.log('fetchAll result:')
        // logs array of user information in the order they were requested
        console.log(resultsArr);
      }
    })
  })
}

// promisified version of fetchUrl
function promisifiedFetchUrl(pathname) {
  return new Promise(function(resolve, reject) {
    fetchUrl(
      pathname,
      (err, result) => err ? reject(err) : resolve(result)
    );
  });
}

// if fetchUrl returns a promise and node runtime supports async/await
async function fetchAllWithPromises(promisifiedFetchFunc, path, ...idArgs) {
  if (!fetchFunc || !path || idArgs.length === 0) {
    throw new Error('fetchAllWithPromises requires a function, path, and at least one id');
  }
  const arrayOfPromises = [];
  idArgs.forEach((id, i) => {
    let pathname = `/${path}/${id}`;
    arrayOfPromises[i] = promisifiedFetchFunc(pathname)
      .then(result => {
        return result;
      })
      .catch(err => {
        return err.message;
      });
  })
  const resultsArr = await Promise.all(arrayOfPromises);
  console.log('fetchAllWithPromises result:')
  console.log(resultsArr);
}

// sample results
fetchAll(fetchUrl, 'users', 3, 1, 5, 0, 2);
fetchAllWithPromises(promisifiedFetchUrl, 'users', 3, 1, 5, 0, 2);
