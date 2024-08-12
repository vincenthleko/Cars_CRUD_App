document.addEventListener("alpine:init", () => {
  Alpine.data("nissanCKWidgets", () => ({
      cars: [],
      error: null,
      filteredCount: 0,
      addedCar: null,
      error: "",
      newCar: {
          color: "",
          make: "",
          model: "",
          reg_number: "",
      },
      carMake: '',
      resultMessage: '',

      // Function to fetch cars
      fetchCars() {
          axios
              .get(`http://localhost:3001/api/cars`, {
                  headers: {
                      "Content-Type": "application/json",
                  },
              })
              .then((response) => {
                  this.cars = response.data.cars;
                  // setTimeout(() => {
                  //     this.cars = [];
                  // }, 5000);

                  this.formatCarsOutput();
              })
              .catch((error) => {
                  console.error("Error fetching cars:", error);
                  this.error = "Failed to fetch cars. Please try again later.";
              });
      },

      hideCars() {
          this.cars = [];
          // this.filteredCount = "";
      },

      // Function to format and display the cars output
      formatCarsOutput() {
          if (this.cars.length === 0) {
              console.log("No cars available.");
              return;
          }

          console.log("Cars List:");
          this.cars.forEach((car) => {
              console.log(
                  `- ${car.color} ${car.make} ${car.model} (Reg Number: ${car.reg_number})`
              );
          });
      },

      init() {
          this.fetchCars();
      },

      // Function to filter Nissan cars with CK reg numbers
      fetchFilteredNissans() {
        axios
            .get(`http://localhost:3001/api/filterNissansFromCK`, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((response) => {
                
                this.filteredCount = response.data.filteredCars;
    
                console.log(`Filtered Nissans Count: ${this.filteredCount}`);
    
                return axios.get(`http://localhost:3001/api/cars`, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
            })
            .then((response) => {
                const nissansFromCK = response.data.cars.filter(
                    (car) => car.make === "Nissan" && car.reg_number.startsWith("CK")
                );
    
                if (nissansFromCK.length > 0) {
                    this.filteredNissans = nissansFromCK;
                  
                    this.filteredCount = "Nissan car from \"CK\"";
                } else {
                    this.filteredCount = "No Nissans from CK found.";
                }
    
                
                this.filteredNissans.forEach((car) => {
                    console.log(
                        `Color: ${car.color}, Make: ${car.make}, Model: ${car.model}, Reg Number: ${car.reg_number}`
                    );
                });
    
                setTimeout(() => {
                    this.filteredCount = "";
                }, 5000);
            })
            .catch((error) => {
                console.error("Error fetching filtered Nissans:", error);
                this.error = "Failed to fetch filtered Nissans. Please try again later.";
            });
    },
    

      // Function to add a new car
      addCar(newCar) {
          axios
              .post(`http://localhost:3001/api/add-car`, newCar, {
                  headers: {
                      "Content-Type": "application/json",
                  },
              })
              .then((response) => {
                  console.log(response.data.message);
                  this.addedCar = response.data.car;
                  setTimeout(() => {
                      this.newCar.color = "";
                      this.newCar.make = "";
                      this.newCar.model = "";
                      this.newCar.reg_number = "";
                      this.addedCar = null;
                  }, 5000);

                  alert(
                      `Car added successfully: ${this.addedCar.color} ${this.addedCar.make} ${this.addedCar.model} (Reg Number: ${this.addedCar.reg_number})`
                  );
              })
              .catch((error) => {
                  console.error("Error adding car:", error);
                  this.error = "Failed to add car. Please try again later.";
              });
      },

      submitCar() {
          this.addCar(this.newCar);
          this.newCar.color = "";
          this.newCar.make = "";
          this.newCar.model = "";
          this.newCar.reg_number = "";
      },

      // Function to delete a car make
      deleteCarMake() {
          const url = `http://localhost:3001/api/delete-car/${this.carMake}`;
          
          axios.delete(url, {
              headers: {
                  'Content-Type': 'application/json',
              },
          })
          .then((response) => {
              if (response.status === 200) {
                  // this.resultMessage = `Message: Cars deleted successfully, Deleted Count: ${response.data.deletedCount}`;
              } else {
                  throw new Error('Failed to delete cars');
              }
              alert( `Message: Cars deleted successfully, Deleted Count: ${response.data.deletedCount}`);
              setTimeout(() => {
                this.carMake = '';
                this.resultMessage = '';
                
            }, 5000);
          })
          .catch((error) => {
              console.error('Error deleting cars:', error.message);
              this.resultMessage = `Error: ${error.message}`;
          });
      }
  }));
});
