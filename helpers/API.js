export function GET_BASE_URL (){
  // return 'http://192.168.254.102:5000/api/'
  return 'https://grubworm-full-dory.ngrok-free.app/api/'
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

// export async function DELETE_MARKER(mapId){
//   console.log("deleted")
// }

// export async function GET_MARKER(userId){
//   return [
//     { 
//       mapId: 1, 
//       longitude: 121.062 , latitude: 14.626 	,
//       date:"Thu, May 1, 2024 13:39",
//       nitrogen: 0,phosphorus: 0, potassium: 0, acidity: 0, moisture: 0
//     },
//     { 
//       mapId: 2, 
//       longitude: 121.062 , latitude: 14.626 	,
//       date:"Thu, May 1, 2024 13:39",
//       nitrogen: 0,phosphorus: 0, potassium: 0, acidity: 0, moisture: 0
//     },
//     { 
//       mapId: 3, 
//       longitude: 121.062 , latitude: 14.626 	,
//       date:"Thu, May 1, 2024 13:39",
//       nitrogen: 0,phosphorus: 0, potassium: 0, acidity: 0, moisture: 0
//     },
//     { 
//       mapId: 4, 
//       longitude: 121.062 , latitude: 14.626 	,
//       date:"Thu, May 1, 2024 13:39",
//       nitrogen: 0,phosphorus: 0, potassium: 0, acidity: 0, moisture: 0
//     },
//     { 
//       mapId: 5, 
//       longitude: 121.062 , latitude: 14.626 	,
//       date:"Thu, May 1, 2024 13:39",
//       nitrogen: 0,phosphorus: 0, potassium: 0, acidity: 0, moisture: 0
//     },
//     { 
//       mapId: 6, 
//       longitude: 121.062 , latitude: 14.626 	,
//       date:"Thu, May 1, 2024 13:39",
//       nitrogen: 0,phosphorus: 0, potassium: 0, acidity: 0, moisture: 0
//     },
//     { 
//       mapId: 7, 
//       longitude: 121.062 , latitude: 14.626 	,
//       date:"Thu, May 1, 2024 13:39",
//       nitrogen: 0,phosphorus: 0, potassium: 0, acidity: 0, moisture: 0
//     },
//     { 
//       mapId: 8, 
//       longitude: 121.062 , latitude: 14.626 	,
//       date:"Thu, May 1, 2024 13:39",
//       nitrogen: 0,phosphorus: 0, potassium: 0, acidity: 0, moisture: 0
//     },
//     { 
//       mapId: 9, 
//       longitude: 121.062 , latitude: 14.626 	,
//       date:"Thu, May 1, 2024 13:39",
//       nitrogen: 0,phosphorus: 0, potassium: 0, acidity: 0, moisture: 0
//     }
//   ]
// }