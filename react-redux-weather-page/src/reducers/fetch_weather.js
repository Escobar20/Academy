// import merge from "lodash.merge";  merge([], state, action.payload[0]);
import "babel-polyfill"; // Save TypeError: Array.includes is not a function [].includes

const fetchWeather = (
  state = {
    weatherData: [],
    isExist: false,
    errorFetch: false,
    cityIDs: "3995465,4005539,4024597,3996063,5128638,3925227,3609673,7871777"
  },
  action
) => {
  if (action.type === "FETCH_WEATHER") {
    state = { ...state, errorFetch: false }; // Cero errors in fetch
    state = { ...state, isExist: false };

    //-----------------------------------------------------
    //LocalStorage

    const cachedHits = localStorage.getItem("IDsCities");
    if (cachedHits) {
      state = { ...state, cityIDs: cachedHits };
    }
    //---------------------------------------------------------------

    if (state.weatherData.length === 0) {
      if (action.payload[2] === "OK") {
        //Just when delete all cities and add the first card
        var aux = [];
        aux[0] = action.payload[0];
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        state = { ...state, cityIDs: action.payload[0].id }; //To save the id
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        state = { ...state, weatherData: aux };
      } else {
        // First time load cities by ID's
        state = { ...state, weatherData: action.payload };
      }
      localStorage.setItem("DataCities", JSON.stringify(state.weatherData));
    } else if (action.payload[2] === "OK") {
      // To push new cities

      state = { ...state, isExist: false };
      console.log("PAYLOAD", action.payload);
      console.log("STATE", state.weatherData);

      var check = [state.cityIDs].includes(`${action.payload[0].id}`);
      console.log("ID's duplicate ?? ", check);
      console.log("ID's List -> ", state.cityIDs);

      var temp = state.weatherData.slice();
      temp.map(city => {
        if (
          check &&
          city.name === action.payload[0].name &&
          city.sys.country === action.payload[0].sys.country
        ) {
          state = { ...state, isExist: true };
        }
      });

      if (!state.isExist) {
        // If not exist -> push it
        temp.push(action.payload[0]);
        state = { ...state, weatherData: temp };

        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        var ids = temp
          .map(data => {
            return `${data.id}`;
          })
          .join(","); // Concat de Cities IDs

        state = { ...state, cityIDs: ids }; //To save the id
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

        //--------------------------------------------------
        //LocalStorage
        localStorage.setItem("IDsCities", state.cityIDs);
        //--------------------------------------------------
      }
    }
  }
  if (action.type === "DELETE_CITY") {
    //-----------------------------------------------------
    //LocalStorage
    const cachedHits = localStorage.getItem("IDsCities");
    if (cachedHits) {
      state = { ...state, cityIDs: cachedHits };
    }
    //---------------------------------------------------------------
    var temp = state.weatherData.slice();

    // var newArray = temp.filter(
    //   el => el.name !== action.payload[0] && el.id !== action.payload[1]
    // );
    console.log("PAYLOAD ------ ", action.payload);
    var newArray = temp.filter(function(item) {
      if (item.name !== action.payload[0] || item.id !== action.payload[1]) {
        console.log("item.name", item.name);
        console.log("action.payload[0]", action.payload[0]);
        console.log("item.id", item.id);
        console.log("action.payload[1]", action.payload[1]);
        return true;
      }
      return false;
    });

    console.log("Deleted element in array - ", newArray);
    state = { ...state, weatherData: newArray };

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    var ids = newArray
      .map(data => {
        return `${data.id}`;
      })
      .join(","); // Concat de Cities IDs

    state = { ...state, cityIDs: ids }; //To save the id
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    //--------------------------------------------------
    //LocalStorage
    localStorage.setItem("IDsCities", state.cityIDs);
    //--------------------------------------------------
  }
  if (action.type === "ERROR") {
    state = { ...state, errorFetch: true };
    console.log("No hay ciudad con ese nombre! ");
  }

  return state;
};

export default fetchWeather;
