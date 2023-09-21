export async function createUser(userInfo) {
  const users = await getAllUsers();
  const index = users.data.findIndex((user) => userInfo.email === user.email);
  return new Promise(async (resolve, reject) => {
    if (index < 0) {
      const response = await fetch('http://localhost:8080/user/signup', {
        method: 'POST',
        body: JSON.stringify(userInfo),
        headers: { 'content-type': 'application/json' },
      });
      const data = await response.json();
      resolve({ data });
    }
    else { reject(); }
  });
}

export function checkUser(user) {
  return new Promise(async (resolve,reject) => {
    const response = await fetch('http://localhost:8080/user/check?email='+user.email);
    const data = await response.json();
    if (data.length>0)
    {
      if (user.password===data[0].password)
      {
        resolve({data});
      }
      else
      {
        reject();
      }
    }
    else
    {
      reject();
    }
  });
}

export function getAllUsers() {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/user/all')
    const data = await response.json();
    resolve({ data });
  });
}

export function updateUser(userInfo) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/user/update?id='+userInfo._id,{
      method:'PUT',
      body:JSON.stringify(userInfo),
      headers: { 'content-type': 'application/json' }
    });
    const data = await response.json();
    resolve({ data });
  });
}