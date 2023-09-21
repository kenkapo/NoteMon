export function createNote(note) {
    return new Promise(async (resolve) => {
      const response = await fetch('http://localhost:8080/note/add', {
        method: 'POST',
        body: JSON.stringify(note),
        headers: { 'content-type': 'application/json' },
      });
      const data = await response.json();
      // TODO: on server it will only return some info of user (not password)
      resolve({ data });
    });
  }

  export function getAllNotes(id) {
    return new Promise(async (resolve) => {
      const response = await fetch(`http://localhost:8080/note/all?id=`+id);
      const data = await response.json();
      // TODO: on server it will only return some info of user (not password)
      resolve({ data });
    });
  } 

  export function updateNote(note) {
    return new Promise(async (resolve) => {
      const response = await fetch(`http://localhost:8080/note/update?id=`+note._id,{
        method:"PATCH",
        body:JSON.stringify(note),
        headers: { 'content-type': 'application/json' },
      });
      const data = await response.json();
      // TODO: on server it will only return some info of user (not password)
      resolve({ data });
    });
  } 

  export function deleteNote(id) {
    return new Promise(async (resolve) => {
      const response = await fetch(`http://localhost:8080/note/delete?id=`+id,{
        method:"DELETE",
        headers: { 'content-type': 'application/json' },
      });
      const data = await response.json();
      // TODO: on server it will only return some info of user (not password)
      resolve({ data });
    });
  } 


  export function getAllStarredNotes(id) {
    return new Promise(async (resolve) => {
      const response = await fetch(`http://localhost:8080/note/all/star?id=`+id);
      const data = await response.json();
      // TODO: on server it will only return some info of user (not password)
      resolve({ data });
    });
  }


  export function searchNotes(obj) {
    return new Promise(async (resolve) => {
      const response = await fetch(`http://localhost:8080/note/search?id=`+obj.id+"&q="+obj.query+"&starred="+obj.star);
      const data = await response.json();
      // TODO: on server it will only return some info of user (not password)
      resolve({ data });
    });
  }

  export function sendNotes(obj) {
    return new Promise(async (resolve) => {
      const response = await fetch(`http://localhost:8080/note/send`,{
        method:"POST",
        body:JSON.stringify(obj),
        headers:{ 'content-type': 'application/json' },
      });
      const data = await response.json();
      // TODO: on server it will only return some info of user (not password)
      resolve({ data });
    });
  }
