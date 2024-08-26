import  config  from "../config";

export async function makeRequest(person, method='post') {
  try{
  return await fetch("http://localhost:8080/persons", {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${config.apiToken}`,
    },
    body: JSON.stringify(person),
  });
}
catch(e){
  console.log(e);
}
}

export async function create(person) {
  console.log("Persons:", person)
  return makeRequest( person, 'post');
}

export async function edit(person) {
  return makeRequest( person, 'put' );
}
