// Datos de ejemplo — luego esto vendra de la API/backend (SCM controla el stock real)

export const products = [
  {
    id: "col-001",
    nombre: "Collar Armonía",
    precio: 350,
    piedra: "Amatista lavanda",
    intencion: "Calma",
    categoria: "Collares",
    colorTema: "lavender",
    stock: 12,
    nuevo: true,
    imagen: "/images/productos/collar_armonia.png",
    descripcion:
      "Collar artesanal con amatista natural, elegido por su energía de calma y claridad mental. Cadena bañada en oro.",
  },
  {
    id: "pul-001",
    nombre: "Pulsera Calma",
    precio: 280,
    piedra: "Cuarzo verde",
    intencion: "Equilibrio",
    categoria: "Pulseras",
    colorTema: "sage",
    stock: 8,
    nuevo: false,
    imagen: "/images/productos/pulsera_calma.png",
    descripcion:
      "Pulsera de cuarzo verde natural, asociada a la conexión con la naturaleza y el equilibrio emocional.",
  },
  {
    id: "are-001",
    nombre: "Aretes Luna",
    precio: 210,
    piedra: "Cuarzo violeta",
    intencion: "Intuición",
    categoria: "Aretes",
    colorTema: "violet",
    stock: 15,
    nuevo: false,
    imagen: "/images/productos/aretes_luna.png",
    descripcion:
      "Aretes ligeros con cuarzo violeta, ideales para el día a día. Simbolizan intuición y conexión espiritual.",
  },
  {
    id: "col-002",
    nombre: "Collar Raíz",
    precio: 320,
    piedra: "Cuarzo ahumado",
    intencion: "Protección",
    categoria: "Collares",
    colorTema: "gold",
    stock: 6,
    nuevo: true,
    imagen: "/images/productos/collar_raiz.png",
    descripcion:
      "Collar con cuarzo ahumado, piedra de protección y arraigo. Ideal para quienes buscan estabilidad.",
  },
  {
    id: "pul-002",
    nombre: "Pulsera Sol",
    precio: 195,
    piedra: "Citrino",
    intencion: "Abundancia",
    categoria: "Pulseras",
    colorTema: "gold",
    stock: 20,
    nuevo: false,
    imagen: "/images/productos/pulsera_sol.png",
    descripcion:
      "Pulsera de citrino natural, conocida como la piedra de la abundancia y la alegría.",
  },
  {
    id: "pul-003",
    nombre: "Pulsera Raíz",
    precio: 260,
    piedra: "Turmalina negra",
    intencion: "Protección",
    categoria: "Pulseras",
    colorTema: "gold",
    stock: 9,
    nuevo: true,
    imagen: "/images/productos/pulsera_raiz.png",
    descripcion:
      "Pulsera de turmalina negra, piedra protectora que absorbe energías densas y aporta estabilidad.",
  },
  {
    id: "are-002",
    nombre: "Aretes Armonía",
    precio: 240,
    piedra: "Amatista lavanda",
    intencion: "Calma",
    categoria: "Aretes",
    colorTema: "lavender",
    stock: 10,
    nuevo: false,
    imagen: "/images/productos/aretes_armonia.png",
    descripcion:
      "Aretes colgantes de amatista, en armonía con el collar Armonía para un set completo.",
  },
];

export const testimonios = [
  {
    id: "t1",
    nombre: "Renata G.",
    producto: "Collar Armonía",
    texto:
      "Siento la energía de la pieza desde que me la puse, se nota el cuidado con el que está hecha.",
    colorTema: "lavender",
    foto: null,
  },
  {
    id: "t2",
    nombre: "Fernanda L.",
    producto: "Pulsera Calma",
    texto:
      "El empaque de regalo quedó hermoso, se la di a mi mamá y le encantó la pulsera.",
    colorTema: "sage",
    foto: null,
  },
  {
    id: "t3",
    nombre: "Camila R.",
    producto: "Aretes Sol",
    texto: "Los aretes son más bonitos en persona, llegaron rápido y bien cuidados.",
    colorTema: "gold",
    foto: null,
  },
];
