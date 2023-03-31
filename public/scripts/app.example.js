class App {
  constructor() {
    this.clearButton = document.getElementById("clear-btn");
    this.loadButton = document.getElementById("load-btn");
    this.carContainerElement = document.getElementById("cars-container");

    this.inputDate = document.getElementById("date");
    this.inputTime = document.getElementById("time");
    this.inputCapacity = document.getElementById("capacity");
    this.searchBtn = document.getElementById("searchBtn");
  }

  async init() {
    await this.load();

    // Register click listener
    // this.clearButton.onclick = this.clear;
    // this.loadButton.onclick = this.run;

    this.searchBtn.onclick = this.search;
  }

  search = async () => {

    this.clear();

    // collect data from form
    const dateValue = this.inputDate.value;
    const timeValue = this.inputTime.value;
    const capacityValue = this.inputCapacity.value;

    // menggabungkan date & time
    const datetime = new Date(`${dateValue} ${timeValue}`);
    console.log(datetime);

    // fungsi filter
    const filterer = (car) => {
      const dateFilter = car.availableAt > datetime;
      const capacityFilter = car.capacity >= capacityValue;
      
      return dateFilter && capacityFilter;
    }

    // cars: store list cars yang sudah di filter
    const cars = await Binar.listCars(filterer);

    Car.init(cars);

    if (cars.length == 0 || cars == undefined) {
      const node = document.createElement("div");
      node.innerHTML = `<div class="alert alert-danger mt-2" role="alert">Opps mobil kosong, silahkan cari lagi </div> `
      this.carContainerElement.appendChild(node);
    } else {
      Car.list.forEach((car) => {
        const node = document.createElement("div");
        node.innerHTML = car.render();
        this.carContainerElement.appendChild(node);
      });
    }
  }

  run = () => {
    // Car.list.forEach((car) => {
    //   const node = document.createElement("div");
    //   node.innerHTML = car.render();
    //   this.carContainerElement.appendChild(node);
    // });
  };

  async load() {
    // cars: store list cars yang sudah di filter: [{}]
    const cars = await Binar.listCars();
    Car.init(cars);
  }

  clear = () => {
    let child = this.carContainerElement.firstElementChild;

    while (child) {
      child.remove();
      child = this.carContainerElement.firstElementChild;
    }
  };
}

// function format rupiah
function rupiah(number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(number);
}

