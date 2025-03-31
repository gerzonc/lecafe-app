export default [
  {
    id: "1",
    name: "Sandra",
    lastName: "Gómez",
    age: 21,
    location: "Surco, Perú",
    interests: ["Viajar", "Leer", "Amistad", "Salir de fiesta", "Pasarlo bien"],
    image: require("../assets/images/list/girl-1.png")
  },
  {
    id: "2",
    name: "Beatriz",
    lastName: "Díaz",
    age: 22,
    location: "Lima, Perú",
    interests: ["Viajar", "Leer", "Amistad", "Salir de fiesta", "Pasarlo bien"],
    image: require("../assets/images/list/girl-2.png")
  },
  {
    id: "3",
    name: "Carmen",
    lastName: "Saleta",
    age: 22,
    location: "Miraflores, Perú",
    interests: ["Viajar", "Leer", "Amistad", "Salir de fiesta", "Pasarlo bien"],
    image: require("../assets/images/list/girl-3.png")
  },
  {
    id: "4",
    name: "Julia",
    lastName: "Pérez",
    age: 23,
    location: "Arequipa, Perú",
    interests: ["Viajar", "Leer", "Amistad", "Salir de fiesta", "Pasarlo bien"],
    image: require("../assets/images/list/girl-4.png")
  }
];

export const sections = [
  {
    title: "Amistad",
    type: "friendship",
    interests: ["Viajar", "Leer", "Amistad", "Salir de fiesta", "Pasarlo bien"],
    image: require("../assets/images/ui/friendship.svg")
  },
  {
    title: "Citas",
    type: "date",
    image: require("../assets/images/ui/dates.svg")
  },
  {
    title: "Relación",
    type: "relationship",
    image: require("../assets/images/ui/relationship.svg")
  }
];
