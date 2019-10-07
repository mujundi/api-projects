class Storage {
  constructor() {
    // check whether local storage is available
    if (this.storageAvailable("localStorage")) {
      this.storage = localStorage;
    } else {
      this.storage = sessionStorage;
    }

    // default location is Miami, FL if location isn't already stored
    if (this.storage.getItem("location") === null) {
      this.setLocation({ city: "Miami, FL", coordinates: { lat: 25.775084, lng: -80.194702 } });
    }
  }

  // Save changes to city and state to storage
  setLocation(location) {
    this.storage.setItem("location", JSON.stringify(location));
  }

  // get location data from storage
  getLocation() {
    return JSON.parse(this.storage.getItem("location"));
  }

  //
  storageAvailable(storageType) {
    let storage;
    try {
      storage = window[storageType];
      let x = "__storage_test__";
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    } catch (e) {
      return (
        e instanceof DOMException &&
        // everything except Firefox
        (e.code === 22 ||
          // Firefox
          e.code === 1014 ||
          // test name field too, because code might not be present
          // everything except Firefox
          e.name === "QuotaExceededError" ||
          // Firefox
          e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
        // acknowledge QuotaExceededError only if there's something already stored
        (storage && storage.length !== 0)
      );
    }
  }
}
