var defaultState = [];
export default function(state=defaultState, action){
  switch (action.type) {
    case "Get_Repos":
      gitRepos = action.payload;
      console.log(action, 'action');
      return gitRepos;
  }
  return defaultState;
}
