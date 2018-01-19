var defaultState = [];
export default function(state=defaultState, action){
  switch (action.type) {
    case "Get_Menus":
      gitMenus = action.payload
      console.log(gitMenus, 'gitMenus');
      return gitMenus;
  }
  return state;
}
