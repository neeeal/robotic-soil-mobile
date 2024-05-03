export function GET_BASE_URL (){
  return 'http://192.168.254.102:5000/api/'
}

export async function GET_MARKER(userId){
  // Specify the API endpoint for user data
  const apiUrl = GET_BASE_URL()+'analysis/'+userId;
  console.log(apiUrl)

  // Make a GET request using the Fetch API
  const data = await fetch(apiUrl,{
    method: 'GET',
    headers: { 
      'Content-type': 'application/json' 
    },
    // body: JSON.stringify({ "userId": userId })
    })
    .then(response => {
      if (!response.ok) {
        // console.log(response)
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(response => {
      // Process the retrieved user data
      console.log('msg:', response.msg);
      // console.log("analysis:", response.analysis);
      return response.analysis
    })
    .catch(error => {
      console.error('Error:', error);
      // Log the response for more information
      console.log('Response:', error);
      // console.log('body:', response);
    });

    if(!data){
      return false
    }

    return data
}

export async function DELETE_MARKER(mapId){
  const apiUrl = GET_BASE_URL()+'analysis/'+mapId;

  // Make a DELETE request using the Fetch API
  const data = await fetch(apiUrl,{
    method: 'DELETE',
    headers: { 
      'Content-type': 'application/json' 
    },
    // body: JSON.stringify({ "userId": userId })
    })
    .then(response => {
      if (!response.ok) {
        // console.log(response)
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(response => {
      // Process the retrieved user data
      console.log('msg:', response.msg);
      // console.log("analysis:", response.analysis);
      return response.analysis
    })
    .catch(error => {
      console.error('Error:', error);
      // Log the response for more information
      console.log('Response:', error);
      // console.log('body:', response);
    });

    if(!data){
      return false
    }

    return data
}