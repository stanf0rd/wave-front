import ajax from './ajax';


/*                  current user                  */

export async function register(form) {
  try {
    return await ajax.POST({
      path: '/users',
      body: form,
    });
  } catch (err) {
    return { err };
  }
}

/**  `await getProfile`  returns `{profile}`  OR  `{err}`.  */
export async function getProfile() {
  try {
    const profile = await ajax.GET({
      path: '/users/me',
    });
    return { data: profile };
  } catch (err) {
    return { err };
  }
}

/**  `await getProfile`  returns `{err}` OR  nothing.  */
export async function updateProfile(form) {
  try {
    return await ajax.PUT({
      path: '/users/me',
      body: form,
    });
  } catch (err) {
    return { err };
  }
}


/*                      other users                      */

/**  `await getUser`  returns `{user}`  OR  `{err}`.  */
export async function getUser(name) {
  try {
    const user = await ajax.GET({
      path: `/users/${name}`,
    });
    return { data: user };
  } catch (err) {
    return { err };
  }
}


/*                      session                      */

export async function login(loginData) {
  try {
    return await ajax.POST({
      path: '/session',
      body: loginData,
    });
  } catch (err) {
    return err;
  }
}

export async function logout() {
  try {
    return await ajax.DELETE({
      path: '/session',
    });
  } catch (err) {
    return err;
  }
}


/*                       store                       */

export async function getStore() {
  try {
    const store = await ajax.GET({
      path: '/storedata',  // FIXME: temporary solution!
    });
    return { data: store };
  } catch (err) {
    return { err };
  }
}


/*                        home                       */

export async function getHome() {
  try {
    const home = await ajax.GET({
      path: '/apps/me',  // FIXME: temporary solution!
    });
    return { data: home };
  } catch (err) {
    return { err };
  }
}
