export async function getByUsername(username){
    let requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      const response = await fetch(`https://api.github.com/users/${username}`, requestOptions);
      return response.json();
}

export async function getAllUsers(perPage){
  let requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  const response = await fetch(`https://api.github.com/users?per_page=${perPage}`, requestOptions);
  return response.json();
}